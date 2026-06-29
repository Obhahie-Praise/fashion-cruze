# 08-database.md

# Database Specification

## Purpose

This document defines the complete business data model for Cruze Commerce.

It is the single source of truth for all application data.

It does not define ORM syntax or implementation details.

Every database model should be derived from this document.

Every new feature requiring persistent data must update this document before implementation.

---

# Core Principles

Every model should:

* Have a unique identifier.
* Record creation time.
* Record last update time.
* Support future analytics.
* Preserve historical data whenever possible.
* Avoid destructive deletion unless explicitly required.

---

# Authentication

Stores authentication and authorization information.

## Contains

* User account
* Authentication provider
* Email verification
* Password hash
* Active session information
* Remember Me preference
* Password reset tokens
* Verification tokens

## Relationships

Belongs to one User.

---

# User

Represents every person using the platform.

## Contains

### Identity

* First name
* Last name
* Display name
* Email
* Avatar
* Phone number

### Account

* Role
* Account status
* Authentication status
* Email verification status

### Customer Information

* Default shipping address
* Billing address
* Wishlist
* Shopping cart

### Analytics

* Lifetime spending
* Total orders
* Total completed orders
* Total cancelled orders
* Average order value
* First purchase
* Most recent purchase
* Total products viewed
* Total products purchased
* Promotional purchases
* Referral source
* Last active date

### Relationships

* Orders
* Payments
* Cart
* Wishlist
* Addresses
* Support tickets
* Notifications

---

# Address

Stores shipping and billing addresses.

## Contains

* Recipient
* Phone number
* Country
* State
* City
* Postal code
* Street
* Landmark
* Default address

Relationship:

Belongs to one User.

---

# Product

Represents every product available for purchase.

## Contains

### Basic Information

* Name
* Slug
* Description
* Short description

### Pricing

* Cost price
* Selling price
* Discount price
* Profit margin

### Inventory

* Quantity
* Reserved quantity
* Sold quantity
* Low stock threshold

### Categorization

* Category
* Tags
* Keywords
* Material
* Occasion
* Season
* Target audience

### Media

* Multiple images
* Cover image

### Visibility

* Published
* Featured
* Archived
* Active promotion

### Analytics

* Views
* Cart additions
* Purchases
* Wishlist additions
* Conversion rate
* Revenue generated
* Average rating

Relationships:

* Category
* Promotion
* Order Items
* Cart Items
* Wishlist Items

---

# Category

Groups products.

## Contains

* Name
* Description
* Target audience
* Occasion
* Season
* Material
* Display order
* Active status

Relationship:

Contains many Products.

---

# Promotion

Represents promotional campaigns.

## Contains

* Title
* Description
* Banner
* Start date
* End date
* Status
* Priority
* Featured flag

### Analytics

* Total clicks
* Total purchases
* Revenue generated
* Products included

Relationship:

Contains many Products.

---

# Cart

Represents a customer's active shopping cart.

## Contains

* Owner
* Items
* Total quantity
* Total price
* Last updated

Relationship:

Belongs to one User.

Contains many Cart Items.

---

# Cart Item

Represents a product inside a shopping cart.

## Contains

* Product
* Quantity
* Selected variant
* Unit price
* Total price

Relationships

Belongs to Cart.

Belongs to Product.

---

# Wishlist

Represents saved products.

## Contains

* Owner
* Saved products
* Date added

Relationship:

Belongs to User.

Contains many Products.

---

# Order

Represents a completed purchase.

## Contains

### Customer

* Customer
* Shipping address
* Billing address

### Financial

* Subtotal
* Discount
* Shipping fee
* Taxes
* Total paid
* Currency

### Status

* Pending
* Ready
* Delivered
* Cancelled
* Refunded

### Payment

* Payment reference
* Payment status
* Payment provider

### Logistics

* Tracking number
* Shipping method
* Delivery date

### Analytics

* Profit
* Total items
* Promotion used
* Customer type
* Purchase source

Relationships

Belongs to User.

Contains many Order Items.

Belongs to Payment.

---

# Order Item

Represents a purchased product.

## Contains

* Product
* Quantity
* Variant
* Selling price
* Cost price
* Profit

Relationship

Belongs to Order.

Belongs to Product.

---

# Payment

Stores payment information.

## Contains

* Provider
* Reference
* Status
* Amount
* Currency
* Verification status
* Failure reason
* Refund status
* Refund amount
* Payment date

Relationship

Belongs to one Order.

---

# Support Ticket

Represents customer support requests.

## Contains

* Customer
* Subject
* Description
* Priority
* Status
* Assigned administrator
* Resolution notes

### Analytics

* Created date
* First response
* Resolution time

Relationship

Belongs to User.

---

# Notification

Represents system notifications.

## Contains

* Recipient
* Title
* Message
* Type
* Read status
* Delivery date

Relationship

Belongs to User.

---

# Upload

Represents uploaded files.

## Contains

* File name
* File type
* File size
* Storage key
* Public URL
* Upload purpose
* Upload status

Relationship

May belong to Products, Promotions, Users, or other future entities.

---

# Analytics Snapshot

Stores historical business metrics.

## Contains

* Revenue
* Orders
* Customers
* Products sold
* Average order value
* Conversion rate
* Refund rate
* Promotion performance

Snapshots should preserve historical reporting.

---

# Audit Log

Records important administrative actions.

## Contains

* Administrator
* Action
* Target
* Previous value
* Updated value
* Timestamp
* IP address

Audit logs should never be modified after creation.

---

# Relationships

User

├── Addresses

├── Orders

├── Payments

├── Wishlist

├── Cart

├── Notifications

└── Support Tickets

Category

└── Products

Promotion

└── Products

Order

└── Order Items

Cart

└── Cart Items

Product

├── Images

├── Categories

├── Promotions

├── Order Items

├── Wishlist

└── Cart Items

---

# Analytics Requirements

The database should support reporting for:

* Revenue
* Customer growth
* Product performance
* Promotion performance
* Inventory movement
* Order trends
* Payment success rate
* Refund rate
* Customer retention
* Customer lifetime value
* Average order value
* Best-selling products
* Most viewed products
* Cart abandonment
* Wishlist popularity

Historical reporting should remain possible.

---

# Soft Deletion

Business records should be archived rather than permanently deleted whenever practical.

Archived records should remain available for reporting.

---

# Data Integrity

Relationships should preserve consistency.

Referenced data should never become orphaned.

Business-critical information should remain historically accurate.

---

# Future Expansion

The database should remain extensible for future features including:

* Product reviews
* Coupons
* Loyalty programs
* Referral systems
* Multi-store support
* Inventory warehouses
* Shipment providers
* Email campaigns
* AI recommendations
* Internationalization

The data model should evolve without requiring major architectural changes.
