# Project Progress

## Purpose

This document tracks the current implementation state of Cruze Commerce.
It is the primary handover document between development sessions.
Every AI agent must update this file after every meaningful implementation.

---

# Current Phase

Phase 4: Authentication UI — Complete

---

# Current Goal

Implement the authentication UI pages (Sign In, Sign Up, Forgot Password)

---

# Current Branch

`main`

---

# Last Completed Task

Auth UI Pages (Sign In, Sign Up): Implemented a shared two-panel responsive layout for the authentication experience. Created a client-side auto-rotating image carousel using standard Unsplash placeholder images. Integrated Shadcn UI input and label primitives. Ensured matching styles, identical border radii, and proper spacing across form elements. Added a fixed bottom-right theme toggler. Validated desktop, tablet, and mobile layouts. Successfully ran build, lint, and type checking.

---

# Current Focus

Connect Client Auth with custom forms and validations (Next task)

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
- **Theme & Client Providers**: `Providers` container with `next-themes`, TanStack React Query, Sonner Toaster, and TooltipProvider.
- **Folder Skeleton**: Full architectural structure (`actions/`, `services/`, `components/`, `hooks/`, `stores/`, `types/`, `validations/`, `constants/`).
- **Route Groups & Page Shells**: All 26 routes scaffolded across `(store)`, `(auth)`, `(dashboard)`.
- **Admin Dashboard Shell**:
  - `src/app/(dashboard)/layout.tsx` — lean Server Component, mounts DashboardShell, includes dashboard metadata.
  - `src/components/dashboard/dashboard-shell.tsx` — Client Component managing sidebar collapse state; composes sidebar + topnav + main content.
  - `src/components/dashboard/dashboard-sidebar.tsx` (`DashboardSidebarInner`) — nav with 9 routes in two groups (Management, System). Active state via `usePathname`. Shared between desktop aside and mobile Sheet. Brand header with icon + wordmark.
  - `src/components/dashboard/sidebar-nav-item.tsx` (`SidebarNavItem`) — atomic nav link with icon, label, active/hover states, keyboard accessibility, and Shadcn Tooltip (base-ui `render` prop pattern).
  - `src/components/dashboard/dashboard-topnav.tsx` (`DashboardTopNav`) — sticky header: sidebar toggle (desktop collapse + mobile Sheet open), search pill button, auto-generated Shadcn Breadcrumb, notifications icon button, ThemeToggle, user menu.
  - `src/components/dashboard/dashboard-user-menu.tsx` (`DashboardUserMenu`) — Shadcn DropdownMenu with initials avatar, user identity label, Profile link, Settings link, and Sign Out action (Better Auth `signOut()`).
  - `src/components/shared/theme-toggle.tsx` (`ThemeToggle`) — cycles light/dark/system via `next-themes`; SSR-safe via `useSyncExternalStore`.
- **Auth UI Pages**:
  - Designed and structured `src/app/(auth)/layout.tsx` as a shared responsive shell.
  - Created `src/components/shared/auth-carousel.tsx` for visual marketing imagery.
  - Created `src/components/shared/social-auth.tsx` for consistent OAuth button layouts.
  - Built `src/app/(auth)/signin/page.tsx` and `src/app/(auth)/signup/page.tsx` utilizing standard Shadcn form controls.

---

# Work In Progress

None (Ready for next Phase)

---

# Next Tasks

1. Connect Client Auth (`src/lib/auth-client.ts`) with custom forms using React Hook Form & Zod validations including Google Sign In button.
2. Validate session-based route redirects via `src/proxy.ts`.

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

- `src/components/providers.tsx` (updated — TooltipProvider added)
- `src/components/shared/theme-toggle.tsx`
- `src/components/dashboard/dashboard-shell.tsx`
- `src/components/dashboard/dashboard-sidebar.tsx`
- `src/components/dashboard/sidebar-nav-item.tsx`
- `src/components/dashboard/dashboard-topnav.tsx`
- `src/components/dashboard/dashboard-user-menu.tsx`
- `src/components/shared/auth-carousel.tsx`
- `src/components/shared/social-auth.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`

---

# Dependencies Added

Shadcn UI components (via `shadcn` CLI — `@base-ui/react` primitives):
- `src/components/ui/tooltip.tsx`
- `src/components/ui/breadcrumb.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`

---

# Testing Status

- TypeScript: ✅ 100% Type-safe
- ESLint: ✅ Clean
- Build: ✅ Successful compilation (`npm run build`) — 26 routes, Proxy active

---

# Session Notes

- Next.js 16.2.9 uses `proxy.ts` convention (not `middleware.ts`). The exported function must be named `proxy`.
- Better Auth `databaseHooks.user.create.before` is the correct pattern for defaulting new user roles.
- `useListSessions` and `revokeSession` are not part of the base `ReactAuthClient` type — they require additional plugins if needed in future.
- Shadcn UI in this project uses `@base-ui/react` primitives — there is no `asChild` prop. Use the `render` prop pattern instead (e.g. `<TooltipTrigger render={<Link href="..." />}>`).
- The `react-hooks/set-state-in-effect` ESLint rule is active. Use `useSyncExternalStore` instead of `useState + useEffect` for client-detection patterns.
- ESLint config must explicitly ignore `src/generated/**` — Prisma generates minified client code that produces hundreds of false-positive lint errors.
- The `shadcn-ui` CLI is deprecated in favor of `shadcn`. Used `npx shadcn@latest add input label` to add components.
- There are no direct project images in `public/` that correspond to the carousel placeholder content, so `unsplash.com` URLs were utilized for now inside the `AuthCarousel` component to maintain the structural layout requirements for visual testing.