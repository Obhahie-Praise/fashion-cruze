# 02-tech-stack.md

# Technology Stack

This document defines the official technology stack for Cruze Commerce.

AI agents must use the technologies defined here and should not introduce alternative libraries or frameworks without explicit instruction.

---

# Core Framework

## Next.js

- App Router
- React Server Components
- Server Actions
- Route Handlers
- Partial Prerendering when stable
- Static and Dynamic rendering where appropriate

Next.js should be treated as the application's primary framework.

---

# Language

## TypeScript

TypeScript is required throughout the project.

The application should be fully typed.

Avoid unsafe type assertions and implicit types.

---

# Runtime

## Node.js

The application runs on the Node.js runtime.

Edge runtime should only be used where it provides a clear advantage.

---

# Styling

## Tailwind CSS

Tailwind CSS is the project's styling solution.

Custom CSS should be kept minimal and only exist when utility classes are insufficient.

---

# UI Components

## Shadcn UI

Shadcn UI is the project's component foundation.

It provides reusable UI primitives.

Application-specific components should be composed from these primitives rather than modifying the generated components directly.

---

# Icons

## Huge Icons

Huge Icons is the official icon library for the project.

Do not introduce additional icon libraries unless explicitly requested.

---

# Theme

## next-themes

Used for:

- Light mode
- Dark mode
- System theme detection

The system theme should be the default.

---

# Fonts

## Commissioner

Commissioner is the default font family throughout the application.

Typography should remain consistent across every page.

---

# Database

## PostgreSQL

The application uses PostgreSQL as its primary database.

All persistent data should be stored here unless documented otherwise.

---

# ORM

## Prisma

Prisma is the project's ORM.

Responsibilities include:

- Schema management
- Database migrations
- Type-safe queries
- Relations
- Transactions

Prisma should be the only ORM used.

---

# Authentication

## Better Auth

Better Auth manages:

- Authentication
- Sessions
- OAuth
- Credentials
- Password reset
- Email verification
- Role management

Authentication logic should remain centralized.

---

# Validation

## Zod

Zod is the official validation library.

Use Zod for:

- Forms
- Server Actions
- API validation
- Environment validation

Validation logic should not be duplicated.

---

# Forms

## React Hook Form

All complex forms should use React Hook Form with Zod validation.

Form state should remain predictable and type-safe.

---

# Data Tables

## TanStack Table

TanStack Table powers all advanced tables including:

- Products
- Orders
- Customers
- Analytics

Application-specific table wrappers should be built on top of TanStack Table.

---

# Charts

## Recharts

Recharts is the project's charting library.

All analytics visualizations should use Recharts.

---

# Uploads

## UploadThing

UploadThing manages all file uploads.

Examples include:

- Product images
- Promotion banners
- User avatars
- Brand assets

Upload logic should remain centralized.

---

# Image Optimization

Use the Next.js Image component whenever appropriate.

Images should always be optimized for performance.

---

# Caching

Use the built-in Next.js caching mechanisms together with React cache utilities where appropriate.

Caching decisions should prioritize performance without sacrificing data consistency.

---

# Notifications

Toast notifications should use the project's standardized notification system.

Notification behavior should remain consistent throughout the application.

---

# Package Manager

pnpm is the official package manager.

AI agents should use pnpm commands for installation and dependency management.

---

# Linting

ESLint is required.

The project should compile without lint errors.

Warnings should be treated as issues to resolve.

---

# Formatting

Prettier may be used to maintain consistent formatting.

Formatting should remain automated and consistent.

---

# Version Control

Git is the project's version control system.

Changes should be organized into logical commits.

---

# Testing Strategy

The project architecture should support future automated testing.

Business logic should remain modular and testable.

---

# Deployment Target

The application is intended for modern cloud hosting platforms.

Implementation decisions should remain deployment-agnostic whenever possible.

---

# Environment Variables

All sensitive configuration must be stored in environment variables.

Examples include:

- Database connection
- Authentication secrets
- OAuth credentials
- UploadThing keys
- Payment credentials
- Email provider credentials

Environment variables should never be hardcoded.

---

# Allowed Dependencies

The project is expected to make use of:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Huge Icons
- next-themes
- Prisma
- PostgreSQL
- Better Auth
- Zod
- React Hook Form
- TanStack Table
- Recharts
- UploadThing

New dependencies should only be introduced when they solve a clear problem that cannot reasonably be addressed by the existing stack.

---

# Guiding Principle

The technology stack should remain intentionally small.

Whenever possible, solve problems using the existing ecosystem before introducing additional libraries.

Consistency across the project is more valuable than using the latest or most popular package.