# Database Guidelines

## Purpose

This document defines the implementation standards for the Cruze Commerce database.

It explains how every model should be designed, maintained, queried, and extended.

All database work must follow these guidelines.

---

# General Principles

The database should prioritize:

* Correctness
* Performance
* Scalability
* Maintainability
* Security
* Consistency

Never optimize prematurely, but always build with future growth in mind.

---

# Naming

Use clear, descriptive names.

Model names should be singular.

Field names should be meaningful and self-explanatory.

Relationship names should accurately describe the connection between models.

Avoid abbreviations unless they are universally understood.

---

# Primary Keys

Every business model should have a stable primary key.

Primary keys must never change after creation.

Avoid exposing internal implementation details through identifiers.

---

# Timestamps

Every business model should include creation and update timestamps.

Include deletion timestamps only when soft deletion is required.

Use UTC for all stored dates and times.

Never rely on client-side timestamps for business-critical records.

---

# Relationships

Prefer normalized relationships.

Use foreign keys to maintain integrity.

Avoid duplicating information across tables.

Model many-to-many relationships explicitly when they carry business meaning.

---

# Soft Deletes

Use soft deletion for records that may need recovery, auditing, or historical reporting.

Avoid permanently deleting business-critical data unless explicitly required.

When soft deletes are used, ensure queries exclude deleted records by default.

---

# Money

Never store monetary values using floating-point types.

Use precise decimal types for all financial data.

Store values in a consistent currency format.

Perform financial calculations on the server.

---

# Transactions

Use database transactions whenever multiple related operations must succeed together.

Examples include:

* Creating orders
* Completing payments
* Processing refunds
* Updating inventory
* Assigning promotions

Never leave related data in a partially updated state.

---

# Indexing

Index fields that are frequently used for:

* Searching
* Filtering
* Sorting
* Joining
* Authentication
* Lookups

Use composite indexes where common query patterns require them.

Avoid unnecessary indexes that increase write overhead.

---

# Query Performance

Only retrieve the data required for a request.

Avoid loading large object graphs unnecessarily.

Prevent N+1 query patterns.

Use pagination for large datasets.

Perform filtering, sorting, and aggregation within the database whenever practical.

---

# Pagination

Never load large collections in a single request.

Use pagination for all list-based endpoints.

Cursor-based pagination is preferred for frequently changing datasets.

Offset pagination is acceptable for stable administrative views.

---

# Caching

Cache data that changes infrequently.

Examples include:

* Categories
* Store configuration
* Navigation
* Promotional content

Invalidate caches whenever the underlying data changes.

Avoid stale business-critical information.

---

# Analytics

Store business events instead of precomputed charts whenever practical.

Generate reports from reliable event data.

Only introduce aggregated tables or snapshots when profiling demonstrates a measurable performance benefit.

---

# Search

Design search to remain efficient as the catalog grows.

Prepare searchable fields for indexing.

Support future filtering by:

* Category
* Keywords
* Attributes
* Variants
* Promotions

Search should remain responsive for large product catalogs.

---

# Uploads

Store upload metadata separately from business entities.

Business records should reference uploads instead of embedding file details.

Validate uploaded file types and sizes before persistence.

---

# Authentication

Authentication data is managed by Better Auth.

Do not duplicate authentication information across unrelated tables.

Business models should reference authenticated users through relationships.

---

# Payments

Treat the payment gateway as the authoritative source for payment confirmation.

Persist:

* Payment attempts
* Successful payments
* Failed payments
* Gateway references
* Webhook events

Never rely solely on client-side confirmation.

---

# Inventory

Every inventory change must be traceable.

Record:

* Reason
* Quantity change
* Time
* Actor

Maintain a complete inventory history.

---

# Audit Logging

Administrative actions that affect business data should be recorded.

Audit entries should identify:

* The actor
* The affected resource
* The action performed
* The timestamp

Audit records should not be editable.

---

# Validation

Validate all data before writing to the database.

Never trust client input.

Business rules should be enforced on the server.

---

# Migrations

Database schema changes must be introduced through migrations.

Avoid destructive schema changes without a migration strategy.

Preserve existing production data whenever possible.

---

# Seeding

Maintain a repeatable development seed.

Seed only the data necessary for development and testing.

Do not depend on seeded data in production.

---

# Performance

Design every query with growth in mind.

Assume the application will eventually contain:

* Hundreds of thousands of users
* Millions of products
* Millions of orders
* Millions of analytics events

Avoid implementations that require loading excessive data into memory.

---

# Reliability

Handle transient database failures gracefully.

Use connection pooling where supported.

Avoid unnecessary database connections.

Retry only operations that are safe to retry.

Never hide database failures silently.

---

# Security

Protect sensitive data.

Apply the principle of least privilege.

Validate authorization before every database operation.

Prevent unauthorized reads and writes.

Never expose confidential information through queries or API responses.

---

# Future Expansion

The database should support future capabilities without major redesign.

Examples include:

* Reviews
* Ratings
* Referrals
* Coupons
* Loyalty programmes
* Warehouses
* Multiple vendors
* Multiple storefronts
* AI-powered recommendations

Extend the existing architecture instead of replacing it.

---

# Source of Truth

The database is the authoritative source for all business data.

Every implementation should preserve consistency, integrity, performance, and long-term maintainability.
