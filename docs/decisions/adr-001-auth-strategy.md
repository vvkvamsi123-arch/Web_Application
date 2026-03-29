# ADR-001 — Authentication Strategy

**Status:** Accepted
**Date:** 2026-03-30

---

## Context

Phase 2 introduces user accounts. We need authentication that:

1. Works natively with Next.js App Router (Route Handlers, Server Components, middleware)
2. Supports email/password today and OAuth (Google, Apple) + OTP later without rewrites
3. Issues credentials as HTTP-only cookies (no client-side token storage)
4. Can be backed by a database adapter today and Redis in the future

## Options Considered

| Option | Pros | Cons |
|---|---|---|
| **Auth.js v5 (next-auth@beta)** | Native App Router, all providers built-in, Prisma adapter, JWT or DB sessions | Beta label (but stable API) |
| Custom JWT + middleware | Full control | Significant boilerplate, security risk surface, no provider ecosystem |
| Clerk / Auth0 (SaaS) | Zero infra | Vendor lock-in, ongoing cost, limited customizability |
| Lucia Auth | Lightweight | Fewer built-in providers, more manual OTP/OAuth wiring |

## Decision

Use **Auth.js v5** (`next-auth@beta`) with:

- **JWT session strategy** (stateless, no DB round-trip per request)
- **PrismaAdapter** for token and account persistence
- **Credentials provider** for email/password (Phase 2)
- **Google provider** stub ready to enable via env vars (Phase 3)
- **HTTP-only, Secure, SameSite=Lax** cookies managed entirely by Auth.js

## Consequences

- Adding Google OAuth requires only uncommenting the `Google` entry in `config.ts`
  and setting `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
- Switching from JWT to database sessions requires changing `session.strategy`
  from `"jwt"` to `"database"` and adding a Redis adapter — no API changes.
- The `passwordHash` column is added to the `User` model manually (Auth.js does
  not define it; Credentials provider populates it via `auth.service.ts`).
