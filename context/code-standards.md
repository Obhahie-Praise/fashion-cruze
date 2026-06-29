# 05-code-standards.md

# Code Standards

This document defines the coding standards for Cruze Commerce.

Every implementation must follow these standards to ensure consistency, maintainability, scalability, and production readiness.

These rules apply to every AI agent and every developer contributing to the project.

---

# General Principles

Code should be:

- Simple
- Predictable
- Readable
- Reusable
- Maintainable
- Fully typed
- Production-ready

Prefer clarity over cleverness.

Readable code is more valuable than concise code.

---

# TypeScript

TypeScript is required throughout the project.

All code should be fully typed.

Avoid implicit types whenever possible.

Do not disable TypeScript errors.

Do not suppress type checking.

---

# Type Safety

Never use:

- any
- unknown as a shortcut
- @ts-ignore
- @ts-expect-error

Solve the underlying typing issue instead.

---

# Interfaces

Use `interface` when defining object structures.

Avoid unnecessary type aliases for object definitions.

Keep interfaces small and composable.

---

# Components

Every component should have a single responsibility.

Keep components focused and reusable.

Avoid components that become responsible for multiple unrelated tasks.

---

# Server and Client Components

Prefer Server Components by default.

Only use Client Components when browser interactivity is required.

Do not add `"use client"` unless necessary.

---

# Business Logic

Business logic should never live inside UI components.

Keep business logic inside:

- Server Actions
- Utility functions
- Feature services

Components should primarily render UI.

---

# Database Access

Database queries must only execute on the server.

Never access Prisma from Client Components.

Keep queries organized and reusable.

---

# Validation

Validate every external input.

Use shared validation schemas.

Avoid duplicated validation logic.

---

# Error Handling

Handle expected failures gracefully.

Provide meaningful feedback.

Never expose internal implementation details to users.

---

# Async Code

Use async/await consistently.

Avoid deeply nested asynchronous logic.

Handle failures explicitly.

---

# Reusability

Before creating new code:

- Look for an existing solution.
- Extend existing abstractions where appropriate.
- Avoid duplication.

---

# Naming

Names should clearly communicate purpose.

Prefer descriptive names over abbreviations.

Maintain consistent naming throughout the project.

---

# Imports

Organize imports consistently.

Remove unused imports.

Avoid circular dependencies.

Import from the closest appropriate module.

---

# File Structure

Keep files focused.

Avoid excessively large files.

Group related functionality together.

Maintain predictable folder structures.

---

# Styling

Use Tailwind CSS utilities.

Avoid unnecessary custom CSS.

Follow the project's established spacing and design conventions.

---

# Accessibility

Every interactive element should remain accessible.

Support keyboard navigation.

Preserve focus visibility.

Use semantic HTML whenever possible.

---

# Performance

Avoid unnecessary rendering.

Prefer server-side rendering.

Keep client-side JavaScript minimal.

Optimize images and expensive computations.

---

# Consistency

Follow existing project patterns.

Do not introduce alternative implementation styles for similar problems.

Consistency is more valuable than personal preference.

---

# Comments

Write self-explanatory code.

Use comments only when they provide important context that cannot be expressed clearly through code.

Avoid redundant comments.

---

# Dependencies

Prefer the existing project stack.

Do not introduce new dependencies without a clear architectural reason.

---

# Production Readiness

Every implementation should:

- Compile successfully.
- Pass linting.
- Pass type checking.
- Handle loading states.
- Handle empty states.
- Handle error states.
- Be responsive.
- Be accessible.

Incomplete implementations should not be considered finished.

---

# Final Rule

When multiple solutions are possible, choose the one that is:

1. Simpler
2. More maintainable
3. More reusable
4. More consistent with the existing architecture

The best code is the code that future developers immediately understand.