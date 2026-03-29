# Auth & Session Flow Diagrams

Diagrams use [Mermaid](https://mermaid.js.org/) syntax.
Render in VS Code with the *Markdown Preview Mermaid Support* extension,
or paste into https://mermaid.live.

---

## 1. Registration Flow

```mermaid
sequenceDiagram
    actor U as User
    participant F as RegisterForm (client)
    participant A as POST /api/auth/register
    participant S as auth.service.ts
    participant DB as PostgreSQL

    U->>F: Fill name / email / password
    F->>F: Zod client-side validation
    F->>A: POST { name, email, password }
    A->>A: Zod server-side validation
    A->>DB: SELECT user WHERE email = ?
    DB-->>A: null (not found)
    A->>S: hashPassword(password)
    S-->>A: passwordHash (bcrypt, 12 rounds)
    A->>DB: INSERT user { name, email, passwordHash }
    DB-->>A: { id, email, name }
    A-->>F: 201 Created { id, email, name }
    F->>U: Redirect to /login
```

---

## 2. Login Flow (Credentials)

```mermaid
sequenceDiagram
    actor U as User
    participant F as LoginForm (client)
    participant NA as NextAuth /api/auth/signin
    participant CP as Credentials Provider
    participant DB as PostgreSQL
    participant MW as Middleware (src/middleware.ts)

    U->>F: Enter email + password
    F->>NA: signIn('credentials', { email, password })
    NA->>CP: authorize(credentials)
    CP->>DB: SELECT user WHERE email = ?
    DB-->>CP: { id, email, passwordHash }
    CP->>CP: bcrypt.compare(password, hash)
    CP-->>NA: { id, email, name } | null
    alt Valid credentials
        NA->>NA: Sign JWT { sub: userId, ... }
        NA-->>F: Set-Cookie: next-auth.session-token (HTTP-only, Secure, SameSite=Lax)
        F->>U: Redirect to callbackUrl (e.g. /cart)
    else Invalid credentials
        NA-->>F: 401 (no cookie set)
        F->>U: Show error message
    end
```

---

## 3. Session Verification Flow (Protected API Route)

```mermaid
sequenceDiagram
    participant B as Browser
    participant MW as src/middleware.ts
    participant AR as API Route Handler
    participant AU as auth() helper
    participant JW as JWT (in HTTP-only cookie)

    B->>MW: GET /api/cart (Cookie: next-auth.session-token)
    MW->>AU: auth(req)
    AU->>JW: Verify signature with NEXTAUTH_SECRET
    alt Valid JWT
        JW-->>AU: { user: { id, email } }
        AU-->>MW: Session object
        MW->>AR: Forward request
        AR->>AR: const session = await auth()
        AR->>AR: session.user.id → DB queries
        AR-->>B: 200 JSON response
    else No / expired JWT
        AU-->>MW: null
        MW-->>B: 401 Unauthorized
    end
```

---

## 4. Page-Level Route Protection (Middleware)

```mermaid
flowchart TD
    REQ[Incoming Request] --> MW{src/middleware.ts}
    MW -->|Path is /cart, /wishlist, /account| CHECK{session?}
    CHECK -->|Yes| PASS[Next.js Route Handler]
    CHECK -->|No| REDIR[Redirect → /login?callbackUrl=...]
    MW -->|All other paths| PASS
    PASS --> PAGE[Page / API Handler]
```

---

## 5. Cart Persistence (Cross-Session)

```mermaid
sequenceDiagram
    actor U as User
    participant B as Browser
    participant API as /api/cart
    participant DB as PostgreSQL

    Note over U,DB: User logs in — session JWT issued

    U->>B: Click "Add to cart" on product page
    B->>API: POST /api/cart { productId, quantity }
    API->>API: auth() → session.user.id
    API->>DB: UPSERT cart_item (userId, productId, quantity)
    DB-->>API: CartItem row
    API-->>B: 201 { item }
    B->>B: SWR mutate → re-fetch /api/cart

    Note over U,DB: User closes browser, returns later

    B->>API: GET /api/cart (cookie auto-sent)
    API->>API: auth() → session still valid (JWT expiry)
    API->>DB: SELECT cart_items WHERE userId = ?
    DB-->>API: [CartItem rows]
    API-->>B: 200 { items, subtotal, shipping, tax, total }
```

---

## 6. OAuth (Google / Apple) — Future

```mermaid
sequenceDiagram
    actor U as User
    participant F as LoginForm
    participant NA as NextAuth
    participant OA as OAuth Provider (Google)
    participant DB as PostgreSQL

    U->>F: Click "Continue with Google"
    F->>NA: signIn('google')
    NA->>OA: Redirect to OAuth consent screen
    OA-->>NA: Authorization code
    NA->>OA: Exchange code for tokens
    OA-->>NA: { id_token, access_token }
    NA->>DB: UPSERT User + Account (PrismaAdapter)
    DB-->>NA: User row
    NA-->>F: Set-Cookie: session JWT
    F->>U: Redirect to dashboard
```
