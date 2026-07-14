# API Specification — Blankwet Academy

## Base URL
```
Production:  https://academy.blankwet.eu/api
Development: http://localhost:3000/api
```

## Authentication
All authenticated endpoints require a valid JWT session cookie (managed by NextAuth.js).

```
Authorization: Bearer <session-token>
```

## Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 100
  }
}
```

Error format:
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "You must be logged in to access this resource"
  }
}
```

---

## Courses API

### List Courses
```
GET /api/courses
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category` | string | - | Filter by category slug |
| `level` | string | - | beginner, intermediate, advanced |
| `type` | string | - | video, article, podcast, mixed |
| `price` | string | - | free, paid |
| `search` | string | - | Full-text search |
| `sort` | string | featured | featured, newest, popular, rating, price_asc, price_desc |
| `page` | number | 1 | Page number |
| `perPage` | number | 12 | Items per page |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "clxxx",
      "title": "Основи на женската сексуалност",
      "slug": "osnovi-na-zhenskata-seksualnost",
      "shortDesc": "Научи основите на анатомията, желанието и удоволствието...",
      "thumbnail": "https://blankwet.b-cdn.net/thumb-1.webp",
      "category": { "name": "Сексуално здраве", "slug": "seksualno-zdrave" },
      "level": "BEGINNER",
      "type": "VIDEO",
      "price": null,
      "isFree": false,
      "duration": 180,
      "lessonCount": 8,
      "instructor": { "name": "Д-р Мария Иванова", "title": "Сексолог" },
      "avgRating": 4.8,
      "reviewCount": 124,
      "enrollmentCount": 892
    }
  ],
  "meta": { "page": 1, "perPage": 12, "total": 45 }
}
```

### Get Single Course
```
GET /api/courses/[id]
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "clxxx",
    "title": "Основи на женската сексуалност",
    "description": "<p>Пълен HTML описание...</p>",
    "thumbnail": "https://blankwet.b-cdn.net/thumb-1.webp",
    "trailerVideoId": "video-guid-here",
    "category": { "name": "Сексуално здраве", "slug": "seksualno-zdrave" },
    "level": "BEGINNER",
    "type": "VIDEO",
    "price": null,
    "duration": 180,
    "moduleCount": 4,
    "lessonCount": 8,
    "publishedAt": "2026-01-15T10:00:00Z",
    "instructors": [
      {
        "name": "Д-р Мария Иванова",
        "title": "Сексолог",
        "avatar": "https://blankwet.b-cdn.net/instructors/maria.webp",
        "bio": "15+ години опит в сексологията..."
      }
    ],
    "modules": [
      {
        "id": "clxxx",
        "title": "Модул 1: Анатомия и физиология",
        "description": "...",
        "isFree": true,
        "lessons": [
          {
            "id": "clxxx",
            "title": "Урок 1.1: Женска анатомия — основи",
            "duration": 22,
            "isFree": true,
            "videoId": "video-guid"
          }
        ]
      }
    ],
    "whatYouWillLearn": [
      "Ще разбереш своята анатомия",
      "Ще научиш за различните видове оргазъм"
    ],
    "reviews": {
      "avgRating": 4.8,
      "totalCount": 124,
      "distribution": { "5": 98, "4": 18, "3": 5, "2": 2, "1": 1 }
    },
    "isBookmarked": false,
    "userProgress": {
      "percentComplete": 0,
      "completedLessons": 0
    }
  }
}
```

---

## Progress API

### Update Lesson Progress
```
POST /api/courses/[id]/progress
```

**Body:**
```json
{
  "lessonId": "clxxx",
  "videoPosition": 650,
  "percentComplete": 75,
  "status": "IN_PROGRESS"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "progressId": "clxxx",
    "status": "IN_PROGRESS",
    "percentComplete": 75,
    "courseProgress": 25
  }
}
```

### Mark Lesson Complete
```
PATCH /api/courses/[id]/progress
```

**Body:**
```json
{
  "lessonId": "clxxx",
  "status": "COMPLETED"
}
```

---

## Bookmarks API

### Toggle Bookmark
```
POST /api/bookmarks
```

**Body:**
```json
{ "courseId": "clxxx" }
```

**Response:**
```json
{
  "success": true,
  "data": { "bookmarked": true }
}
```

### List Bookmarks
```
GET /api/bookmarks
```

---

## Reviews API

### Create Review
```
POST /api/courses/[id]/reviews
```

**Body:**
```json
{
  "rating": 5,
  "comment": "Страхотен курс! Научих толкова много."
}
```

### List Reviews
```
GET /api/courses/[id]/reviews?page=1&perPage=10
```

---

## Subscription API

### Get Pricing Plans
```
GET /api/subscriptions/plans
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "free",
      "name": "Безплатен",
      "price": 0,
      "features": [
        "Достъп до 3 безплатни урока",
        "Седмичен бюлетин"
      ]
    },
    {
      "id": "monthly",
      "name": "Месечен",
      "price": 1990,
      "priceLabel": "19.90 лв/месец",
      "features": [
        "Пълен достъп до всички курсове",
        "Ново съдържание всяка седмица",
        "HD видео"
      ]
    },
    {
      "id": "yearly",
      "name": "Годишен",
      "price": 17900,
      "priceLabel": "179 лв/година",
      "originalPrice": 23880,
      "discount": "25%",
      "features": [
        "Всичко от Месечен",
        "Ексклузивни уебинари",
        "1:1 Q&A с експерти"
      ],
      "isPopular": true
    }
  ]
}
```

### Create Checkout Session
```
POST /api/stripe/checkout-session
```

**Body:**
```json
{
  "priceId": "price_yearly",
  "successUrl": "/dashboard?success=true",
  "cancelUrl": "/abonament?canceled=true"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "cs_xxx",
    "url": "https://checkout.stripe.com/..."
  }
}
```

### Get Subscription Status
```
GET /api/subscriptions/status
```

**Response:**
```json
{
  "success": true,
  "data": {
    "isActive": true,
    "plan": "YEARLY",
    "currentPeriodEnd": "2027-07-14T00:00:00Z",
    "cancelAtPeriodEnd": false
  }
}
```

### Cancel Subscription
```
POST /api/subscriptions/cancel
```

**Body:**
```json
{ "immediately": false }
```

---

## User API

### Get Profile
```
GET /api/user/profile
```

### Update Profile
```
PATCH /api/user/profile
```

**Body:**
```json
{
  "name": "Мария",
  "bio": "...",
  "preferences": { "newsletter": true, "privateMode": false }
}
```

### Get Dashboard Stats
```
GET /api/user/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "coursesInProgress": 3,
    "coursesCompleted": 5,
    "totalWatchTime": 1260,
    "bookmarks": 8,
    "nextLesson": {
      "courseTitle": "Основи на женската сексуалност",
      "lessonTitle": "Урок 2.3: Комуникация с партньора",
      "thumbnail": "...",
      "progress": 45
    }
  }
}
```

---

## Search API

### Search
```
GET /api/search?q=оргазъм&category=seksualno-zdrave&page=1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courses": [...],
    "blogPosts": [...],
    "totalResults": 15
  }
}
```

---

## Blog API

### List Posts
```
GET /api/blog?category=lifestyle&page=1&perPage=9
```

### Get Single Post
```
GET /api/blog/[slug]
```

---

## Webhooks

### Stripe Webhook
```
POST /api/webhooks/stripe
```

**Events Handled:**
- `checkout.session.completed`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.deleted`

### Bunny Stream Webhook
```
POST /api/webhooks/bunny
```

**Events Handled:**
- `video.ready`
- `video.deleted`
- `video.encoded`

---

*Document Version: 1.0*
*Last Updated: 2026-07-14*
