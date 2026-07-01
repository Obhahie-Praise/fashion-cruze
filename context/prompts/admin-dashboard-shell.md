# Prompt — Admin Dashboard Shell

## Objective

Build the complete administrative dashboard shell for Cruze Commerce.

This prompt establishes the reusable dashboard layout that every future dashboard page will inherit.

Focus on layout, navigation, responsiveness, accessibility, and interaction.

Do not implement page-specific functionality.

---

## Before Starting

Read and follow:

* `AGENTS.md`
* `context/design-dna.md`
* `context/routes.md`
* `context/code-standards.md`
* `context/implementation-rules.md`

Follow all existing project conventions.

---

# Scope

Implement:

* Dashboard layout
* Native sidebar
* Native top navigation
* Responsive behaviour
* Navigation system
* Tooltips
* Breadcrumbs
* User dropdown
* Search button
* Notification button

Do not build dashboard pages.

---

# Dashboard Layout

Create a reusable dashboard layout used by every route under:

`/dashboard/*`

Every dashboard page must inherit this layout automatically.

The layout should remain consistent throughout the application.

---

# Sidebar

The sidebar should be built primarily with native HTML elements.

Do not rely on a pre-built sidebar component.

The design will be recreated from the provided reference.

Implement the sidebar so it is easy to customize later.

---

# Sidebar Links

Include every dashboard route already defined in the project.

Each navigation item should include:

* Icon
* Label
* Active state
* Hover state
* Keyboard accessibility

The active page should always be visually distinguishable.

---

# Sidebar Tooltips

Every sidebar item should display a Shadcn Tooltip on hover.

Tooltip descriptions should be extremely short.

Examples:

Overview — "Business summary"

Orders — "Manage orders"

Products — "Inventory"

Customers — "Customer insights"

Analytics — "Business analytics"

Support — "Support tickets"

Deals — "Promotions"

The tooltip should supplement the interface without becoming verbose.

---

# Search Button

Place a native search button in the top navigation.

Do not use a Shadcn Input component.

The search control should be designed for maximum future customization.

Implementation requirements:

* Styled as a button
* Clearly communicates search
* Opens no functionality yet
* Reserved for future global search

---

# Top Navigation

The top navigation should remain fixed.

Layout:

Left:

* Sidebar toggle
* Search button

Centre:

* Current route displayed using the Shadcn Breadcrumb component
* The breadcrumb should appear visually centred within the navigation bar

Right:

* Notifications icon button
* Existing theme switcher

Do not redesign the theme switcher.

Reuse the existing implementation.

---

# Notifications

Display a native icon button.

No notification functionality is required yet.

Reserve space for future implementation.

---

# User Menu

Do not place Profile or Settings directly inside the sidebar.

Instead, the user avatar/button should open a Shadcn Dropdown Menu.

Include:

* Profile
* Settings
* Sign out

Each item should include an appropriate icon.

The Sign out action should be visually distinguishable.

---

# Responsiveness

The dashboard should adapt cleanly across screen sizes.

Desktop:

* Persistent sidebar

Tablet:

* Collapsible sidebar

Mobile:

* Sidebar presented as a slide-out panel using existing project conventions

Maintain consistent navigation behaviour across all breakpoints.

---

# Accessibility

Support:

* Keyboard navigation
* Focus states
* ARIA labels where appropriate
* Screen reader compatibility

Every interactive element should remain accessible.

---

# Performance

Avoid unnecessary client components.

Prefer Server Components whenever possible.

Only introduce client-side rendering for interactive elements.

---

# Design

Follow the project's Design DNA.

Use:

* Neutral colour palette
* Commissioner typography
* Maximum font weight of Semibold
* Consistent spacing
* Clean visual hierarchy

This prompt establishes structure, not decoration.

---

# Validation

Before completion:

* Verify the dashboard layout is reusable.
* Verify every navigation link functions.
* Verify tooltips display correctly.
* Verify breadcrumbs update automatically.
* Verify responsive behaviour.
* Verify sidebar collapse.
* Verify keyboard navigation.
* Verify accessibility.
* Verify there are no TypeScript errors.
* Verify there are no linting errors.
* Verify the project builds successfully.

Update `context/progress.md` before completing the task.
