# Prompt — Authentication Completion

## Objective

Complete the authentication system for Cruze Commerce.

This prompt finalizes both the authentication user interface and its functionality using the existing Better Auth foundation.

This should result in a fully working authentication flow.

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

Complete:

* Sign In functionality
* Sign Up functionality
* Google authentication
* Forgot Password flow
* Session creation
* Session persistence
* Redirect logic
* Final authentication UI polish

Do not modify the established design language.

---

# Sign Up Form

Replace the current Full Name field with two inputs.

Required fields:

* First Name
* Last Name
* Email Address
* Password

The first and last name inputs should appear side-by-side on desktop.

They should stack naturally on smaller screens.

---

# Password Input

The password field should follow modern authentication conventions.

Requirements:

* Placeholder text
* Password reveal / hide icon
* Toggle visibility without clearing the input
* Accessible labels
* Keyboard accessible

Reuse the same component across Sign In and Sign Up.

---

# Terms Agreement

Before the Create Account button, display a checkbox.

The checkbox should state that the user agrees to the Terms of Service and Privacy Policy.

The Create Account button must remain disabled until the checkbox has been checked.

The Terms of Service and Privacy Policy should be rendered as links for future implementation.

---

# Forgot Password

Display a "Forgot password?" link above the Sign In button.

Selecting the link should open a modal dialog.

Use the existing dialog implementation.

The modal should contain:

* Email input
* Short explanatory text
* Send reset email button
* Cancel button

After submission:

* Validate the email.
* Trigger Better Auth's password reset flow.
* Display appropriate success or failure feedback.

Do not navigate away from the page.

---

# Session Behaviour

Users should remain signed in automatically.

Do not implement a "Keep me signed in" checkbox.

Persistent sessions should be handled by Better Auth configuration.

---

# Mobile Improvements

On mobile devices:

The authentication form should:

* Have rounded top corners.
* Visually overlap the carousel.
* Cast a subtle shadow onto the carousel beneath it.
* Maintain comfortable spacing.

The transition between carousel and form should feel intentional.

---

# Theme Switcher

Desktop:

Remain fixed at the bottom-right corner.

Mobile:

Remain absolutely positioned at the bottom-right of the viewport.

Do not redesign the existing theme switcher.

---

# Authentication Functionality

Connect the interface to Better Auth.

Implement:

* Email Sign Up
* Email Sign In
* Google Sign In
* Google Sign Up
* Sign Out
* Session restoration
* Session validation

Use the official Better Auth APIs.

Do not create custom authentication logic.

---

# User Creation

When a user creates an account:

* Store first name.
* Store last name.
* Store full name where required.
* Store email.
* Create the authentication account.
* Create the associated database records.
* Assign the default Customer role.

Ensure the operation completes atomically.

Prevent partially created users.

---

# Redirect Behaviour

After successful authentication:

Admins:

Redirect to:

`/dashboard/overview`

Customers:

Redirect to:

`/`

Preserve callback URLs when appropriate.

---

# Google Authentication

The Google authentication button should be fully functional.

Support:

* Existing users
* New users
* Account linking where supported by Better Auth

Avoid duplicate accounts.

---

# Error Handling

Provide clear user-friendly feedback for:

* Invalid credentials
* Existing account
* Weak password
* Missing fields
* Network failures
* Authentication failures
* OAuth failures
* Password reset failures

Never expose internal server errors.

---

# Accessibility

Ensure:

* Keyboard navigation
* Screen reader support
* Proper labels
* Accessible dialogs
* Focus trapping inside the password reset dialog
* Correct focus restoration when the dialog closes

---

# Performance

Avoid unnecessary client components.

Use Server Components wherever possible.

Only interactive form behaviour should require client-side rendering.

---

# Validation

Before completion:

* Verify email registration.
* Verify email sign in.
* Verify Google sign in.
* Verify Google sign up.
* Verify password reset emails.
* Verify session persistence.
* Verify automatic session restoration.
* Verify admin redirects.
* Verify customer redirects.
* Verify mobile layout.
* Verify responsive behaviour.
* Verify accessibility.
* Verify there are no TypeScript errors.
* Verify there are no linting errors.
* Verify the application builds successfully.
* Run a production build to confirm authentication behaves correctly.

Update `context/progress.md` before completing the task.
