# Prompt — Dashboard Overview

## Objective

Build the `/dashboard/overview` page for Cruze Commerce.

This page is the business command center for administrators, presenting real-time business insights in a clean, performant, and highly responsive interface.

Follow the existing Design DNA, code standards, and implementation rules.

---

## Before Starting

Read and follow:

* `AGENTS.md`
* `context/design-dna.md`
* `context/database.md`
* `context/routes.md`
* `context/implementation-rules.md`

---

# Page Header

At the top-left, display:

* Page title
* Short description beneath it

At the top-right, display:

* Date filter dropdown
* Export PDF button
* Refresh button

---

# Date Filter

The date filter controls every database query on this page.

Available filters:

* All Time
* Today
* This Week
* This Month
* This Year
* Last 7 Days
* Last 30 Days

Changing the selected filter should refetch every data-driven section without reloading the page.

---

# Refresh Button

Add a refresh button beside the Export button.

The refresh button must **not** reload the page.

Instead, it should:

* Revalidate the dashboard data.
* Refetch only the required database queries.
* Preserve scroll position.
* Preserve page state.
* Preserve the selected date filter.

While refreshing:

* Disable the refresh button.
* Display an inline loading indicator.
* Show loading skeletons only for sections currently being refreshed.

Do not display a full-page loading state.

---

# Export Button

Provide an Export PDF button.

Generate a professionally designed business overview PDF.

Include relevant business information such as:

* Revenue
* Profit
* Orders
* Customers
* Products
* Selected reporting period
* Revenue chart
* Customer chart
* Top categories
* Business health summary
* Recent activity

Choose an appropriate PDF generation library.

The resulting document should match Cruze's design language.

---

# Quick Actions

Below the page header, include quick action buttons.

Include:

* Add Product
* Add Category
* Create Deal
* Export Products

These buttons should prepare the interface for future functionality.

---

# Metric Cards

Display six metric cards.

Maintain the existing metric card design used throughout the dashboard.

Metrics:

* Revenue
* Profit
* Store Visits
* Active Customers
* Orders
* Products

Display trend indicators where appropriate.

---

# Business Health

Display a business health summary card.

Provide concise status items derived from current business data.

Examples include:

* Revenue trend
* Inventory health
* Pending support issues
* Payment health
* Store activity

Design this section so future AI-generated insights can be introduced without restructuring the interface.

---

# Revenue Analytics

Display a card containing:

* Title
* Description
* Current revenue summary
* Percentage change from the previous period

Include a Recharts line chart.

Provide a filter allowing administrators to display:

* Revenue
* Profit
* Revenue & Profit

The chart should update according to the selected date filter.

---

# Customer Analytics

Display a second analytics card.

Include:

* Title
* Description
* Customer summary
* Percentage change

Display customer growth over time using Recharts.

The chart should respond to the global date filter.

---

# Events

Display a card showing recent business events.

Show five events initially.

Provide a "Show More" action that loads five additional events each time.

Possible events include:

* New orders
* Payments
* Refunds
* Product creation
* Support tickets
* User registrations
* Inventory alerts

---

# Top Categories

Display the highest-performing product categories.

Rank categories using business performance metrics.

Do not include a "See More" action.

---

# Low Stock

Display products approaching their stock threshold.

Provide sufficient information for administrators to identify products requiring restocking.

---

# Recent Customer Activity

Display recent customer activity.

Possible events include:

* New registrations
* Purchases
* Refund requests
* Cart activity
* Reviews

Present the information as a clean activity feed.

---

# Horizontal Product Sections

Create three horizontally scrollable sections using one reusable card component.

Sections:

* Recent Products
* Recent Orders
* Top Products

Each section should include:

* Title
* Description
* Horizontal scrolling cards
* "Showing 10 items" footer

Each card should link to its corresponding detail page.

Display only the ten most relevant records.

---

# Skeleton Loading

The dashboard structure should render immediately.

Do not skeletonize static interface elements.

The following should appear instantly:

* Page title
* Description
* Date filter
* Export button
* Refresh button
* Quick actions
* Section titles
* Section descriptions

Only database-driven content should display loading skeletons.

Skeletons should be shown for:

* Metric cards
* Business health
* Revenue analytics
* Customer analytics
* Events
* Top categories
* Low stock
* Recent customer activity
* Recent products
* Recent orders
* Top products

Every database-driven section should have its own independent loading state.

Do not block the entire page while waiting for one query.

Wrap each data-driven section in its own Suspense boundary.

---

# Performance

Optimize all queries.

Cache dashboard data appropriately.

Subsequent visits should reuse cached data where appropriate.

Manual refresh should retrieve fresh data.

Avoid unnecessary client components.

Use Server Components whenever possible.

---

# Accessibility

Ensure:

* Keyboard navigation
* Screen reader compatibility
* Proper focus management
* Accessible charts where possible
* Responsive behaviour

---

# Validation

Before completion:

* Verify all dashboard queries.
* Verify global date filtering.
* Verify refresh behaviour.
* Verify PDF export.
* Verify chart rendering.
* Verify caching.
* Verify independent Suspense boundaries.
* Verify skeleton loading.
* Verify responsive behaviour.
* Verify there are no TypeScript errors.
* Verify there are no linting errors.
* Verify the application builds successfully.

Update `context/progress.md` before completing the task.
