# Prompt — Database Foundation

## Objective

Build the complete database foundation for Cruze Commerce.

This prompt is responsible only for creating the database infrastructure required for the rest of the application.

Do not implement any application UI or business functionality.

---

## Before Starting

Read and follow, in order:

* `AGENTS.md`
* `context/database-architecture.md`
* `context/database.md`
* `context/database-guidelines.md`
* `context/code-standards.md`
* `context/implementation-rules.md`

These documents are the source of truth.

Do not invent architecture that conflicts with them.

---

## Scope

Implement the complete Prisma database foundation.

This includes:

* Prisma configuration
* Prisma schema
* Database models
* Model relationships
* Enums
* Constraints
* Indexes
* Migrations
* Development seed
* Prisma Client generation

Do not implement any UI.

Do not implement application logic.

Do not implement API routes.

---

## Database Models

Create every model defined in `context/database.md`.

Relationships should accurately reflect the documented architecture.

Future scalability should always take priority over convenience.

---

## Better Auth

Integrate Better Auth with Prisma.

Ensure every required authentication model exists and follows Better Auth's recommended schema.

Do not modify Better Auth's required models unless integration requires documented extensions.

---

## Upload Infrastructure

Create the upload model described in the database context.

The upload model will become the central reference for every uploaded asset throughout the application.

Do not create feature-specific upload tables.

---

## Performance

Apply the standards defined in `context/database-guidelines.md`.

Ensure:

* Proper indexing
* Efficient relationships
* Appropriate constraints
* Normalized data
* Optimized query patterns

Avoid unnecessary duplication.

---

## Migrations

Generate the initial migration.

The migration should represent the complete database foundation.

Avoid placeholder models.

Avoid incomplete schemas.

---

## Development Seed

Create a reusable seed script.

Seed only development data.

Include realistic sample data where appropriate.

The seed should support development of future features without modification.

---

## Validation

Before completion:

* Validate the Prisma schema.
* Generate Prisma Client.
* Ensure migrations execute successfully.
* Verify relationships.
* Verify indexes.
* Verify constraints.
* Verify seed execution.

Resolve every issue before considering the task complete.

---

## Out of Scope

Do not implement:

* Authentication UI
* Dashboard
* Storefront
* API routes
* UploadThing routes
* Payments
* Orders
* Products
* Analytics
* Components
* Styling

This prompt establishes only the database foundation.

---

## Completion Checklist

The task is complete only when:

* Every database model exists.
* Relationships are correct.
* Constraints are applied.
* Indexes are implemented.
* Prisma Client generates successfully.
* Migrations execute successfully.
* Development seed runs successfully.
* No TypeScript errors remain.
* No Prisma validation errors remain.
* `context/progress.md` has been updated.
