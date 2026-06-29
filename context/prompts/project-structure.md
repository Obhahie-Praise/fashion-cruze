# 03 - Project Structure

## Objective

Create the architectural skeleton of Cruze Commerce.

Do not implement business logic or feature UI.

Only establish the project's structure.

---

# Before You Begin

Read every context document.

Follow the existing architecture.

---

# Task 1 — Folder Structure

Create the project folders defined in the architecture.

Only create folders.

Do not populate them with feature code.

---

# Task 2 — Route Groups

Organize the application using Next.js Route Groups.

Create:

- Store
- Dashboard
- Authentication
- API

Each group should own its own layout.

---

# Task 3 — Layouts

Create:

- Store Layout
- Dashboard Layout
- Authentication Layout

Layouts should only contain the structural shell.

No business UI.

---

# Task 4 — Routes

Create every route defined in `context/routes.md`.

Each page should simply display its route name.

No feature implementation.

No page design.

No placeholder business components.

---

# Task 5 — Global Route Files

Create:

- loading.tsx
- error.tsx
- not-found.tsx

Where appropriate.

Use lightweight placeholders only.

---

# Task 6 — Configure Path Aliases

Ensure imports throughout the project use the configured aliases.

---

# Task 7 — Verification

Confirm:

- Every route resolves.
- Layouts render.
- Route groups function correctly.
- No TypeScript errors.
- No lint errors.
- Project builds successfully.

---

# Restrictions

Do not:

- Build features.
- Build dashboards.
- Build storefront.
- Build authentication pages.
- Connect to the database.
- Write business logic.

Only create the project structure.

---

# Completion Checklist

Before finishing:

- Folder structure matches the architecture.
- Route groups exist.
- Layouts exist.
- Routes exist.
- Global route files exist.
- Imports use aliases.
- No lint errors remain.
- No TypeScript errors remain.
- Project builds successfully.
- Update `context/progress.md`.