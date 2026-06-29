# 09-routes.md

# Routes

## Purpose

This document defines every application route in Cruze Commerce.

It serves as the single source of truth for navigation, layouts, access control, and route behaviour.

It does not define UI implementation or page design.

Every page introduced into the application must first be documented here.

---

# Route Principles

Every route should define:

- Purpose
- Access level
- Layout
- Rendering strategy
- Required data
- Redirect behaviour
- SEO behaviour (where applicable)

Protected routes must never be accessible without authorization.

---

# Public Routes

---

## /

### Purpose

Storefront homepage.

### Access

Public

### Layout

Storefront Layout

### Rendering

Static with dynamic data sections.

### Data

- Featured products
- Promotions
- Categories
- Recommended products

---

## /signin

### Purpose

Authenticate existing users.

### Access

Public

### Layout

Authentication Layout

### Rendering

Static

### Redirect

Authenticated users should be redirected appropriately.

---

## /signup

### Purpose

Register new users.

### Access

Public

### Layout

Authentication Layout

### Rendering

Static

### Redirect

Customers return to the storefront.

Administrators enter the dashboard.

---

## /forgot-password

### Purpose

Recover an account.

### Access

Public

### Layout

Authentication Layout

### Rendering

Static

---

## /support

### Purpose

Public support information.

### Access

Public

### Layout

Storefront Layout

### Rendering

Static

---

# Storefront

---

## /products

### Purpose

Browse all products.

### Access

Public

### Layout

Storefront Layout

### Rendering

Dynamic

### Data

Products

Categories

Promotions

---

## /products/[slug]

### Purpose

Product details.

### Access

Public

### Layout

Storefront Layout

### Rendering

Dynamic

### Dynamic Parameter

Product slug

### Data

Product

Images

Recommendations

Reviews (future)

---

## /cart

### Purpose

Shopping cart.

### Access

Authenticated Customer

### Layout

Storefront Layout

### Rendering

Dynamic

---

## /checkout

### Purpose

Purchase products.

### Access

Authenticated Customer

### Layout

Storefront Layout

### Rendering

Dynamic

---

## /profile

### Purpose

Customer profile.

### Access

Authenticated Customer

### Layout

Storefront Layout

### Rendering

Dynamic

---

## /orders

### Purpose

Customer order history.

### Access

Authenticated Customer

### Layout

Storefront Layout

### Rendering

Dynamic

---

## /wishlist

### Purpose

Saved products.

### Access

Authenticated Customer

### Layout

Storefront Layout

### Rendering

Dynamic

---

# Administrator

All administrator pages share the Dashboard Layout.

---

## /dashboard

Redirect immediately to:

/dashboard/overview

---

## /dashboard/overview

Purpose

Business overview.

---

## /dashboard/orders

Purpose

Order management.

---

## /dashboard/products

Purpose

Product management.

---

## /dashboard/customers

Purpose

Customer management.

---

## /dashboard/categories

Purpose

Category management.

---

## /dashboard/promotions

Purpose

Deals and promotional campaigns.

---

## /dashboard/analytics

Purpose

Business analytics.

---

## /dashboard/support

Purpose

Customer support management.

---

## /dashboard/settings

Purpose

Application configuration.

---

## /dashboard/profile

Purpose

Administrator profile.

---

# API Routes

Application API routes remain internal.

Every API endpoint should:

- Validate input.
- Authenticate requests.
- Authorize access.
- Return consistent responses.
- Handle failures gracefully.

---

# Upload Routes

UploadThing endpoints should exist for:

- Product Images
- Product Gallery
- User Avatars
- Promotion Banners
- Brand Assets

Uploads should enforce validation before storage.

---

# Dynamic Routes

The following routes are dynamic:

/products/[slug]

Future additions may include:

/category/[slug]

/promotion/[slug]

/orders/[id]

---

# Protected Routes

Authentication required:

- Cart
- Checkout
- Wishlist
- Profile
- Customer Orders

Administrator authentication required:

- Entire Dashboard
- Upload endpoints
- Administrative APIs

---

# Redirect Rules

Unauthenticated users attempting protected actions should be redirected to:

/signin

After successful authentication they should return to the page that initiated authentication.

Administrators always enter:

/dashboard/overview

Customers return to:

the page they originally intended to visit.

---

# Rendering Strategy

Prefer Server Components.

Prefer static rendering whenever possible.

Use dynamic rendering only where live data is required.

Cache expensive server queries appropriately.

Stream server content where beneficial.

---

# Route Naming

Routes should:

- remain lowercase
- use kebab-case
- avoid abbreviations
- remain predictable
- remain REST-like where appropriate

---

# Layout Structure

Storefront Layout

├── Header

├── Main Content

└── Footer

Authentication Layout

└── Authentication Content

Dashboard Layout

├── Sidebar

├── Top Navigation

└── Page Content

Every dashboard page must inherit the Dashboard Layout.

---

# Future Routes

Potential future additions include:

- Product Reviews
- Coupons
- Loyalty
- Referrals
- Warehouse
- Inventory
- Shipping
- Blog
- Careers
- About
- Contact

Routes should remain organized and scalable.