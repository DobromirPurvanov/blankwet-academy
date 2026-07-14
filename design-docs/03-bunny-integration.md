# Bunny.net Integration Guide — Blankwet Academy

## 1. Overview

Bunny.net powers all video infrastructure for Blankwet Academy:
- **Bunny Stream**: Video hosting, transcoding, adaptive streaming
- **Bunny CDN**: Static asset delivery (images, CSS, JS)
- **Bunny Storage**: Backup/original file storage (optional)

## 2. Setup

### 2.1 Create Bunny Stream Library

1. Log in to [Bunny.net Dashboard](https://panel.bunny.net)
2. Go to **Stream** → **Add Library**
3. Name: `blankwet-academy-videos`
4. Region: Choose EU (Falkenstein or Vienna)
5. Record:
   - **Library ID**: `YOUR_LIBRARY_ID`
   - **API Key**: `YOUR_API_KEY` (Settings → API)

### 2.2 Environment Variables

```bash
# .env.local
BUNNY_STREAM_API_KEY=your-api-key
BUNNY_STREAM_LIBRARY_ID=your-library-id
BUNNY_CDN_API_KEY=your-cdn-api-key  # For image CDN if needed
BUNNY_STREAM_PULL_ZONE=your-pull-zone-url  # e.g., https://blankwet.b-cdn.net
```

### 2.3 Install Dependencies

```bash
npm install @bunny.net/stream-sdk  # Official SDK (optional)
# OR use fetch-based implementation (recommended)
```

## 3. Core Implementation

### 3.1 Bunny API Client (`lib/bunny.ts`)

```typescript
// lib/bunny.ts
const BUNNY_API_BASE = 'https://video.bunnycdn.com/library';

interface BunnyVideo {
  guid: string;
  title: string;
  length: number;  // seconds
  thumbnailFileName: string;
  category: string;
  metaTags: Array<{ property: string; value: string }>;
}

class BunnyStreamClient {
  private apiKey: string;
  private libraryId: string;

  constructor() {
    this.apiKey = process.env.BUNNY_STREAM_API_KEY!;
    this.libraryId = process.env.BUNNY_STREAM_LIBRARY_ID!;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${BUNNY_API_BASE}/${this.libraryId}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'AccessKey': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Bunny API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Upload video from URL (pull)
  async uploadFromUrl(url: string, title: string, metadata?: Record<string, string>) {
    return this.request('/videos', {
      method: 'POST',
      body: JSON.stringify({
        title,
        thumbnailTime: 10, // Auto-generate thumbnail at 10s
        metaTags: Object.entries(metadata || {}).map(([k, v]) => ({
          property: k,
          value: v,
        })),
      }),
    });
  }

  // Upload video from file (direct upload)
  async uploadFromFile(file: File | Buffer, title: string) {
    // Step 1: Create video entry
    const video = await this.request('/videos', {
      method: 'POST',
      body: JSON.stringify({ title }),
    });

    // Step 2: Upload file
    await fetch(`${BUNNY_API_BASE}/${this.libraryId}/videos/${video.guid}`, {
      method: 'PUT',
      headers: {
        'AccessKey': this.apiKey,
        'Content-Type': 'application/octet-stream',
      },
      body: file,
    });

    return video;
  }

  // Get video details
  async getVideo(videoId: string): Promise<BunnyVideo> {
    return this.request(`/videos/${videoId}`);
  }

  // Delete video
  async deleteVideo(videoId: string) {
    return this.request(`/videos/${videoId}`, {
      method: 'DELETE',
    });
  }

  // List videos with pagination
  async listVideos(page = 1, perPage = 100) {
    return this.request(`/videos?page=${page}&itemsPerPage=${perPage}`);
  }

  // Update video metadata
  async updateVideo(videoId: string, data: Partial<BunnyVideo>) {
    return this.request(`/videos/${videoId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Generate signed URL (token authentication)
  generateSignedUrl(videoId: string, expirySeconds = 1800): string {
    const libraryId = this.libraryId;
    const expiry = Math.floor(Date.now() / 1000) + expirySeconds;
    
    // Token = base64(hmac-sha256(videoId + expiry + secret))
    const signature = this.generateSignature(videoId, expiry);
    
    return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&token=${signature}&expires=${expiry}`;
  }

  private generateSignature(videoId: string, expiry: number): string {
    // Uses the library's private signing key
    // In production, use crypto module:
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', process.env.BUNNY_STREAM_SIGNING_KEY!);
    hmac.update(`${libraryId}${videoId}${expiry}`);
    return hmac.digest('base64url');
  }

  // Get video heatmap (analytics)
  async getVideoHeatmap(videoId: string) {
    return this.request(`/videos/${videoId}/heatmap`);
  }

  // Set video thumbnail
  async setThumbnail(videoId: string, timeInSeconds: number) {
    return this.request(`/videos/${videoId}/thumbnail?thumbnailTime=${timeInSeconds}`, {
      method: 'POST',
    });
  }
}

export const bunny = new BunnyStreamClient();
```

### 3.2 Token Authentication API Route

```typescript
// app/api/bunny/token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { bunny } from '@/lib/bunny';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // 1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get video ID from query
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');
    const lessonId = searchParams.get('lessonId');

    if (!videoId || !lessonId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // 3. Check user has access to this lesson
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        subscriptions: {
          where: {
            status: 'ACTIVE',
            currentPeriodEnd: { gt: new Date() },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if lesson exists and if it's free
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Free content or active subscription
    const hasAccess = lesson.module.course.isFree || 
                      lesson.module.isFree ||
                      user.subscriptions.length > 0;

    if (!hasAccess) {
      return NextResponse.json({ error: 'Subscription required' }, { status: 403 });
    }

    // 4. Generate signed URL
    const signedUrl = bunny.generateSignedUrl(videoId, 1800); // 30 min expiry

    return NextResponse.json({
      url: signedUrl,
      expiresAt: Date.now() + 1800 * 1000,
    });

  } catch (error) {
    console.error('Bunny token error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 3.3 Video Upload API (Admin)

```typescript
// app/api/bunny/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { bunny } from '@/lib/bunny';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // 1. Admin check
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Check admin role
    // const isAdmin = await checkAdmin(session.user.email);
    // if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    // 2. Parse multipart form
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const courseId = formData.get('courseId') as string;
    const moduleId = formData.get('moduleId') as string;

    if (!file || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Upload to Bunny Stream
    const buffer = Buffer.from(await file.arrayBuffer());
    const video = await bunny.uploadFromFile(buffer, title);

    // 4. Save to database
    const lesson = await prisma.lesson.create({
      data: {
        title,
        videoId: video.guid,
        moduleId: moduleId || '',
        duration: 0, // Will be updated via webhook
      },
    });

    // 5. Return response
    return NextResponse.json({
      success: true,
      videoId: video.guid,
      lessonId: lesson.id,
      status: 'processing',
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}
```

### 3.4 Bunny Webhook Handler

```typescript
// app/api/bunny/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (optional, based on Bunny settings)
    const body = await request.json();
    
    const { VideoGuid, Status, EventType } = body;

    switch (EventType) {
      case 'video.ready':
        // Video transcoding complete — update lesson
        await prisma.lesson.updateMany({
          where: { videoId: VideoGuid },
          data: {
            // Duration and other metadata can be fetched here
          },
        });
        break;

      case 'video.deleted':
        // Video deleted — clean up
        await prisma.lesson.updateMany({
          where: { videoId: VideoGuid },
          data: { videoId: null },
        });
        break;

      case 'video.encoded':
        // Video encoded — update duration
        // Fetch video details from Bunny API
        break;

      default:
        console.log('Unhandled Bunny event:', EventType);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
```

## 4. Frontend Video Player Component

```typescript
// components/custom/VideoPlayer.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  lessonId: string;
  courseId: string;
  autoPlay?: boolean;
  onProgress?: (percent: number, position: number) => void;
  onComplete?: () => void;
}

export function VideoPlayer({
  videoId,
  lessonId,
  courseId,
  autoPlay = false,
  onProgress,
  onComplete,
}: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch signed URL on mount
  useEffect(() => {
    const loadVideo = async () => {
      try {
        const response = await fetch(
          `/api/bunny/token?videoId=${videoId}&lessonId=${lessonId}`
        );

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || 'Failed to load video');
        }

        const data = await response.json();
        setVideoUrl(data.url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadVideo();
  }, [videoId, lessonId]);

  // Track progress
  useEffect(() => {
    if (!videoUrl) return;

    // Listen for postMessage events from Bunny iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://iframe.mediadelivery.net') return;

      const { type, data } = event.data;

      switch (type) {
        case 'timeupdate':
          onProgress?.(data.percent, data.currentTime);
          break;
        case 'ended':
          onComplete?.();
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [videoUrl, onProgress, onComplete]);

  if (isLoading) {
    return (
      <div className="aspect-video bg-purple-100 rounded-2xl flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-3 border-purple-700 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-video bg-purple-50 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <p className="text-purple-700 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-gold-400 text-primary rounded-full text-sm font-semibold hover:bg-gold-500 transition-colors"
          >
            Опитай отново
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden bg-black shadow-lg">
      <iframe
        ref={iframeRef}
        src={videoUrl!}
        className="w-full aspect-video"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
```

## 5. Security Configuration

### 5.1 Bunny Stream Settings

In Bunny Stream Library Settings:

| Setting | Value |
|---------|-------|
| **Token Authentication** | ✅ Enabled |
| **Token Expiration** | 3600 seconds (1 hour) |
| **Referrer Restriction** | `academy.blankwet.eu` |
| **Direct Play** | ❌ Disabled |
| **Allow Download** | ❌ Disabled |
| **Geo-blocking** | Optional: EU only |

### 5.2 Environment Security

```bash
# .env.local — NEVER commit this file
BUNNY_STREAM_API_KEY=bunny-api-key-here
BUNNY_STREAM_LIBRARY_ID=library-id-here
BUNNY_STREAM_SIGNING_KEY=signing-key-here  # For token generation
```

### 5.3 Rate Limiting

```typescript
// middleware.ts — Rate limit token generation
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
  analytics: true,
});

// Apply to /api/bunny/token route
```

## 6. Video Upload Workflow (Admin)

```
1. Admin navigates to /dashboard/admin/courses/[id]/lessons
2. Clicks "Добави видео"
3. Selects file (MP4, MOV, MKV — max 2GB)
4. Enters title, description
5. Clicks "Качи"
6. Frontend → POST /api/bunny/upload
7. Backend validates admin role
8. Backend uploads to Bunny Stream
9. Bunny transcodes to: 1080p, 720p, 480p, 360p
10. Webhook fires: video.ready
11. Lesson record updated with duration
12. Admin sees "Готово" status
```

## 7. Monitoring & Debugging

### 7.1 Bunny Stream Analytics

```typescript
// Get video analytics
async function getVideoAnalytics(videoId: string) {
  const heatmap = await bunny.getVideoHeatmap(videoId);
  
  return {
    totalViews: heatmap.views,
    averageWatchTime: heatmap.avgViewTime,
    completionRate: heatmap.completeRate,
    // Use for: instructor dashboard, content optimization
  };
}
```

### 7.2 Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Video won't play | Expired token | Reduce token TTL, refresh before expiry |
| Slow loading | CDN cache miss | Pre-warm CDN, use Bunny's prefetch |
| Quality drops | Bandwidth adaptation | Normal behavior — Bunny auto-adjusts |
| Upload fails | File too large | Increase limit or implement chunked upload |

---

*Document Version: 1.0*
*Last Updated: 2026-07-14*
