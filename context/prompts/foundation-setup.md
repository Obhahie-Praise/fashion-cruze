# 01 - Foundation Setup

## Objective

Transform the fresh Next.js application into the foundational infrastructure for Cruze Commerce.

This prompt is **strictly limited to project infrastructure**.

Do **not** build any UI, business logic, routes, pages, features, or database models beyond what is required for the infrastructure itself.

---

# Before You Begin

Read the following files in order before making any changes:

1. `agents.md`
2. `context/project-overview.md`
3. `context/design-dna.md`
4. `context/code-standards.md`
5. `context/features.md`
6. `context/user-flows.md`
7. `context/database.md`
8. `context/routes.md`
9. `context/progress.md`
10. `context/implementation-rules.md`

Understand the project before making changes.

---

# Task 1 — Install Project Dependencies

Install only the foundational dependencies required by the project.

### Authentication

- Better Auth

### Database

- Prisma
- Prisma Client

### File Uploads

- UploadThing

### Validation

- Zod

### Forms

- React Hook Form
- React Hook Form Resolvers

### State

- Zustand

### Server State

- TanStack Query

### URL State

- nuqs

### Notifications

- Sonner

### Utilities

- date-fns

### Development

- Husky
- lint-staged

Only install packages that are actually required.

---

# Task 2 — Configure Prisma

Initialize Prisma.

Create the Prisma client singleton.

Configure:

- Prisma client
- Migrations
- Neon compatibility

Do not create application models.

Do not create business tables.

Do not seed data.

Only create the infrastructure required for Prisma to function.

---

# Task 3 — Configure Better Auth

Set up Better Auth.

Configure:

- Prisma adapter
- Email/password authentication
- Role support
- Session support
- Cookie configuration
- Google provider placeholder
- Email provider placeholder

Do not build authentication pages.

Do not build authentication UI.

Do not implement authentication flows.

Infrastructure only.

---

# Task 4 — Configure UploadThing

Initialize UploadThing.

Configure:

- Server
- Client
- Shared helpers

Do not create upload routes yet.

Those will be implemented later.

---

# Task 5 — Configure Providers

Create application providers for:

- Theme
- TanStack Query
- Sonner
- UploadThing

Providers should be reusable and ready for future implementation.

---

# Task 6 — Create Shared Utilities

Create the shared infrastructure utilities required across the project.

Examples include:

- Database client
- Authentication helper
- Environment validation
- Logger
- Cache helper
- General utility helpers

Only create foundational utilities.

---

# Task 7 — Environment

Generate a `.env.example`.

Include placeholders for every required environment variable.

Do not include real secrets.

---

# Task 8 — Validation

Verify that:

- Prisma initializes successfully.
- Better Auth initializes successfully.
- UploadThing initializes successfully.
- TypeScript has no errors.
- ESLint reports no errors.
- The application builds successfully.

Resolve every issue before finishing.

---

# Restrictions

Do not:

- Create routes.
- Create layouts.
- Create pages.
- Create dashboards.
- Create storefront components.
- Create authentication UI.
- Create business database models.
- Create upload endpoints.
- Create feature-specific logic.
- Generate placeholder business code.

Only build the project foundation.

---

# Completion Checklist

Before finishing:

- Foundation dependencies are installed.
- Prisma is configured.
- Better Auth is configured.
- UploadThing is configured.
- Providers are created.
- Shared utilities are created.
- `.env.example` exists.
- No TypeScript errors remain.
- No ESLint errors remain.
- The project builds successfully.
- Update `context/progress.md`.