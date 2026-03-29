# API Contracts — Phase 2

Base URL: `http://localhost:3000/api`

All responses are `Content-Type: application/json`.
Authentication uses an HTTP-only cookie (`next-auth.session-token`) set by Auth.js.

---

## Error Envelope

All error responses share the same shape:

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable description."
}
```

| HTTP Status | Error Code | When |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Zod schema fails |
| 401 | `UNAUTHORIZED` | No valid session cookie |
| 403 | `FORBIDDEN` | Authenticated but does not own resource |
| 404 | `NOT_FOUND` | Resource does not exist |
| 409 | `EMAIL_IN_USE` | Registration with duplicate email |
| 500 | `INTERNAL_SERVER_ERROR` | Unhandled server error |

---

## Auth

### POST `/api/auth/register`

Register a new user with email and password.

**Request body**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "P@ssword123!"
}
```

**Validation rules**
- `name`: 2–100 characters
- `email`: valid email format
- `password`: 8–72 characters (bcrypt ceiling)

**Response `201 Created`**
```json
{
  "id": "clxabcd1234",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "createdAt": "2026-03-30T12:00:00.000Z"
}
```

**Response `409 Conflict`**
```json
{
  "error": "EMAIL_IN_USE",
  "message": "An account with this email already exists."
}
```

---

### POST `/api/auth/signin` *(handled by Auth.js)*

Managed by `Auth.js`. Accepts `{ email, password }` as form data or JSON.
On success, sets `next-auth.session-token` HTTP-only cookie.

### POST `/api/auth/signout` *(handled by Auth.js)*

Clears the session cookie.

---

## Cart

All cart endpoints require authentication.

### GET `/api/cart`

Returns the current user's cart with computed totals.

**Response `200 OK`**
```json
{
  "items": [
    {
      "id": "clxitem001",
      "productId": "p-101",
      "quantity": 1,
      "product": {
        "id": "p-101",
        "slug": "aero-headphones",
        "name": "Aero Noise-Cancelling Headphones",
        "price": 229,
        "imageUrl": "/images/headphones.jpg",
        "shortDescription": "Studio-grade ANC headphones"
      },
      "lineTotal": 229
    },
    {
      "id": "clxitem002",
      "productId": "p-104",
      "quantity": 2,
      "product": {
        "id": "p-104",
        "slug": "pulse-fitness-watch",
        "name": "Pulse Fitness Watch",
        "price": 199,
        "imageUrl": "/images/watch.jpg",
        "shortDescription": "Advanced health tracking"
      },
      "lineTotal": 398
    }
  ],
  "subtotal": 627,
  "shipping": 12,
  "tax": 50,
  "total": 689
}
```

---

### POST `/api/cart`

Add a product to the cart. If the product already exists, increments quantity.

**Request body**
```json
{
  "productId": "p-103",
  "quantity": 1
}
```

**Response `201 Created`**
```json
{
  "item": {
    "id": "clxitem003",
    "productId": "p-103",
    "quantity": 1
  }
}
```

---

### PATCH `/api/cart/[itemId]`

Update the quantity of a specific cart item.

**Request body**
```json
{
  "quantity": 3
}
```

**Response `200 OK`**
```json
{
  "item": {
    "id": "clxitem003",
    "productId": "p-103",
    "quantity": 3
  }
}
```

---

### DELETE `/api/cart/[itemId]`

Remove a cart item.

**Response `200 OK`**
```json
{
  "success": true
}
```

---

## Wishlist

All wishlist endpoints require authentication.

### GET `/api/wishlist`

Returns the current user's wishlist.

**Response `200 OK`**
```json
{
  "items": [
    {
      "id": "clxwish001",
      "productId": "p-102",
      "product": {
        "id": "p-102",
        "slug": "lumen-smart-desk-lamp",
        "name": "Lumen Smart Desk Lamp",
        "price": 89,
        "imageUrl": "/images/lamp.jpg",
        "shortDescription": "Tunable smart lighting"
      }
    }
  ]
}
```

---

### POST `/api/wishlist`

Add a product to the wishlist. Idempotent — duplicate adds return the existing item.

**Request body**
```json
{
  "productId": "p-105"
}
```

**Response `201 Created`**
```json
{
  "item": {
    "id": "clxwish002",
    "productId": "p-105"
  }
}
```

---

### DELETE `/api/wishlist/[itemId]`

Remove a wishlist item.

**Response `200 OK`**
```json
{
  "success": true
}
```

---

## Users

### GET `/api/users/me`

Returns the authenticated user's profile. Derived entirely from the JWT session
(no extra DB round-trip).

**Response `200 OK`**
```json
{
  "id": "clxabcd1234",
  "email": "jane@example.com",
  "name": "Jane Doe",
  "image": null
}
```

---

## Design Notes

- Quantities are validated `int`, range `1–99`, to prevent negative or overflow values.
- `PATCH /api/cart/[itemId]` sets the quantity absolutely (not incrementally) to avoid race conditions from rapid UI updates.
- Wishlist POST is upsert-safe: calling it twice for the same product is a no-op and returns the existing item.
- The cart totals (subtotal, shipping, tax) are computed server-side on every GET to ensure consistency with server-side pricing.
- For Move to Cart / Move to Wishlist, call DELETE on the source list and POST on the destination list as two sequential requests.
