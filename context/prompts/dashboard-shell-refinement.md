# Prompt — Dashboard Shell Refinements

## Objective

Refine the existing dashboard shell by improving the profile experience and implementing the notification system UI.

This prompt is focused only on the dashboard shell and shared navigation components.

Do not redesign the existing dashboard.

Do not modify the Design DNA.

---

## Before Starting

Read and follow:

* `AGENTS.md`
* `context/design-dna.md`
* `context/routes.md`
* `context/database.md`
* `context/implementation-rules.md`

Follow all existing project conventions.

---

# Scope

Implement:

* Sidebar profile section redesign
* Notifications dropdown
* Notification badge
* Responsive behaviour
* Notification data integration

Do not modify page-specific content.

---

# Sidebar Profile

Remove the current profile button implementation.

Create a dedicated profile section anchored to the bottom of the sidebar.

It should always remain at the bottom regardless of the number of navigation links.

The profile button should:

* Span the available width of the sidebar.
* Display the user's avatar.
* Display the user's full name.
* Display the user's role underneath in a more subtle style.
* Follow the project's spacing and typography conventions.

The entire row should be clickable.

---

# Profile Dropdown

Clicking the profile section should open a Shadcn Dropdown Menu.

Include the following actions:

* Profile
* Settings
* Sign Out

Each item should include an appropriate icon.

The Sign Out action should remain visually distinct from the others.

Reuse the existing authentication functionality.

Do not redesign the dropdown.

---

# Notifications Button

The notifications button should remain in the top navigation bar.

Use a native icon button styled according to the project's Design DNA.

Do not redesign the button.

---

# Notification Badge

Display a small badge on the top-right corner of the notification button.

The badge should display the number of unread notifications.

Requirements:

* Hide the badge when there are no unread notifications.
* Support double-digit counts gracefully.
* Use subtle styling that matches the neutral design language.

---

# Notification Dropdown

Clicking the notification button should open a Shadcn Dropdown Menu.

The dropdown should present notifications as a vertical list.

Each notification should contain:

* Title
* Short description
* Relative timestamp (for example: "2 minutes ago", "Yesterday")
* Read/Unread visual state

Unread notifications should be visually distinguishable.

The dropdown should scroll naturally when many notifications exist.

Use Shadcn Scroll Area if necessary.

---

# Notification Events

The notification system should be driven from the database.

Design the implementation so notifications can be created whenever significant application events occur.

Examples include:

* A new customer registers.
* A new order is placed.
* An order is cancelled.
* An order is refunded.
* A payment fails.
* A payment succeeds.
* A support ticket is created.
* A support ticket receives a customer reply.
* Inventory falls below the defined threshold.
* A product becomes out of stock.
* A promotion begins.
* A promotion expires.
* A refund is completed.
* An administrator is invited.
* An administrator account is created.
* An administrator role changes.
* Upload failures requiring administrator attention.
* Any future high-priority system event.

Design the notification model and service so additional event types can be added without modifying the user interface.

---

# Notification Behaviour

When the dropdown is opened:

* Notifications should be retrieved efficiently.
* Unread notifications should remain visually distinct until explicitly marked as read.

Design the implementation so future actions such as:

* Mark as read
* Mark all as read
* View notification details

can be added without restructuring the component.

---

# Mobile Behaviour

Hide the notifications button completely on mobile devices.

The mobile navigation should remain clean and uncluttered.

The notification functionality should still exist and be accessible in future mobile implementations.

---

# Performance

Avoid unnecessary client-side rendering.

Only interactive dropdown behaviour should require client components.

Notification queries should remain lightweight and scalable.

Design the implementation with future pagination and caching in mind.

---

# Accessibility

Support:

* Keyboard navigation
* Screen reader labels
* Focus management
* Proper ARIA attributes
* Accessible dropdown interactions

---

# Validation

Before completion:

* Verify the profile section remains anchored to the bottom of the sidebar.
* Verify the profile button spans the available sidebar width.
* Verify the profile dropdown functions correctly.
* Verify notification badge updates correctly.
* Verify notification dropdown displays database-backed notifications.
* Verify unread notifications are visually distinguishable.
* Verify notifications are hidden on mobile.
* Verify there are no TypeScript errors.
* Verify there are no linting errors.
* Verify the application builds successfully.

Update `context/progress.md` before completing the task.
