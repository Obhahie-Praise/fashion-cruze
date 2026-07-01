# Prompt — Authentication UI

## Objective

Build the complete authentication user interface for Cruze Commerce.

This prompt is responsible only for the authentication experience and layout.

Do not implement authentication logic.

Do not connect forms to Better Auth.

Do not implement validation beyond basic client-side UI behaviour.

---

## Before Starting

Read and follow:

* `AGENTS.md`
* `context/design-dna.md`
* `context/code-standards.md`
* `context/implementation-rules.md`

Follow all existing project conventions.

---

# Scope

Build:

* Sign In page
* Sign Up page
* Shared authentication layout
* Responsive behaviour
* Authentication carousel
* Form components
* Theme switcher placement

Do not implement authentication functionality.

---

# Overall Layout

The Sign In and Sign Up pages should share a single reusable authentication layout.

The layout should closely follow the provided design reference while respecting Cruze's own design language.

Do not copy colours from the mock-up.

Preserve Cruze's neutral colour palette.

---

# Form Panel

The authentication form should occupy the left side of the layout.

Maintain a clean and minimal appearance.

Use generous spacing throughout.

The Sign In and Sign Up forms should maintain the same visual design across all screen sizes.

Do not redesign or simplify the forms for mobile.

The desktop form should gracefully scale down while preserving its layout and appearance.

---

# Inputs

Every input should have the same border radius.

Maintain identical sizing across all inputs.

Use the project's existing typography and spacing conventions.

---

# Buttons

All primary buttons should use the exact same border radius as the inputs.

Maintain consistent sizing and spacing.

The primary authentication button should use:

* White background in dark mode
* Dark background in light mode

Follow the existing design language.

The Sign In and Sign Up buttons should keep the exact same styling across all breakpoints.

---

# Social Authentication

Display a single Google authentication button.

It should span the available width.

Do not include any additional social providers.

Do not implement functionality yet.

---

# Theme Switcher

Reuse the existing project theme switcher.

Do not redesign it.

Position it at the bottom-right corner of the viewport.

It should remain fixed regardless of page content.

---

# Right Panel (Desktop & Tablet)

The right side of the layout should display a full-height image panel.

The image should span the entire panel.

Text content should overlay the image.

The text should remain anchored to the bottom-left corner.

Maintain sufficient contrast for readability.

---

# Mobile Layout

On mobile devices, the authentication page should follow the provided mobile design.

Instead of removing the right panel entirely, place the carousel at the top of the page.

The mobile carousel should:

* Span the full width of the authentication container.
* Have a reduced height appropriate for mobile devices.
* Display only the images.
* Hide all overlay text.
* Preserve the carousel animation.
* Preserve the three-dot indicator.

Below the carousel, display the authentication form using the same design language as the desktop version.

The mobile experience should feel like a natural continuation of the desktop layout rather than a separate design.

---

# Image Carousel

Implement a non-interactive carousel.

Three slides should automatically rotate.

Use the existing project images.

Do not add new assets.

---

## Slide One

Theme:

Customer Satisfaction

Highlight the confidence and quality customers receive when shopping with Cruze.

---

## Slide Two

Theme:

Order Tracking & Delivery

Communicate reliable delivery and transparent order tracking.

---

## Slide Three

Theme:

Seamless Shopping Experience

Highlight the simplicity, speed, and premium shopping experience offered by Cruze.

---

# Carousel Indicator

Display a three-dot indicator at the top-right corner of the carousel.

The indicator should reflect the currently displayed slide.

It is visual only.

Do not allow manual interaction.

The indicator should appear on both desktop and mobile layouts.

---

# Accessibility

Support:

* Keyboard navigation
* Focus states
* Proper form labels
* Screen reader compatibility

---

# Performance

Optimize images appropriately.

Avoid unnecessary client-side rendering.

Only the carousel behaviour should require client-side interactivity.

---

# Design

Follow the Design DNA.

Maintain:

* Neutral colour palette
* Commissioner typography
* Maximum font weight of Semibold
* Consistent spacing
* Native-first components
* Clean visual hierarchy

The interface should feel premium, calm, and trustworthy.

---

# Validation

Before completion:

* Verify Sign In and Sign Up layouts.
* Verify desktop, tablet, and mobile responsiveness.
* Verify carousel rotation.
* Verify the carousel indicator updates correctly.
* Verify the mobile carousel displays images only.
* Verify the desktop carousel displays both images and text.
* Verify consistent border radius across all form controls.
* Verify theme switcher placement.
* Verify accessibility.
* Verify there are no TypeScript errors.
* Verify there are no linting errors.
* Verify the application builds successfully.

Update `context/progress.md` before completing the task.
