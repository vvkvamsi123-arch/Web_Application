# ADR-002 — Session Management

**Status:** Accepted
**Date:** 2026-03-30

---

## Context

We need sessions that are:

1. Secure against XSS (no client-accessible token)
2. Stateless for horizontal scale (no stickiness requirement)
3. Extensible to a shared Redis cache when multiple Node.js instances are deployed

## Decision

Use **JWT in HTTP-only cookies** (Auth.js default for the JWT strategy).

### Cookie attributes

| Attribute | Value | Why |
|---|---|---|
| `HttpOnly` | true | JavaScript cannot read the token |
| `Secure` | true in production | Cookie only sent over HTTPS |
| `SameSite` | `Lax` | CSRF mitigation for top-level navigations |
| `Path` | `/` | Available to all routes |
| `Max-Age` | 30 days (Auth.js default) | Configurable via `session.maxAge` |

### JWT payload

```typescript
{
  sub: "clx...",    // user ID
  id:  "clx...",    // duplicated via jwt() callback for easy access
  email: "...",
  name: "...",
  iat: 1711800000,
  exp: 1714392000
}
```

The payload is **signed** (HMAC-SHA256) with `NEXTAUTH_SECRET` and **encrypted**
(JWE AES-256-GCM) by Auth.js — it is not readable by the client.

## Future: Redis Session Store

When deploying multiple instances behind a load balancer, switch to **database
sessions backed by Redis**:

1. `npm install @auth/redis-adapter ioredis`
2. In `src/lib/auth/config.ts`, replace:
   ```typescript
   // Before
   import { PrismaAdapter } from "@auth/prisma-adapter";
   adapter: PrismaAdapter(prisma),
   session: { strategy: "jwt" },

   // After
   import { RedisAdapter } from "@auth/redis-adapter";
   import { redis } from "@/lib/db/redis";
   adapter: RedisAdapter(redis),
   session: { strategy: "database" },
   ```
3. Remove `jwt` and `session` callbacks (they are no longer needed).

No API routes, middleware, or UI components require changes.

## Cart Persistence

Cart items are stored in PostgreSQL per `userId`. The session cookie carries the
`userId`, which is used on every cart API call. There is no separate cart session
— the cart IS the database rows.
