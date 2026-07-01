# Project Progress

## Purpose

This document tracks the current implementation state of Cruze Commerce.
It is the primary handover document between development sessions.
Every AI agent must update this file after every meaningful implementation.

---

# Current Phase

Phase 2: Authentication Pages & Core Layouts — Ready for implementation

---

# Current Goal

Create the user authentication interfaces (Sign In, Sign Up, Forgot Password) using the established Design System tokens, and start implementing core layout components.

---

# Current Branch

`main`

---

# Last Completed Task

Platform Services Foundation: Better Auth fully configured with Google OAuth, UploadThing upload routes defined, server utilities created, proxy/middleware refined, environment validation extended. Production build compiles successfully.

---

# Current Focus

Auth UI Pages & Route protection validation

---

# Completed Work

- **Project Infrastructure**: Next.js 16.2.9 with TypeScript, ESLint, Tailwind CSS v4.
- **Database & Prisma**: Synchronized core schema with Neon. Built `src/lib/db.ts` utilizing `PrismaNeon` serverless adapter. Added complete database schema covering all business entities (Identity, Catalog, Inventory, Customer Behaviour, Orders, Payments, Marketing, Support, Notifications, Uploads, Analytics, Admin, System). Run DB migration and generated development seed script.
- **Better Auth Integration**: Full server configuration (`src/lib/auth.ts`) with:
  - Email and password authentication
  - Google OAuth (sign-in and sign-up)
  - Session management with secure cookies
  - Role-based authorization (customer / admin)
  - Account linking via `admin()` plugin
  - New users defaulted to `customer` role via `databaseHooks`
  - API Route Handler (`src/app/api/auth/[...better-auth]`)
  - Client instance (`src/lib/auth-client.ts`) with `adminClient` plugin
- **UploadThing**: Fully configured file router (`src/lib/uploadthing.ts`) with authenticated upload routes:
  - `productImage` — admin only, images, max 4MB, max 5
  - `categoryImage` — admin only, images, max 4MB, max 1
  - `promotionBanner` — admin only, images, max 8MB, max 1
  - `userAvatar` — authenticated users, images, max 2MB, max 1
  - `supportAttachment` — authenticated users, images/pdf, max 4MB, max 3
  - `brandAsset` — admin only, images, max 4MB, max 1
  - Each route persists metadata to the `Upload` model on completion
  - API route handler (`src/app/api/uploadthing/route.ts`)
- **Server Utilities**: Created `src/lib/server-utils.ts` with reusable server-side helpers:
  - `getCurrentSession()` — retrieves current Better Auth session
  - `getCurrentUser()` — retrieves current authenticated user
  - `requireAuth()` — redirects to sign-in if unauthenticated
  - `requireAdmin()` — redirects to home if not admin
  - `checkRole(role)` — verifies user role
- **Environment Validation**: Extended `src/lib/env.ts` with:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `NEXT_PUBLIC_APP_URL`
  - Application startup fails clearly if any required variable is missing
- **Proxy (Middleware)**: Refined `src/proxy.ts` with:
  - Auth route guards (redirect authenticated users away from login pages)
  - Protected customer route guards (cart, checkout, profile, orders, wishlist)
  - Admin-only dashboard protection
  - Unauthenticated users redirected to `/signin?redirectTo=<path>`
- **Zod Env Validation**: Comprehensive startup environment check (`src/lib/env.ts`).
- **Structured Logging**: Clean server logging utility (`src/lib/logger.ts`).
- **Design System CSS Variables**: Implemented light/dark variables, borders, radius, spacing system, shadows, and animations in `src/app/globals.css`.
- **Global Font**: Commissioner Google font wired up with font weight restriction of Semibold (600) max in `src/app/layout.tsx`.
- **Theme & Client Providers**: Connected `Providers` container with `next-themes` (system default), TanStack React Query client, and Sonner Toaster notifications.
- **Folder Skeleton**: Created full architectural structure (`actions/`, `services/`, `components/`, `hooks/`, `stores/`, `types/`, `validations/`, `constants/`).
- **Route Groups & Page Shells**:
  - **`(store)`**: Home `/`, `/products`, `/products/[slug]`, `/cart`, `/checkout`, `/profile`, `/orders`, `/wishlist`, `/support`, with global storefront layout, loading spinner, and storefront error boundaries.
  - **`(auth)`**: `/signin`, `/signup`, `/forgot-password` with centered layout wrapper.
  - **`(dashboard)`**: `/dashboard` redirects to `/dashboard/overview`. Set up overview, orders, products, customers, categories, promotions, analytics, support, settings, and profile routes under the admin Console layout.
- **Build Checks**: Successful compilation and static page generation for all 26 page routes.

---

# Work In Progress

None (Ready for next Phase)

---

# Next Tasks

1. Implement Sign In, Sign Up, and Forgot Password UI page screens under `src/app/(auth)/`.
2. Connect Client Auth (`src/lib/auth-client.ts`) with custom forms using React Hook Form & Zod validations including Google Sign In button.
3. Validate session-based route redirects via `src/proxy.ts`.

---

# Blockers

None

---

# Technical Debt

None

---

# Database Changes

- Migrated all domains: Core, Catalog, Inventory, Customers, Orders, Payments, Marketing, Support, Notifications, System.
- Created `prisma/seed.ts` for dummy data population.

---

# Routes Added

- `GET /`
- `GET /signin`
- `GET /signup`
- `GET /forgot-password`
- `GET /support`
- `GET /products`
- `GET /products/[slug]`
- `GET /cart`
- `GET /checkout`
- `GET /profile`
- `GET /orders`
- `GET /wishlist`
- `GET /dashboard/overview`
- `GET /dashboard/orders`
- `GET /dashboard/products`
- `GET /dashboard/customers`
- `GET /dashboard/categories`
- `GET /dashboard/promotions`
- `GET /dashboard/analytics`
- `GET /dashboard/support`
- `GET /dashboard/settings`
- `GET /dashboard/profile`
- `GET|POST /api/uploadthing`
- `GET|POST /api/auth/[...better-auth]`

---

# Components Added

- `src/components/providers.tsx`

---

# Dependencies Added

No new dependencies added in this phase (all already present).

---

# Testing Status

- TypeScript: ✅ 100% Type-safe
- ESLint: ✅ Clean
- Build: ✅ Successful compilation (`pnpm run build`) — 26 routes, Proxy active

---

# Session Notes

- Next.js 16.2.9 uses `proxy.ts` convention (not `middleware.ts`). The exported function must be named `proxy`.
- Better Auth `databaseHooks.user.create.before` is the correct pattern for defaulting new user roles.
- `useListSessions` and `revokeSession` are not part of the base `ReactAuthClient` type — they require additional plugins if needed in future.