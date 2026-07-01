# Prompt — Platform Services Foundation

## Objective

Build the remaining platform infrastructure required by Cruze Commerce.

This prompt is responsible for configuring UploadThing and Better Auth.

Do not implement application UI, dashboard pages, storefront functionality, or business logic.

---

## Before Starting

Read and follow, in order:

* `AGENTS.md`
* `context/database.md`
* `context/database-guidelines.md`
* `context/code-standards.md`
* `context/routes.md`
* `context/implementation-rules.md`

Follow all existing project conventions.

---

# Scope

Implement:

* Better Auth configuration
* Google OAuth authentication
* UploadThing configuration
* UploadThing routes
* Upload middleware
* Authentication middleware
* Environment validation
* Server utilities

Do not build any feature pages.

---

# Better Auth

Configure Better Auth using the existing Prisma database.

Implement Google OAuth according to the official Better Auth documentation.

Ensure the authentication system supports:

* Email and password authentication
* Google sign in
* Google sign up
* Session management
* Secure cookies
* Role-based authorization
* Account linking
* Sign out
* Session validation

Authentication should be production-ready.

---

# User Roles

Support the following roles:

* Customer
* Admin

New users should receive the Customer role by default.

The administrator role should be assignable through the database.

Do not hardcode roles throughout the application.

Authorization should remain centralized.

---

# Session Handling

Configure Better Auth to:

* Maintain secure sessions
* Refresh sessions correctly
* Support server-side session retrieval
* Support middleware protection
* Work correctly with the App Router

Avoid unnecessary authentication requests.

---

# UploadThing

Configure UploadThing according to the latest official documentation.

Create reusable upload routes for:

* Product images
* Category images
* Promotion banners
* User avatars
* Support attachments
* Store branding assets

Each route should define:

* Allowed file types
* Maximum file size
* Maximum file count
* Authentication requirements
* Metadata
* Upload completion handler

---

# Upload Security

Validate every upload.

Reject:

* Unsupported file types
* Oversized files
* Unauthorized uploads

Only authenticated administrators may upload administrative assets.

Customer uploads should be restricted to approved routes.

---

# Upload Completion

After a successful upload:

* Persist upload metadata.
* Associate uploads with the Upload model.
* Return only the data required by the client.
* Avoid unnecessary database writes.

---

# Environment Variables

Validate all required environment variables.

Include validation for:

* Better Auth
* Google OAuth
* UploadThing
* Database
* Application URL

Application startup should fail clearly if required variables are missing.

---

# Server Utilities

Create reusable server utilities for:

* Authentication
* Session retrieval
* Upload authorization
* Current user retrieval
* Role verification

Avoid duplicated logic.

---

# Middleware

Configure middleware to support:

* Authentication
* Protected routes
* Public routes
* Admin-only routes
* Upload authorization

Keep middleware lightweight.

---

# Error Handling

Provide consistent handling for:

* Authentication failures
* Upload failures
* Authorization failures
* Missing configuration
* Invalid sessions

Never expose sensitive internal errors.

---

# Validation

Before completion:

* Verify Google OAuth works.
* Verify email authentication still works.
* Verify UploadThing routes function correctly.
* Verify uploads are stored successfully.
* Verify upload metadata is saved.
* Verify session retrieval.
* Verify protected routes.
* Verify admin authorization.
* Verify environment validation.

Resolve every issue before completing the task.

---

# Out of Scope

Do not implement:

* Authentication pages
* Dashboard pages
* Storefront
* Product management
* Orders
* Checkout
* Payments
* Customer support
* Analytics
* UI redesign

This prompt establishes only the platform services required by future features.

---

# Completion Checklist

The task is complete only when:

* Better Auth is fully configured.
* Google OAuth works correctly.
* Email authentication works correctly.
* UploadThing is fully configured.
* All upload routes exist.
* Upload metadata is persisted.
* Middleware is functional.
* Server utilities are reusable.
* No TypeScript errors remain.
* No linting errors remain.
* The application builds successfully.
* `context/progress.md` has been updated.
