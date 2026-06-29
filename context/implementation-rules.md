# 11-implementation-rules.md

# Implementation Rules

## Purpose

This document defines the mandatory workflow every AI agent must follow before, during, and after implementing any feature in Cruze Commerce.

These rules ensure consistency, maintainability, and production readiness across the entire application.

These rules are mandatory.

---

# 1. Read Context First

Before writing any code, read the project context in the following order:

1. `agents.md`
2. `context/project-overview.md`
3. `context/design-dna.md`
4. `context/code-standards.md`
5. `context/features.md`
6. `context/user-flows.md`
7. `context/database.md`
8. `context/routes.md`
9. `context/progress.md`

Do not begin implementation until the required context has been understood.

---

# 2. Understand Before Building

Before making changes:

* Identify the feature being implemented.
* Understand its dependencies.
* Understand the expected user experience.
* Understand the required data.
* Understand affected routes.
* Understand authentication requirements.

Never guess implementation details.

---

# 3. Preserve Existing Architecture

Follow the existing project architecture.

Do not reorganize folders, rename files, or replace established patterns unless explicitly instructed.

New implementations should integrate naturally with the existing codebase.

---

# 4. Build Incrementally

Implement one complete feature at a time.

Avoid mixing unrelated work into the same implementation.

Complete the current objective before moving to another feature.

---

# 5. Reuse Before Creating

Before creating a new component, utility, hook, or helper:

* Search for an existing implementation.
* Extend reusable code where appropriate.
* Avoid duplication.

---

# 6. Keep Features Self-Contained

Each feature should:

* Own its business logic.
* Own its validation.
* Own its loading states.
* Own its error handling.
* Own its success feedback.

Avoid unnecessary coupling between features.

---

# 7. Respect the Design System

Every implementation must follow the Design DNA.

Do not introduce new visual patterns unless they improve the existing system and remain consistent.

Consistency is preferred over novelty.

---

# 8. Handle Every State

Every feature must account for:

* Loading
* Empty
* Success
* Error
* Unauthorized
* Forbidden

No feature is complete without these states.

---

# 9. Protect Data Integrity

Validate all user input.

Respect authentication and authorization.

Prevent invalid database operations.

Avoid destructive actions unless explicitly confirmed.

---

# 10. Prioritize Server Components

Prefer Server Components by default.

Use Client Components only when required for interactivity or browser APIs.

Keep client-side JavaScript minimal.

---

# 11. Optimize Performance

Prefer efficient queries.

Cache server data where appropriate.

Avoid unnecessary re-renders.

Avoid unnecessary network requests.

Do not optimize prematurely, but never introduce avoidable inefficiencies.

---

# 12. Verify Before Completion

Before considering a task complete:

* Run linting.
* Run type checking.
* Verify the build.
* Resolve warnings where practical.
* Confirm the feature behaves as expected.

Do not leave known errors unresolved.

---

# 13. Update Project Context

After every meaningful implementation:

* Update `context/progress.md`.
* Record database changes.
* Record new routes.
* Record new dependencies.
* Record architectural decisions when applicable.

The context system must always reflect the current project state.

---

# 14. Leave the Project Better

Every implementation should improve the project.

Where appropriate:

* Simplify existing code.
* Remove duplication.
* Improve readability.
* Improve consistency.
* Improve maintainability.

Avoid introducing unnecessary complexity.

---

# Definition of Complete

A task is complete only when:

* The feature matches its specification.
* The implementation follows the Design DNA.
* The implementation follows the Code Standards.
* All required user flows are supported.
* Database changes are complete.
* Routes behave correctly.
* Authentication is respected.
* Loading, empty, success, and error states exist.
* The code passes linting.
* The code passes type checking.
* The project builds successfully.
* `context/progress.md` has been updated.

Only then should the implementation be considered complete.
