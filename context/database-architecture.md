# Database Architecture

## Purpose

This document defines the architectural principles for Cruze Commerce's database.

It is **not** a schema.

It defines how data should be structured, related, optimized, and expanded over time.

Every database decision must follow these principles.

---

# Philosophy

The database should be designed for long-term growth.

Every table should support:

* Scalability
* Maintainability
* Analytics
* Performance
* Auditability
* Future expansion

Never design only for today's requirements.

Design for years of growth.

---

# Domain-Driven Design

Organize the database into business domains.

Each domain owns its own data and relationships.

Core domains include:

* Identity
* Catalog
* Inventory
* Orders
* Payments
* Marketing
* Customer Behaviour
* Shipping
* Support
* Notifications
* Analytics
* Audit
* System

Future domains should integrate into this structure rather than creating isolated solutions.

---

# Historical Data

Never store only the current state if historical data provides business value.

Examples include:

* Order status changes
* Inventory changes
* Price changes
* Promotion activity
* Customer actions
* Administrative actions

Historical records enable analytics, reporting, auditing, and recovery.

---

# Customer Behaviour

Customer behaviour is a first-class feature of the platform.

Collect behavioural data that enables actionable insights while respecting user privacy and applicable regulations.

Examples include:

* Product views
* Search queries
* Recently viewed products
* Wishlist activity
* Cart activity
* Checkout attempts
* Purchases
* Promotion interactions
* Category browsing

Behavioural data should support recommendations, analytics, and future personalization.

---

# Analytics

Do not design tables around charts.

Design tables around events.

Dashboards should calculate metrics from stored business events rather than relying on duplicated summary values whenever practical.

Analytics should support:

* Customers
* Products
* Revenue
* Promotions
* Inventory
* Orders
* Marketing
* Support
* Administration

---

# Relationships

Prefer normalized relationships.

Avoid duplicate information across multiple tables.

Use foreign keys to preserve integrity.

Only denormalize when measurable performance benefits justify it.

---

# Soft Deletes

Business records should generally support soft deletion where recovery or auditing is valuable.

Avoid permanently deleting important business data unless explicitly required.

---

# Auditing

Administrative actions should be traceable.

Record important actions such as:

* Product creation
* Product updates
* Product deletion
* Category changes
* Order management
* Refunds
* Role changes
* Promotion management

Audit records should include:

* Who performed the action
* What changed
* When it occurred

---

# Upload Management

Files should not be treated as simple URLs.

Uploaded assets should be managed through dedicated upload records.

Uploads should support:

* Ownership
* File type
* File size
* Storage key
* Public URL
* Upload timestamp

Business records should reference uploads instead of embedding upload metadata repeatedly.

---

# Payments

Payments must be designed for reliability.

Never rely solely on client-side payment confirmation.

Store:

* Payment attempts
* Successful payments
* Failed payments
* Gateway references
* Webhook events

The payment provider should be treated as the source of payment confirmation.

---

# Inventory

Inventory should be event-driven.

Track stock movements instead of storing only the current stock value.

Inventory changes should always have a reason.

Examples include:

* Purchase
* Refund
* Manual adjustment
* Restock
* Damage
* Return

---

# Performance

The database should be designed for high traffic.

Target reliable performance under significant concurrent usage.

Prefer:

* Proper indexing
* Efficient queries
* Pagination
* Cursor-based loading where appropriate
* Server-side filtering
* Server-side sorting
* Database aggregation
* Batched operations

Avoid:

* N+1 query patterns
* Repeated expensive joins
* Unbounded queries
* Returning unnecessary columns
* Large payloads

---

# Caching

Do not query the database unnecessarily.

Use appropriate caching for data that changes infrequently.

Examples include:

* Categories
* Navigation
* Store configuration
* Promotions
* Dashboard summaries
* Analytics snapshots where appropriate

Cache invalidation should occur when underlying data changes.

---

# Scalability

The platform should remain responsive as usage grows.

Design with the expectation that thousands of users may browse, search, and purchase simultaneously.

Avoid architectures that require loading excessive data into memory.

Prefer efficient pagination, streaming, incremental rendering, and database-side computation over client-side processing.

---

# Search

Design product search to be efficient.

Support future expansion for:

* Categories
* Keywords
* Collections
* Promotions
* Attributes
* Variants

Search should remain fast as the catalog grows.

---

# Security

Never expose sensitive information unnecessarily.

Validate all database operations.

Protect administrative operations.

Use transactions where multiple related writes must succeed together.

---

# Future Expansion

The database should allow future features such as:

* Reviews
* Ratings
* Loyalty
* Referrals
* Coupons
* Gift Cards
* Warehouses
* Multiple Vendors
* Multiple Storefronts
* AI Recommendations

Future features should extend the existing architecture rather than replacing it.

---

# Source of Truth

The database is the single source of truth for business data.

Avoid duplicate sources of truth.

Every implementation should preserve consistency, integrity, and long-term maintainability.
