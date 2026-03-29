# Phase 2 Architecture — HarborCart

## Overview

Phase 2 transforms HarborCart from a purely static frontend into a full-stack
application with authentication, persistent sessions, a database-backed cart and
wishlist, and a clean REST API layer — while keeping the door open for
microservices, CMS integration, and an admin panel in future phases.

---

## Technology Decisions

| Concern | Library / Tool | Rationale |
|---|---|---|
| Authentication | Auth.js (next-auth v5) | Native App Router support; built-in providers; JWT + Prisma adapter |
| ORM | Prisma | Type-safe queries; first-class Next.js support; easy migrations |
| Database | PostgreSQL (SQLite for dev) | ACID; JSON columns for future flexibility |
| Validation | Zod | Runtime schema validation shared between API and forms |
| Forms | React Hook Form + `@hookform/resolvers/zod` | Uncontrolled performant forms with Zod integration |
| HTTP fetching | SWR | Stale-while-revalidate cache; built-in mutation helpers |
| Password hashing | bcryptjs | Battle-tested; pure-JS; no native deps |
| Session cache (future) | ioredis + `@auth/redis-adapter` | Drop-in replacement for DB adapter |

---

## Phase 1 vs Phase 2

### Phase 1

```
Browser
  └── Next.js (SSR / SSG)
        └── Static in-memory data (products.ts, mock cart)
```

### Phase 2

```
Browser
  ├── Next.js App Router (RSC + Client Components)
  │     ├── Route protection via src/middleware.ts
  │     ├── (auth) route group  → /login, /register
  │     ├── /cart               → server-rendered with client mutations
  │     ├── /wishlist           → server-rendered with client mutations
  │     └── /products, /...    → unchanged static rendering
  │
  └── Next.js API Routes (Route Handlers)
        ├── /api/auth/[...nextauth]  → Auth.js handler (JWT, cookies)
        ├── /api/auth/register       → Custom registration endpoint
        ├── /api/cart                → Cart CRUD
        ├── /api/cart/[itemId]       → Cart item PATCH / DELETE
        ├── /api/wishlist            → Wishlist CRUD
        ├── /api/wishlist/[itemId]   → Wishlist item DELETE
        └── /api/users/me            → Current user profile

              │
              ▼
        Service Layer (src/lib/services/)
        ├── auth.service.ts     → User lookup, password verification
        ├── cart.service.ts     → Cart business logic + totals
        ├── catalog.ts          → Product queries (unchanged seam)
        └── wishlist.service.ts → Wishlist business logic

              │
              ▼
        Prisma ORM (src/lib/db/client.ts)
              │
              ▼
        PostgreSQL
```

---

## Scalable Folder Structure

```
d:\Projects\Web_Application\
├── prisma/
│   └── schema.prisma            ← single source of truth for DB schema
│
├── src/
│   ├── app/
│   │   ├── (auth)/              ← route group: no shared shop layout
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/route.ts   ← Auth.js handler
│   │   │   │   └── register/route.ts
│   │   │   ├── cart/
│   │   │   │   ├── route.ts
│   │   │   │   └── [itemId]/route.ts
│   │   │   ├── wishlist/
│   │   │   │   ├── route.ts
│   │   │   │   └── [itemId]/route.ts
│   │   │   └── users/
│   │   │       └── me/route.ts
│   │   │
│   │   ├── about/, cart/, contact/, products/  ← Phase 1 pages (unchanged)
│   │   ├── globals.css
│   │   ├── layout.tsx           ← add SessionProvider here
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── SessionProvider.tsx   ← wraps layout with NextAuth context
│   │   ├── cart/
│   │   │   └── WishlistButton.tsx
│   │   ├── Container.tsx            ← Phase 1 (unchanged)
│   │   ├── ProductCard.tsx
│   │   ├── SiteFooter.tsx
│   │   └── SiteHeader.tsx
│   │
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── config.ts        ← NextAuth configuration (providers, callbacks)
│   │   │   └── password.ts      ← bcryptjs hash/compare helpers
│   │   │
│   │   ├── api/
│   │   │   ├── response.ts      ← typed NextResponse helpers (ok/created/badRequest…)
│   │   │   └── errors.ts        ← domain error constants
│   │   │
│   │   ├── db/
│   │   │   └── client.ts        ← Prisma singleton (hot-reload safe)
│   │   │
│   │   ├── hooks/               ← React client hooks
│   │   │   ├── useCart.ts
│   │   │   └── useWishlist.ts
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   ├── cart.ts          ← updated: computeCartTotals() replaces mock
│   │   │   ├── catalog.ts       ← updated: getProductById() added
│   │   │   └── wishlist.service.ts
│   │   │
│   │   ├── data/products.ts     ← Phase 1 static data (unchanged)
│   │   └── types.ts             ← updated with DB types, CartView, etc.
│   │
│   ├── middleware.ts            ← route protection (JWT verification)
│   └── types/
│       └── next-auth.d.ts       ← session type augmentation (adds user.id)
│
├── docs/                        ← gitignored design docs
├── .env.example
└── .env.local                   ← gitignored
```

---

## Authentication Extensibility

Auth.js providers are drop-in additions in `src/lib/auth/config.ts`:

```typescript
import Google from "next-auth/providers/google";
import Apple  from "next-auth/providers/apple";

// Add to providers array:
Google,
Apple,
```

Mobile OTP can be implemented as a custom Credentials provider backed by an
SMS gateway (Twilio / AWS SNS), or by using **Passkey / WebAuthn** via
`@auth/core/providers/webauthn` when targeting mobile PWA.

---

## Future Extensibility

| Feature | Approach |
|---|---|
| Admin panel | Separate Next.js route group `(admin)` with role-based middleware guard |
| CMS integration | Replace `src/lib/data/products.ts` seam with a CMS SDK call inside `catalog.ts` |
| Redis sessions | Swap `PrismaAdapter` for `RedisAdapter` in `config.ts`; zero UI changes |
| Order microservice | Add `src/lib/services/order.service.ts` + `/api/orders` route group |
| Catalog microservice | Replace `catalog.ts` with HTTP calls to a separate catalog API |
