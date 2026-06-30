<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

Cruze Commerce — AI Agent Instructions
Purpose

This document is the entry point for every AI agent working on Cruze Commerce.

Before writing a single line of code, every agent must read this file and follow the workflow described below.

Failure to follow these instructions may introduce inconsistencies, architectural drift, duplicated code, or incomplete implementations.

Read Order (Mandatory)

Before beginning any implementation, read the following files in this exact order:

context/project-overview.md
context/design-dna.md
context/code-standards.md
context/features.md
context/user-flows.md
context/database.md
context/routes.md
context/progress.md
context/implementation-rules.md

Do not begin implementation until every required context file has been read.

Before Writing Code

Before making any changes:

Understand the feature being implemented.
Understand the expected user experience.
Identify required database changes.
Identify affected routes.
Identify authentication requirements.
Identify reusable components that already exist.
Review the current project progress.

Never assume.

Never guess.

Implementation Workflow

For every task:

Read the required context.
Create an implementation plan.
Identify reusable code.
Implement the feature.
Verify functionality.
Run quality checks.
Update project progress.

Repeat this process for every implementation.

Prompt Scope

Every prompt represents one complete implementation objective.

Do not work on unrelated features.

Do not partially implement future work.

If a prompt requests the Dashboard Shell, do not begin building Orders.

If a prompt requests Authentication, do not begin implementing Checkout.

Stay within the scope of the current prompt.

Context Is the Source of Truth

If a prompt conflicts with the context files:

Follow the context.

If multiple context files appear inconsistent:

Update nothing.

Instead, identify the conflict and resolve it before continuing.

Architecture Rules

Never change the project architecture unless explicitly instructed.

Do not:

reorganize folders
rename routes
replace established patterns
introduce competing architectures

New code should integrate into the existing architecture.

Design Rules

Follow the Design DNA exactly.

Maintain:

Neutral visual language
Minimal interfaces
Consistent spacing
Commissioner typography
Maximum font weight of Semibold
Existing component patterns

Never redesign existing interfaces without instruction.

Code Rules

Follow the Code Standards.

In particular:

TypeScript only
Never use any
Prefer interfaces over type aliases where appropriate
Prefer Server Components
Use Client Components only when necessary
Reuse existing utilities
Reuse existing components
Avoid duplication
Implementation Quality

Every feature must include:

Loading state
Empty state
Success state
Error state
Validation
Accessibility
Responsive behaviour

A feature is not complete without these states.

Database

Before introducing new data:

Review context/database.md.
Extend existing models when appropriate.
Avoid duplicate fields.
Keep relationships normalized.
Do not create unnecessary tables.
Routes

Before creating pages:

Review context/routes.md.

Every route must follow the documented architecture.

UI Components

Prefer native HTML where appropriate.

Use Shadcn UI only when it provides clear value.

Do not modify generated components/ui/* files unless absolutely necessary.

Shared UI belongs in reusable components.

Business logic never belongs inside shared UI components.

Quality Checks

Before considering a task complete:

Run TypeScript checks.
Run ESLint.
Verify the application builds.
Verify no hydration errors exist.
Verify responsive layouts.
Verify dark and light themes.
Verify accessibility.
Verify the implemented feature behaves correctly.

Do not leave red squiggles in the project.

Do not ignore warnings that indicate real problems.

Completion Requirements

An implementation is complete only when:

The requested objective is fully implemented.
Code Standards have been followed.
Design DNA has been respected.
Existing architecture remains intact.
No lint errors remain.
No TypeScript errors remain.
The project builds successfully.
context/progress.md has been updated.
Progress Tracking

After every meaningful implementation:

Update context/progress.md.

At minimum, update:

Current Goal
Last Completed Task
Current Focus
Completed Work
Work In Progress
Next Tasks
Database Changes
Routes Added
Components Added
Dependencies Added
Testing Status
Session Notes

Never leave the progress tracker outdated.

Final Principle

Build Cruze Commerce as though it will be maintained by a large engineering team.

Prioritize:

Clarity
Consistency
Simplicity
Maintainability
Scalability
Production readiness

Every implementation should leave the project cleaner than it was found.