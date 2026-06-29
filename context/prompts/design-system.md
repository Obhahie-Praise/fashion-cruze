# 02 - Design System

## Objective

Establish the complete visual foundation for Cruze Commerce.

This prompt is responsible only for the application's design system.

Do not implement business logic, routes, pages, authentication, or features.

---

# Before You Begin

Read every context document before implementation.

Follow all project conventions.

---

# Task 1 — Install and Configure Shadcn UI

Initialize Shadcn UI.

Configure:

- New York style
- CSS Variables
- Neutral theme
- Lucide icons

Do not modify generated `components/ui/*` unless absolutely necessary.

---

# Task 2 — Typography

Configure the global typography.

Use:

- Commissioner

Configure:

- Font family
- Font sizes
- Line heights
- Letter spacing

The maximum font weight used throughout the project is **Semibold**.

Do not use Bold, ExtraBold, or Black.

---

# Task 3 — Theme System

Configure:

- Light mode
- Dark mode
- System mode

Integrate `next-themes`.

System theme should be the default.

---

# Task 4 — Global Design Tokens

Configure design tokens inside `globals.css`.

Include:

- Colors
- Radius
- Shadows
- Borders
- Spacing
- Motion
- Container widths
- Typography

Follow the Design DNA.

---

# Task 5 — Install Foundation Components

Install only the shared UI components required across the application.

Examples include:

- Button
- Input
- Textarea
- Card
- Dialog
- Dropdown Menu
- Badge
- Skeleton
- Tooltip
- Select
- Table
- Tabs
- Avatar
- Scroll Area
- Pagination
- Breadcrumb

Install only what is required for the foundation.

---

# Task 6 — Verify

Confirm:

- Theme switching works.
- Fonts load correctly.
- Design tokens are applied.
- Components render correctly.
- No lint errors.
- No TypeScript errors.

---

# Restrictions

Do not:

- Build layouts.
- Build pages.
- Build dashboards.
- Build storefront.
- Build authentication screens.
- Build feature components.

Only establish the design system.

---

# Completion Checklist

Before finishing:

- Shadcn is configured.
- Commissioner is configured.
- Theme switching works.
- Design tokens exist.
- Foundation components are installed.
- No lint errors remain.
- No TypeScript errors remain.
- Project builds successfully.
- Update `context/progress.md`.