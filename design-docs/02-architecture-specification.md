# BLANKWET ACADEMY — Technical Architecture Specification

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER LAYER                                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Desktop    │  │   Mobile     │  │   Tablet     │  │   PWA        │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
└─────────┼─────────────────┼─────────────────┼─────────────────┼───────────┘
          │                 │                 │                 │
          └─────────────────┴────────┬────────┴─────────────────┘
                                     │
┌────────────────────────────────────┼──────────────────────────────────────┐
│                         VERCEL EDGE/CDN                                   │
│  ┌─────────────────────────────────┼──────────────────────────────────┐   │
│  │         Next.js 14 App Router   │                                  │   │
│  │  ┌─────────────┐  ┌────────────┴────────┐  ┌─────────────────┐   │   │
│  │  │  SSR/SSG    │  │  Server Components  │  │  Edge Functions │   │   │
│  │  │  (Pages)    │  │  (App Router)       │  │  (Middleware)   │   │   │
│  │  └─────────────┘  └─────────────────────┘  └─────────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
┌───────────────────▼────┐  ┌────────▼────────┐  ┌────▼──────────────────┐
│    BUNNY.NET STACK     │  │   DATABASE      │  │   THIRD-PARTY         │
│                        │  │                 │  │   SERVICES            │
│  ┌──────────────────┐  │  │  ┌───────────┐  │  │  ┌─────────────────┐  │
│  │  Bunny Stream    │  │  │  │ PostgreSQL│  │  │  │  Stripe         │  │
│  │  (Video Hosting) │  │  │  │ (Supabase)│  │  │  │  (Payments)     │  │
│  └────────┬─────────┘  │  │  └─────┬─────┘  │  │  └─────────────────┘  │
│  ┌────────┴─────────┐  │  │  ┌─────┴─────┐  │  │  ┌─────────────────┐  │
│  │  Bunny CDN       │  │  │  │  Redis    │  │  │  │  Resend         │  │
│  │  (Static Assets) │  │  │  │ (Upstash) │  │  │  │  (Email)        │  │
│  └──────────────────┘  │  │  └───────────┘  │  │  └─────────────────┘  │
│                        │  │                 │  │  ┌─────────────────┐  │
└────────────────────────┘  └─────────────────┘  │  │  NextAuth       │  │
                                                  │  │  (Auth)         │  │
                                                  │  └─────────────────┘  │
                                                  └───────────────────────┘
```

## 2. Frontend Stack

### 2.1 Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14+ (App Router) | Framework, SSR/SSG, API routes |
| React | 18+ | UI library |
| TypeScript | 5+ (strict) | Type safety |
| Tailwind CSS | 3.4+ | Utility-first styling |
| shadcn/ui | latest | Component primitives |

### 2.2 Key Libraries
| Library | Purpose |
|---------|---------|
| Zustand | Global client state |
| TanStack Query (React Query) | Server state, caching |
| React Hook Form | Form management |
| Zod | Schema validation |
| Framer Motion | Page transitions, micro-interactions |
| GSAP + ScrollTrigger | Scroll animations |
| Lucide React | Icons |
| next/font | Font optimization |

### 2.3 Project Structure (App Router)
```
app/
├── (marketing)/                    # Marketing pages (no auth required)
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Marketing layout
│   ├── uroci/
│   │   ├── page.tsx                # Courses list
│   │   └── [slug]/
│   │       └── page.tsx            # Single course
│   ├── blog/
│   │   ├── page.tsx                # Blog list
│   │   └── [slug]/
│   │       └── page.tsx            # Blog post
│   ├── za-nas/
│   │   └── page.tsx                # About page
│   ├── kontakti/
│   │   └── page.tsx                # Contact page
│   └── abonament/
│       └── page.tsx                # Pricing/subscription
│
├── (dashboard)/                    # Authenticated pages
│   ├── dashboard/
│   │   ├── page.tsx                # User dashboard
│   │   ├── layout.tsx              # Dashboard layout
│   │   ├── uroci/
│   │   │   └── page.tsx            # My courses
│   │   ├── profil/
│   │   │   └── page.tsx            # Profile settings
│   │   └── nastroyki/
│   │       └── page.tsx            # Account settings
│
├── api/                            # API Routes
│   ├── auth/[...nextauth]/
│   │   └── route.ts                # NextAuth handler
│   ├── webhooks/
│   │   └── stripe/
│   │       └── route.ts            # Stripe webhooks
│   ├── bunny/
│   │   ├── upload/
│   │   │   └── route.ts            # Video upload
│   │   ├── token/
│   │   │   └── route.ts            # Generate signed URLs
│   │   └── webhook/
│   │       └── route.ts            # Bunny webhooks
│   ├── courses/
│   │   ├── route.ts                # List courses
│   │   └── [id]/
│   │       ├── route.ts            # Get course
│   │       └── progress/
│   │           └── route.ts        # Update progress
│   └── search/
│       └── route.ts                # Search endpoint
│
├── layout.tsx                      # Root layout
├── globals.css                     # Global styles
└── loading.tsx                     # Global loading

components/
├── ui/                             # shadcn/ui components (auto)
├── custom/                         # Custom components
│   ├── navigation/
│   │   ├── Header.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Footer.tsx
│   │   └── BottomNav.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ValueProposition.tsx
│   │   ├── FeaturedCourses.tsx
│   │   ├── CategoriesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── InstructorSpotlight.tsx
│   │   ├── FAQSection.tsx
│   │   └── NewsletterCTA.tsx
│   ├── course/
│   │   ├── CourseCard.tsx
│   │   ├── CourseGrid.tsx
│   │   ├── CourseFilters.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── Curriculum.tsx
│   │   └── ReviewSection.tsx
│   ├── pricing/
│   │   ├── PricingCard.tsx
│   │   └── PricingToggle.tsx
│   └── shared/
│       ├── Logo.tsx
│       ├── SectionHeader.tsx
│       ├── AnimatedCounter.tsx
│       └── ScrollReveal.tsx

lib/
├── prisma.ts                       # Prisma client singleton
├── auth.ts                         # NextAuth configuration
├── stripe.ts                       # Stripe client
├── bunny.ts                        # Bunny.net API client
├── resend.ts                       # Resend email client
├── redis.ts                        # Upstash Redis client
├── algolia.ts                      # Algolia search client
├── utils.ts                        # General utilities
└── constants.ts                    # App constants

hooks/
├── useAuth.ts                      # Authentication state
├── useCourseProgress.ts            # Course progress tracking
├── useVideoPlayer.ts               # Video player state
├── useSearch.ts                    # Search functionality
├── useScrollPosition.ts            # Scroll tracking
└── useMediaQuery.ts                # Responsive breakpoints

types/
├── index.ts                        # Shared types
├── course.ts                       # Course-related types
├── user.ts                         # User types
├── payment.ts                      # Payment/Stripe types
└── api.ts                          # API response types

prisma/
└── schema.prisma                   # Database schema

public/
├── images/
│   ├── logo/
│   ├── courses/
│   ├── instructors/
│   └── blog/
├── fonts/
└── favicon.ico
```

## 3. Backend Architecture

### 3.1 Authentication (NextAuth.js v5)

**Providers:**
| Provider | Type | Notes |
|----------|------|-------|
| Credentials | Email + Password | Primary method (discreet) |
| Google OAuth | OAuth 2.0 | Optional |

**Session Strategy:** JWT with HttpOnly cookies
**Session Duration:** 30 days (remember me) / 24 hours (default)

**Middleware Flow:**
```
Request → Edge Middleware → Check JWT → Validate session → Allow/Deny
                                     ↓
                              Refresh if < 25% TTL
```

### 3.2 Database (PostgreSQL via Supabase)

**Connection:** Prisma ORM with connection pooling
**Key Features:**
- Row Level Security (RLS) policies for user data isolation
- Full-text search indexes on courses, blog posts
- Foreign key constraints with cascade rules

### 3.3 Caching Strategy (Redis/Upstash)

| Cache Key | TTL | Invalidation |
|-----------|-----|-------------|
| `course:list` | 60s | On course CRUD |
| `course:[id]` | 300s | On course update |
| `user:progress:[id]` | 60s | On progress update |
| `search:[query]` | 300s | On content change |
| `bunny:token:[video]` | 1800s | Expiry-based |

### 3.4 Search (Algolia)

**Indexes:**
- `courses` — title, description, instructor, category, tags
- `blog` — title, content, author, category

**Features:**
- Instant search (debounced 300ms)
- Faceted filtering (category, level, price)
- Typo tolerance
- Bulgarian language support

## 4. Video Infrastructure (Bunny.net)

### 4.1 Bunny Stream Integration

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Admin Upload   │────▶│  Bunny Stream    │────▶│  Webhook (ready) │
│   (Dashboard)    │     │  (Processing)    │     │  (Update DB)     │
└──────────────────┘     └────────┬─────────┘     └──────────────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    │             │             │
              ┌─────▼─────┐ ┌────▼────┐ ┌─────▼──────┐
              │  1080p    │ │  720p   │ │   480p     │
              │  (source) │ │ (HD)    │ │  (SD)      │
              └───────────┘ └─────────┘ └────────────┘
```

### 4.2 Video Security

| Feature | Implementation |
|---------|---------------|
| Token Authentication | Signed URLs with expiry (30 min) |
| Referrer Restriction | academy.blankwet.eu only |
| Geo-blocking | EU only (configurable) |
| Direct Play | Disabled for premium content |
| Download Prevention | Token-protected HLS streams |

### 4.3 Video API Endpoints

```typescript
// Get signed video URL
GET /api/bunny/token?videoId={videoId}
Response: { url: string, expiresAt: number }

// Upload video (admin)
POST /api/bunny/upload
Body: { title, file, courseId, moduleId }
Response: { videoId, status, pullZone }

// Bunny webhook
POST /api/bunny/webhook
Body: { event: 'video.ready' | 'video.deleted', videoId }
```

### 4.4 Video Player Configuration

```typescript
interface VideoPlayerConfig {
  libraryId: string;           // Bunny Stream Library ID
  videoId: string;             // Bunny Video GUID
  token: string;               // Signed URL token
  autoplay: false;             // Never autoplay with sound
  muted: true;                 // Preview muted
  preload: 'metadata';         // Efficient loading
  controls: true;
  playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2];
  qualities: ['1080p', '720p', '480p', '360p'];
  captions: WebVTT[];          // Bulgarian subtitles
}
```

## 5. Payment System (Stripe)

### 5.1 Products & Prices

| Product | Type | Price | Stripe Price ID |
|---------|------|-------|----------------|
| Monthly Subscription | Recurring | 19.90 лв/месец | `price_monthly` |
| Yearly Subscription | Recurring | 179 лв/година | `price_yearly` |
| Individual Course | One-time | Varies | Per course |

### 5.2 Checkout Flow

```
User clicks "Subscribe"
    ↓
POST /api/stripe/checkout-session
    ↓
Stripe Checkout (hosted) — supports Apple Pay, Google Pay
    ↓
Payment success → webhook → activate subscription
    ↓
Redirect to /dashboard?success=true
```

### 5.3 Webhook Handlers

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Create subscription record |
| `invoice.payment_succeeded` | Extend subscription period |
| `invoice.payment_failed` | Notify user, grace period |
| `customer.subscription.deleted` | Deactivate access |

### 5.4 Self-Service Portal

Stripe Billing Portal for:
- Update payment method
- View invoices
- Cancel subscription (soft delete — access until period end)

## 6. Email System (Resend)

### 6.1 Transactional Emails

| Trigger | Template | Content |
|---------|----------|---------|
| Welcome | `welcome` | Account created, get started CTA |
| Course Purchase | `purchase-confirmation` | Access link, course details |
| Subscription Active | `subscription-active` | Billing details, manage link |
| Password Reset | `reset-password` | Secure reset link (1 hour) |
| Weekly Newsletter | `newsletter` | Free lesson, tips, new courses |

### 6.2 Email Configuration

- **From:** "Blankwet Academy" <hello@blankwet.eu>
- **Reply-To:** hello@blankwet.eu
- **DKIM/SPF:** Configured via Resend + DNS

## 7. Analytics & Monitoring

| Tool | Purpose |
|------|---------|
| Vercel Analytics | Core Web Vitals, performance |
| Plausible | Privacy-focused page views, events |
| Stripe Dashboard | Revenue, churn, MRR |

**Key Events Tracked:**
- `course_started` — User begins course
- `lesson_completed` — Lesson finished
- `subscription_created` — New subscriber
- `subscription_cancelled` — Churn event
- `search_query` — Search terms used

## 8. Security Checklist

| Layer | Implementation |
|-------|---------------|
| HTTPS | Vercel auto SSL (Let's Encrypt) |
| Auth | JWT + HttpOnly cookies + CSRF protection |
| Video | Token authentication + referrer restriction |
| Payments | Stripe (PCI DSS compliant) |
| Headers | HSTS, X-Frame-Options, CSP, X-Content-Type-Options |
| Rate Limit | Upstash Redis + Edge middleware |
| Input Validation | Zod schemas on all inputs |
| SQL Injection | Prisma ORM (parameterized queries) |
| XSS | React auto-escape + CSP |

## 9. GDPR Compliance

| Requirement | Implementation |
|-------------|---------------|
| Cookie Consent | Custom banner, granular categories |
| Data Export | /api/user/export → JSON download |
| Right to Erasure | Self-service delete account |
| Privacy Policy | Dedicated page, linked in footer |
| Data Processing Agreement | Signed with Stripe, Resend, Bunny |
| Analytics | Plausible (no cookies, EU-hosted) |

## 10. Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Score | > 90 | Lighthouse CI |
| First Contentful Paint | < 1.5s | Vercel Analytics |
| Largest Contentful Paint | < 2.5s | Vercel Analytics |
| Time to Interactive | < 3.5s | Vercel Analytics |
| Cumulative Layout Shift | < 0.1 | Vercel Analytics |
| Video Start Time | < 2s | Bunny analytics |

---

*Document Version: 1.0*
*Last Updated: 2026-07-14*
