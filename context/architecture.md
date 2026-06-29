# 03-architecture.md

# System Architecture

This document defines the architecture of Cruze Commerce.

Its purpose is to establish a consistent software structure that every AI agent and developer must follow before implementing any feature.

This document describes **how the application is organized**, **where code belongs**, and **how different parts of the system communicate**.

---

# Architectural Principles

The architecture follows five principles:

* Separation of Concerns
* Feature Isolation
* Reusability
* Scalability
* Predictability

Every implementation should reinforce these principles.

---

# Application Layers

The application is divided into distinct layers.

```
Application
│
├── Foundation
├── Infrastructure
├── Shared Systems
├── Feature Modules
└── User Interfaces
```

Each layer has a single responsibility.

---

# Foundation Layer

The Foundation layer contains the systems required for the application to exist.

Examples include:

* Database
* Authentication
* Upload system
* Theme provider
* Environment validation
* Shared utilities
* Global providers

These systems should remain independent of business features.

---

# Infrastructure Layer

Infrastructure contains reusable application logic shared across multiple features.

Examples include:

* Search engine
* Analytics engine
* Image management
* Pagination
* Filtering
* Notifications
* Caching
* Permissions

Infrastructure should never depend on individual feature implementations.

---

# Shared Systems

Shared systems contain reusable building blocks.

Examples include:

* UI components
* Layouts
* Dialogs
* Forms
* Tables
* Hooks
* Utility functions
* Validators
* Constants

These should remain generic and reusable.

---

# Feature Modules

Business functionality should be grouped into isolated feature modules.

Examples include:

* Products
* Orders
* Customers
* Deals
* Support
* Storefront

Each feature owns its own logic while relying on shared infrastructure.

---

# User Interface Layer

The UI layer is responsible only for presentation and interaction.

It should not contain business logic.

Whenever possible:

* Fetch data on the server.
* Render on the server.
* Keep client components focused on interactivity.

---

# Folder Organization

The project should follow a predictable structure.

```
app/
components/
features/
lib/
hooks/
providers/
prisma/
public/
styles/
types/
context/
docs/
prompts/
```

Every directory should have a clearly defined responsibility.

---

# Feature Organization

Each feature should remain self-contained.

Example structure:

```
feature/

components/
actions/
server/
hooks/
validators/
types/
utils/
```

Feature code should not be scattered throughout the project.

---

# Shared Components

Reusable components belong inside:

```
components/
```

Examples include:

* Cards
* Buttons
* Inputs
* Tables
* Charts
* Dialogs
* Empty states
* Loading states

Business-specific components should remain inside their feature module.

---

# Rendering Strategy

Server Components should be the default.

Client Components should only exist when browser interaction is required.

Examples:

* Dialog state
* Form interaction
* Theme switching
* Drag-and-drop
* Keyboard shortcuts

Avoid unnecessary client rendering.

---

# Data Fetching

Data should be fetched on the server whenever possible.

Client-side fetching should only be used for highly interactive experiences.

Avoid duplicate requests.

Prefer centralized server actions.

---

# Server Actions

Server Actions are the preferred method for mutations.

Examples include:

* Create
* Update
* Delete
* Authentication
* Upload processing

Business logic should remain inside server actions rather than UI components.

---

# Database Access

Only server-side code may communicate directly with Prisma.

Client Components must never query the database.

All database operations should remain centralized and reusable.

---

# Authentication

Authentication should remain centralized.

Protected routes should rely on shared authentication utilities rather than implementing permission checks inside individual pages.

Roles and permissions should remain consistent throughout the application.

---

# Upload Pipeline

All uploads should follow a single pipeline.

```
User
    ↓
UploadThing
    ↓
Validation
    ↓
Database
    ↓
Application
```

Uploads should never bypass validation.

---

# State Management

Prefer native React state.

Use server state whenever possible.

Avoid introducing global state unless multiple unrelated features genuinely require shared client-side data.

The simplest solution should always be preferred.

---

# Caching Strategy

Cache data where it improves performance.

Invalidate caches after mutations.

Users should never see stale business-critical data.

Caching should be intentional rather than automatic.

---

# Error Handling

Every asynchronous operation should return predictable errors.

Unexpected failures should:

* Log useful information.
* Present meaningful feedback.
* Avoid exposing internal implementation details.

The application should fail gracefully.

---

# Loading Strategy

Every page that depends on asynchronous data should provide a loading experience.

Loading states should:

* Match the final layout.
* Prevent layout shifts.
* Keep navigation responsive.

Skeleton components should be preferred over spinners.

---

# Empty States

Every collection should define an empty state.

Examples:

* No products
* No customers
* No orders
* No analytics

Empty states should guide users toward the next meaningful action.

---

# Navigation

The application consists of two primary experiences.

## Storefront

Customer-facing shopping experience.

## Admin Portal

Administrative business operations.

Navigation between these experiences should remain clearly separated.

---

# Dependency Direction

Dependencies should always flow downward.

```
UI
↓

Features
↓

Infrastructure
↓

Foundation
```

Lower layers must never depend on higher layers.

Avoid circular dependencies.

---

# Extensibility

The architecture should support future additions without major restructuring.

Examples include:

* Multiple storefronts
* Additional admin roles
* New payment providers
* Additional shipping providers
* Mobile applications
* Third-party integrations

New functionality should extend existing systems rather than replacing them.

---

# Architectural Rules

Every implementation should satisfy the following:

* Single responsibility
* Modular design
* Predictable structure
* Reusable abstractions
* Minimal duplication
* Fully typed interfaces
* Server-first architecture
* Accessibility
* Responsive behavior
* Production readiness

---

# Source of Truth

When architectural decisions are unclear:

Do not invent new structures.

Follow this document.

If this document does not define the solution, extend the existing architecture instead of creating a parallel implementation.
