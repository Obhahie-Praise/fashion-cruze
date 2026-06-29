# 01-project.md

# Project Overview

## Project Name

Cruze Commerce

---

# Vision

Cruze Commerce is a modern, production-grade e-commerce platform built for fashion and lifestyle brands.

The platform consists of two connected applications:

- A customer-facing storefront for browsing, purchasing, and managing orders.
- A secure administrative portal for managing products, inventory, customers, orders, promotions, analytics, and business operations.

The goal is not simply to sell products, but to build a scalable commerce platform capable of supporting future business growth.

---

# Project Philosophy

The project follows several core principles.

## Server First

Whenever possible, business logic should execute on the server.

Client Components should exist only when browser interactivity is required.

---

## Performance First

Every implementation should prioritize:

- Fast page loads
- Efficient database queries
- Optimistic UI where appropriate
- Intelligent caching
- Lazy loading
- Minimal client-side JavaScript

---

## Consistency Before Creativity

Every feature should feel like it belongs to the same application.

Layouts, spacing, typography, dialogs, forms, tables, and interactions should follow a single design language.

Consistency is more valuable than introducing unique designs for individual pages.

---

## Accessibility

Every feature should be keyboard accessible and usable by assistive technologies.

Accessibility is considered part of the implementation, not an optional enhancement.

---

## Production Quality

Every feature should be implemented as if it will immediately be deployed to production.

Temporary implementations, placeholder logic, and incomplete workflows should be avoided unless explicitly requested.

---

# Objectives

The platform should provide:

- Secure authentication
- Reliable product management
- Inventory management
- Order management
- Customer management
- Promotions and deals
- Checkout experience
- Payment processing
- Business analytics
- Customer support tools

---

# Long-Term Goals

The architecture should support future expansion including:

- Multiple storefront themes
- Multiple administrators
- Staff permissions
- Multi-vendor capabilities
- International shipping
- Multiple currencies
- Wishlist functionality
- Product reviews
- Notifications
- Coupons
- Discount engines
- AI-assisted analytics
- Mobile application support

The architecture should avoid decisions that prevent these future additions.

---

# Development Principles

The project should always prioritize:

1. Correctness
2. Maintainability
3. Scalability
4. Readability
5. Performance
6. Accessibility
7. User Experience

Code should never sacrifice long-term maintainability for short-term speed.

---

# Artificial Intelligence Guidelines

AI is treated as an implementation assistant, not the software architect.

AI should:

- Follow the documented architecture.
- Never invent project structure.
- Never redesign existing systems unless instructed.
- Never duplicate functionality.
- Prefer reusable solutions over isolated implementations.
- Keep implementations modular and maintainable.
- Follow all documented coding standards.

Whenever uncertainty exists, AI should follow the documented project context rather than making assumptions.

---

# Project Structure

The project is divided into four major layers.

## Foundation

Infrastructure required for the application.

Examples include:

- Database
- Authentication
- Upload system
- Theme system
- Shared utilities

---

## Design System

Reusable UI foundations including:

- Typography
- Components
- Layouts
- Forms
- Dialogs
- Tables
- Navigation
- Loading states

---

## Infrastructure

Core systems used throughout the application.

Examples:

- Product engine
- Order engine
- Customer engine
- Analytics engine
- Search engine

---

## Features

Individual application experiences built using the shared systems.

Examples:

- Dashboard
- Products
- Orders
- Customers
- Storefront
- Checkout
- Support

---

# Definition of Success

The project is considered successful when it is:

- Production-ready
- Fully typed
- Well documented
- Accessible
- Responsive
- Secure
- Performant
- Easy to extend
- Easy to maintain
- Consistent throughout the entire application

Every implementation should move the project closer to this goal.

---

# Scope

This repository contains only the application itself.

Brand strategy, marketing assets, deployment configuration, infrastructure management, and external business operations are outside the scope of this project unless explicitly documented.

---

# Source of Truth

When conflicts exist between implementation and documentation:

The files inside the `context/` directory are the authoritative source of truth.

AI agents should always follow the documented project context before making implementation decisions.