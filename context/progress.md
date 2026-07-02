# Project Progress

## Purpose

This document tracks the current implementation state of Cruze Commerce.
It is the primary handover document between development sessions.
Every AI agent must update this file after every meaningful implementation.

---

# Current Phase

Phase 4: Admin Dashboard — Overview Complete

---

# Current Goal

Implement the customer core flows: store exploration, product details, and cart functionality.

---

# Current Branch

`main`

---

# Last Completed Task

Implemented the full Dashboard Overview page:
- Rewrote `src/app/(dashboard)/dashboard/overview/page.tsx` as a full Server Component with Suspense boundaries for every section
- Added `NuqsAdapter` to `src/components/providers.tsx` so `useQueryState` works across the app
- Built 10 overview components (metric cards, business health, revenue chart, customer chart, recent events, recent customer activity, top categories, low stock, recent products/orders/top products) — all with skeleton loaders
- Implemented `src/actions/dashboard-overview.ts` with 9 data-fetching Server Actions supporting the date range filter
- Created `src/components/dashboard/overview/dashboard-report.tsx` — a 2-page structured PDF using `@react-pdf/renderer`
- Created `src/app/api/dashboard/report/route.ts` — admin-protected API route that fetches all data in parallel, renders PDF server-side, and streams it as a downloadable attachment
- Updated `OverviewHeader` to wire the Export PDF button to the API route with current date range
- Passed TypeScript (0 errors), ESLint (0 errors, 13 pre-existing warnings), and production build (26 routes)

---

# Current Focus

Product catalog and cart integration

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
- **UploadThing**: Fully configured file router (`src/lib/uploadthing.ts`) with authenticated upload routes.
- **Server Utilities**: `src/lib/server-utils.ts` with `getCurrentSession()`, `getCurrentUser()`, `requireAuth()`, `requireAdmin()`, `checkRole()`.
- **Environment Validation**: Extended `src/lib/env.ts`.
- **Proxy (Middleware)**: Refined `src/proxy.ts` with auth, customer, and admin route guards.
- **Design System CSS Variables**: Implemented in `src/app/globals.css`.
- **Global Font**: Commissioner Google font wired up in `src/app/layout.tsx`.
- **Theme & Client Providers**: `Providers` container with `next-themes`, TanStack React Query, Sonner Toaster, TooltipProvider, and `NuqsAdapter`.
- **Folder Skeleton**: Full architectural structure (`actions/`, `services/`, `components/`, `hooks/`, `stores/`, `types/`, `validations/`, `constants/`).
- **Route Groups & Page Shells**: All 26 routes scaffolded across `(store)`, `(auth)`, `(dashboard)`.
- **Admin Dashboard Shell**: Complete sidebar, top navigation, user menu, notifications, and theme toggle.
- **Auth UI Pages**: Sign in, sign up, forgot password dialog, Google OAuth, role-based redirection.
- **Seed Data**: `prisma/seed.ts` — 8–12 months of realistic business data using `@faker-js/faker`:
  - 300 customers, 150 products, 800 orders, 7 categories, 5 promotions, 50 support tickets
  - Spread timestamps, weighted order statuses by age, realistic inventory states
- **Dashboard Overview**: Fully implemented at `/dashboard/overview`:
  - `OverviewHeader` — nuqs URL date-range filter (7 options), refresh, PDF export
  - `MetricCardsSection` — revenue, profit, orders, customers, products, store visits
  - `BusinessHealthCard` — inventory, support, payments health indicators
  - `RevenueAnalyticsChart` — Recharts AreaChart, revenue vs. profit over time
  - `CustomerAnalyticsChart` — Recharts LineChart, new + cumulative customers
  - `RecentEventsFeed` — latest orders with status badges
  - `RecentCustomerActivity` — new customer registrations
  - `TopCategoriesList` — categories by product count with progress bars
  - `LowStockList` — inventory items at or below threshold, colour-coded
  - `RecentProductsSection`, `RecentOrdersSection`, `TopProductsSection` — horizontal scroll card rows
  - All sections wrapped in `<Suspense>` with matching skeleton loaders
  - All sections respond to the global date range filter via URL search params
- **PDF Report Export**:
  - `src/components/dashboard/overview/dashboard-report.tsx` — 2-page `@react-pdf/renderer` document
  - `GET /api/dashboard/report?range=…` — admin-protected route, streams PDF as download

---

# Work In Progress

None (Ready for next phase)

---

# Next Tasks

1. Implement public-facing catalog functionality (fetching products from Neon).
2. Build Cart UI and local/server synchronization.

---

# Blockers

None

---

# Technical Debt

None

---

# Database Changes

- Migrated all domains: Core, Catalog, Inventory, Customers, Orders, Payments, Marketing, Support, Notifications, System.
- Created `prisma/seed.ts` for dummy data population (300 customers, 150 products, 800 orders).

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
- `GET /dashboard/overview` ← **Fully implemented**
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
- `GET /api/dashboard/report` ← **NEW**

---

# Components Added

- `src/components/providers.tsx` (updated — NuqsAdapter added)
- `src/components/shared/theme-toggle.tsx`
- **Admin Dashboard Shell Refinements**: sidebar, topnav, user menu, notifications
- **Dashboard Overview Components** (`src/components/dashboard/overview/`):
  - `overview-header.tsx`
  - `metric-cards-section.tsx`
  - `business-health-card.tsx`
  - `revenue-analytics-chart.tsx`
  - `customer-analytics-chart.tsx`
  - `recent-events-feed.tsx`
  - `recent-customer-activity.tsx`
  - `top-categories-list.tsx`
  - `low-stock-list.tsx`
  - `horizontal-item-sections.tsx`
  - `dashboard-report.tsx` ← **NEW**
- Auth UI components (carousel, social auth, password input)
- Shadcn UI components (tooltip, breadcrumb, dropdown-menu, separator, button, sheet, input, label, checkbox, dialog)

---

# Dependencies Added

Shadcn UI components (via `shadcn` CLI — `@base-ui/react` primitives).

Additional Libraries:
- `react-hook-form`
- `@hookform/resolvers`
- `zod`
- `nuqs` — URL-based state management for date range filter
- `recharts` — AreaChart + LineChart for analytics
- `@react-pdf/renderer` — server-side PDF generation

---

# Testing Status

- TypeScript: ✅ 0 errors
- ESLint: ✅ 0 errors (13 pre-existing warnings, all harmless)
- Build: ✅ Successful — 26 routes compiled, `/dashboard/overview` and `/api/dashboard/report` correctly Dynamic

---

# Session Notes

- Next.js 16.2.9 uses `proxy.ts` convention (not `middleware.ts`). The exported function must be named `proxy`.
- Better Auth `databaseHooks.user.create.before` is the correct pattern for defaulting new user roles.
- Shadcn UI in this project uses `@base-ui/react` primitives — there is no `asChild` prop. Use the `render` prop pattern instead.
- The `react-hooks/set-state-in-effect` ESLint rule is active. Use `useSyncExternalStore` instead of `useState + useEffect` for client-detection patterns.
- ESLint config must explicitly ignore `src/generated/**`.
- `nuqs` requires `NuqsAdapter` wrapping the app (added to `src/components/providers.tsx`).
- `@react-pdf/renderer` v4: `renderToBuffer` requires a type cast for the React element; the Buffer result must be wrapped in `new Uint8Array()` to be used as `Response` body.
- Upload model uses `publicUrl` field (not `url`) — confirmed from Prisma schema.
- Dashboard overview uses Server Components exclusively for data fetching; Recharts chart components are the only Client Components (marked `"use client"`), receiving data as serialisable props.