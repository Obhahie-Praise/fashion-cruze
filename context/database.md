# Database

## Purpose

This document defines the business entities that make up Cruze Commerce.

It is the source of truth for every database model, relationship, and business object in the application.

Every database change should extend this architecture rather than replace it.

---

# Core Principles

Every model should:

* Have a clear business purpose.
* Be normalized where appropriate.
* Support future expansion.
* Maintain referential integrity.
* Include timestamps.
* Support analytics where valuable.
* Avoid duplicate data.

---

# Identity

## User

Represents every registered customer and administrator.

Responsibilities include:

* Authentication
* Authorization
* Customer profile
* Roles
* Preferences

---

## Session

Managed by Better Auth.

Stores active user sessions.

---

## Account

Managed by Better Auth.

Stores OAuth provider information.

---

## Verification

Managed by Better Auth.

Stores verification and password recovery records.

---

## Address

Stores customer shipping and billing addresses.

One customer may have multiple saved addresses.

---

# Catalog

## Product

Represents a sellable item.

Should contain all information required to display, search, sell, and analyse a product.

---

## Product Image

Stores uploaded product images.

Supports multiple images per product.

Supports a designated cover image.

---

## Category

Groups products into logical collections.

Categories should support future nesting if required.

---

## Variant

Represents purchasable variations of a product.

Examples include:

* Size
* Colour
* Material

Products may have multiple variants.

---

## Product Attribute

Stores reusable product characteristics.

Examples include:

* Fabric
* Style
* Occasion
* Season

---

# Inventory

## Inventory

Stores current stock information.

Should remain synchronized with inventory movements.

---

## Inventory Movement

Records every stock adjustment.

Every movement should include a reason.

Examples include:

* Purchase
* Sale
* Return
* Restock
* Damage
* Manual adjustment

---

# Customer Behaviour

## Cart

Represents an active shopping cart.

One customer owns one active cart.

---

## Cart Item

Represents a product inside a cart.

Supports quantity and selected variant.

---

## Wishlist

Stores products a customer wishes to purchase later.

---

## Product View

Records when customers view products.

Supports future recommendation systems.

---

## Search History

Stores customer search activity.

Supports analytics and future search optimization.

---

## Recently Viewed

Tracks products recently viewed by each customer.

---

# Orders

## Order

Represents a completed purchase.

Contains customer, pricing, payment, and fulfillment information.

---

## Order Item

Represents an individual purchased product.

Stores a snapshot of product information at the time of purchase.

---

## Order Status History

Tracks every status change throughout the order lifecycle.

Examples include:

* Placed
* Confirmed
* Packed
* Ready
* Dispatched
* Delivered
* Cancelled
* Refunded

---

## Refund

Stores refund requests and completed refunds.

Includes reason, amount, status, and administrator action.

---

# Payments

## Payment

Represents a payment associated with an order.

Stores gateway references and payment status.

---

## Payment Attempt

Records every payment attempt.

Supports retries and failure analysis.

---

## Payment Webhook

Stores webhook payloads received from the payment gateway.

Used for reconciliation and auditing.

---

# Marketing

## Promotion

Represents promotional campaigns.

Examples include:

* Flash Sale
* Weekend Deals
* Clearance
* New Arrival Campaigns

---

## Promotion Product

Maps products to promotions.

Allows products to participate in multiple campaigns.

---

## Banner

Stores promotional banners displayed throughout the storefront.

---

## Newsletter Subscriber

Stores newsletter subscriptions.

---

# Support

## Ticket

Represents a customer support conversation.

---

## Ticket Message

Stores messages exchanged within a support ticket.

---

## Ticket Attachment

Stores uploaded files associated with support conversations.

---

# Notifications

## Notification

Represents in-app notifications.

Supports future email and push notification integration.

---

## Notification Preference

Stores customer notification preferences.

---

# Uploads

## Upload

Represents every uploaded asset.

Supports:

* Product images
* Promotion banners
* User avatars
* Support attachments
* Brand assets

Business records should reference uploads instead of storing raw file information.

---

# Analytics

## Analytics Event

Stores important business events.

Examples include:

* Product viewed
* Product searched
* Added to cart
* Removed from cart
* Checkout started
* Purchase completed
* Promotion clicked

Analytics should be generated from these events whenever practical.

---

# Administration

## Audit Log

Stores important administrative actions.

Examples include:

* Product updates
* Inventory changes
* Refunds
* Category management
* User role changes
* Promotion management

---

# System

## Store Settings

Stores configurable application settings.

Examples include:

* Store name
* Contact details
* Currency
* Shipping configuration
* Tax configuration
* Branding

---

## Feature Flag

Allows features to be enabled or disabled without code changes.

---

# Relationships

The database should maintain strong relationships between business entities.

Examples include:

* Users own Orders.
* Orders contain Order Items.
* Products belong to Categories.
* Products contain Variants.
* Products contain Images.
* Products participate in Promotions.
* Customers own Carts.
* Carts contain Cart Items.
* Payments belong to Orders.
* Inventory Movements belong to Products.
* Uploads may be referenced by multiple business entities.
* Audit Logs reference administrators.
* Analytics Events reference users where applicable.

---

# Future Expansion

The architecture should support future additions such as:

* Product Reviews
* Ratings
* Loyalty Programmes
* Coupons
* Gift Cards
* Referral System
* Multiple Warehouses
* Multiple Vendors
* AI Recommendations
* Multiple Storefronts

Future functionality should extend the existing models instead of replacing them.
