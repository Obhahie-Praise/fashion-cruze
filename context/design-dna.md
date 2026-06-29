# 04-design-dna.md

# Cruze Design DNA

This document defines the visual identity and user experience standards of Cruze Commerce.

It is not a component library.

It is the design philosophy that every screen, component, interaction, and animation must follow.

The objective is to make every page feel like it belongs to the same carefully designed product.

---

# Design Philosophy

Cruze Commerce is a business operating system.

It should feel calm, premium, intentional, and predictable.

The interface should remove visual noise rather than introduce visual excitement.

Every design decision should improve clarity.

If something does not improve the user's understanding or workflow, it should not exist.

---

# Brand Personality

Every screen should feel:

- Quiet
- Premium
- Minimal
- Spacious
- Confident
- Professional
- Modern
- Fast
- Intentional
- Predictable

The application should never feel:

- Playful
- Loud
- Colorful
- Experimental
- Overdesigned
- Cluttered

---

# Typography

## Font Family

Commissioner is the official font family.

No secondary font families should be introduced.

---

## Font Weight

Maximum font weight allowed anywhere in the application:

Semibold (600)

Never use:

- Bold (700)
- ExtraBold (800)
- Black (900)

Hierarchy should come from spacing, sizing, and positioning rather than heavy typography.

---

## Typography Scale

Page Title

- text-3xl
- font-semibold

Section Title

- text-xl
- font-semibold

Card Title

- text-base
- font-medium

Table Header

- text-sm
- font-medium

Body Text

- text-sm
- font-normal

Descriptions

- text-sm
- muted foreground

Metadata

- text-xs

---

# Spacing

The application follows an 8px spacing system.

Spacing should feel intentional and consistent.

Prefer generous whitespace over crowded layouts.

Never invent arbitrary spacing values.

Visual rhythm is more important than perfectly filling available space.

---

# Layout

Pages should breathe.

Content should remain aligned.

Large screens should not stretch content unnecessarily.

Primary dashboard content should generally remain inside a centered container where appropriate.

Each page should feel balanced regardless of screen size.

---

# Borders

Borders should be subtle.

Avoid excessive visual separation.

Never stack unnecessary borders.

Avoid nesting containers simply to create more borders.

One clean container is preferred over multiple nested ones.

---

# Shadows

Use shadows sparingly.

Most depth should come from spacing and contrast rather than elevation.

Hover states may introduce subtle elevation.

Large drop shadows should be avoided.

---

# Colors

Only semantic color tokens should be used.

Never hardcode colors.

Examples include:

- Background
- Foreground
- Border
- Muted
- Primary
- Secondary
- Accent
- Success
- Warning
- Destructive

The interface should rely on neutral tones.

Color should communicate meaning, not decoration.

---

# Motion

Motion should communicate change.

Preferred transitions include:

- Fade
- Slide
- Expand
- Collapse
- Scale

Transitions should generally remain between:

150ms and 250ms.

Avoid:

- Bounce animations
- Flashing animations
- Decorative movement
- Infinite loaders when skeletons are possible

Motion should always feel subtle.

---

# Responsive Design

Mobile is a first-class experience.

Layouts should adapt naturally instead of simply shrinking.

Components should remain usable on:

- Mobile
- Tablet
- Laptop
- Desktop
- Ultrawide displays

Touch targets should remain comfortable.

---

# Accessibility

Accessibility is required.

Every interactive element should:

- Support keyboard navigation
- Show visible focus states
- Maintain sufficient contrast
- Use semantic HTML
- Remain usable without a mouse

Color should never be the only way information is communicated.

---

# Signature Cruze Patterns

These patterns define the visual language of Cruze Commerce.

Every feature should reuse these patterns.

---

## Dashboard Pages

Every dashboard page follows the same structure.

Page Header

↓

Four Metric Cards

↓

Primary Content Section

↓

Secondary Content Section

↓

Optional Footer Information

Users should immediately recognize every dashboard page.

---

## Metric Cards

Every analytics page begins with four metric cards.

Each card contains:

- Label
- Primary Metric
- Optional supporting information

All metric cards should share identical height and layout.

---

## Tables

Every management page follows the same table pattern.

Toolbar

↓

Search

↓

Actions

↓

Filters

↓

Data Table

↓

Selection Summary

↓

Pagination

Tables should never introduce new interaction patterns.

---

## Search

Search should behave identically everywhere.

It should:

- Focus automatically
- Support keyboard shortcuts where applicable
- Feel instant
- Maintain consistent styling

---

## Tabs

Tabs should:

- Use pill styling
- Scroll horizontally on mobile
- Preserve selected state
- Display counts when appropriate

Never redesign tabs for different pages.

---

## Dialogs

Desktop

Title

↓

Description

↓

Body

↓

Footer Actions

Mobile

Close icon replaces the desktop Cancel button.

The overall layout remains identical.

---

## Forms

Every form follows this order:

Label

↓

Input

↓

Description

↓

Validation

Maintain consistent spacing throughout forms.

---

## Skeletons

Every asynchronous page should include skeleton loading states.

Skeletons should closely resemble the final interface.

Avoid generic loading placeholders.

---

## Empty States

Every empty state should contain:

- Icon or illustration
- Title
- Description
- One clear primary action

Empty states should guide users toward the next meaningful action.

---

## Confirmation Dialogs

Every destructive action requires confirmation.

Users should clearly understand:

- What will happen
- Why it is happening
- Whether it can be undone

---

## Toast Notifications

Toasts should communicate outcomes only.

Messages should be concise.

One message.

One purpose.

---

## Errors

Errors should explain:

- What happened
- What the user can do next

Never expose technical details.

---

# Negative Rules

The AI must never:

- Use font weights above semibold.
- Nest cards inside cards without clear purpose.
- Hardcode colors.
- Invent arbitrary spacing values.
- Create multiple primary actions within one section.
- Introduce inconsistent layouts.
- Mix interaction patterns for similar features.
- Add decorative animations.
- Depend on color alone to communicate status.
- Stretch content across extremely wide screens.
- Create overflowing mobile layouts.
- Modify generated Shadcn UI primitives unless explicitly instructed.
- Build custom components when an existing project component already solves the problem.

---

# The Cruze Test

Before considering any UI implementation complete, verify the following:

- Does the page follow the standard Cruze layout?
- Does it reuse existing design patterns?
- Is the typography calm and never above semibold?
- Is the spacing consistent with the 8px rhythm?
- Is the primary action obvious?
- Is the interface responsive?
- Are loading, empty, and error states implemented?
- Is keyboard accessibility supported?
- Does the page feel visually consistent with every other page in the application?

If any answer is "No", the implementation is not complete.

---

# Definition of Good Design

Good design in Cruze Commerce is not measured by visual complexity.

It is measured by consistency.

Users should never have to learn a new layout, interaction pattern, or visual language when navigating the application.

Every new feature should feel like it has always belonged in the product.