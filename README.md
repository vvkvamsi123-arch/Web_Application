# HarborCart - Phase 1 Static E-commerce Frontend

This project is a modern static e-commerce web application built with Next.js, React, TypeScript, and Tailwind CSS.

## Phase 1 Scope

- Home page with hero, featured products, and promo section
- Product listing page with category and sort links (client-side/static)
- Product detail page
- Cart page with static frontend totals
- About and Contact pages
- Service abstraction layer for data access

## Microservice-Ready Design

The UI does not read data directly from page components. Instead, data access is routed through service modules:

- `src/lib/services/catalog.ts`
- `src/lib/services/cart.ts`

In future phases, these modules can be replaced by API calls to catalog, cart, and order microservices without major UI rewrites.

## Prerequisites

Install these tools first:

- Node.js LTS (v20 or v22)
- npm (included with Node.js)

## Run Locally

```bash
npm install
npm run dev
```

Then open:

- http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Notes

This repository currently contains static data and no backend implementation by design.
