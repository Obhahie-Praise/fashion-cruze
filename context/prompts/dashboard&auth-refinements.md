# Corrective Prompt — Dashboard & Authentication Refinements

## Objective

Refine the existing implementation without redesigning or restructuring the application.

This prompt is a refinement pass only.

Preserve the existing architecture, layout, routing, and component hierarchy unless a change is explicitly required below.

Do not introduce regressions.

---

## Before Starting

Read and follow:

* `AGENTS.md`
* `context/design-dna.md`
* `context/code-standards.md`
* `context/implementation-rules.md`

After implementing every change, perform a complete lint, type, and production build verification.

---

# 1. Dashboard Layout Behaviour

The dashboard shell should behave like a professional desktop application.

Currently, the entire page scrolls.

This should be corrected.

Requirements:

* The **sidebar must remain fixed** to the viewport.
* The **top navigation bar must remain fixed** to the viewport.
* Only the **dashboard page content (children area)** should scroll.
* The sidebar should never move while scrolling.
* The top navigation should never move while scrolling.

The dashboard content should begin **below** the fixed navigation bar.

Do **not** allow the page content to disappear underneath the top navigation.

Do **not** modify the visual spacing of the existing layout.

This should feel like the behaviour of Linear, Vercel, GitHub, or Shopify dashboards.

---

# 2. Overview Page Header

Refine the action controls.

Replace the current date filter with a **Shadcn Select** component.

Requirements:

* Use the existing Shadcn Select.
* Display a calendar/date icon on the left.
* Default selection should be **All Time**.
* Preserve all existing filter options.
* Continue filtering the entire Overview page.

Layout order:

Left:

* Page title
* Description

Right:

* Date filter
* Export PDF
* Reload

The Reload button must always remain the furthest item on the right.

---

# 3. Metric Cards

Adjust the Overview metrics layout.

Display six metric cards.

Requirements:

* Three cards per row.
* The remaining three cards automatically wrap onto the second row.
* Maintain equal spacing.
* Preserve the existing metric card design.

Do not alter the card styling.

Only adjust the layout.

---

# 4. Revenue & Customer Charts

Improve the chart presentation.

The current implementation feels visually rough.

Refine the Recharts implementation.

Requirements:

* Smooth continuous lines.
* No jagged appearance.
* Add a subtle gradient/shadow beneath each line.
* Improve spacing around the chart.
* Improve tooltip styling using the project's Design DNA.
* Improve axis readability.
* Maintain responsiveness.
* Preserve the neutral design language.

The chart should feel elegant and modern rather than purely functional.

---

# 5. Scrollbars

Apply a consistent scrollbar style throughout the application.

Requirements:

* Thin scrollbar.
* Transparent track.
* Minimal thumb styling.
* Low visual prominence.
* Preserve accessibility.
* Apply globally.

The scrollbar should feel almost invisible while remaining usable.

---

# 6. Default User Role

Correct the default role assignment during registration.

Currently:

New users receive:

`user`

This is incorrect.

Newly registered accounts should automatically receive:

`customer`

This should be implemented at the authentication/database layer.

Do not patch this only on the client.

Ensure every newly created account receives the correct default role.

Existing role-based authorization should continue functioning correctly.

---

# Validation

Before completion:

* Verify sidebar remains fixed.
* Verify top navigation remains fixed.
* Verify only the dashboard content scrolls.
* Verify page content never hides beneath the navigation bar.
* Verify the new Shadcn Select functions correctly.
* Verify "All Time" is selected by default.
* Verify the Reload button remains the right-most action.
* Verify the metric cards display in a 3×2 layout.
* Verify the charts render with smooth lines and subtle area shading.
* Verify scrollbars are consistently styled across the application.
* Verify newly registered users receive the `customer` role.
* Verify no authentication regressions.
* Verify no TypeScript errors.
* Verify no linting errors.
* Verify the application builds successfully.
* Run a production build before considering the task complete.

Update `context/progress.md` after all changes have been successfully implemented.
