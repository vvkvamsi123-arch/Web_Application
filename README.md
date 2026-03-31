# HarborCart - Phase 2 Full-Stack E-commerce

HarborCart is a Next.js App Router e-commerce project with Auth.js authentication,
Prisma persistence, and functional cart/wishlist APIs.

## Phase 2 Scope

- User registration and login (credentials provider)
- Session-based protected routes (`/cart`, `/wishlist`, `/api/cart`, `/api/wishlist`)
- Persistent cart and wishlist storage with Prisma + SQLite
- Product list and product detail pages with working add-to-cart and wishlist actions
- Functional cart and wishlist pages backed by live API data
- Service-layer architecture ready for future microservice migration

## Tech Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- Auth.js (next-auth v5 beta)
- Prisma 7 + SQLite (local development)
- SWR for client-side API state sync
- Zod for API validation

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm 10+

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file from example:

```bash
copy .env.example .env.local
```

3. Generate Prisma client and create/update local DB schema:

```bash
npx prisma generate
npx prisma db push
```

4. Start the app:

```bash
npm run dev
```

Open http://localhost:3000.

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Default Local Database

Local development uses SQLite with:

```env
DATABASE_URL="file:./dev.db"
```

## Notes

- Auth secrets and local DB settings belong in `.env.local` only.
- OAuth providers are scaffolded but optional for this phase.
