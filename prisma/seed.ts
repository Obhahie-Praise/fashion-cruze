import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import { faker } from "@faker-js/faker";
import ws from "ws";
import "dotenv/config";
import { subDays, addDays } from "date-fns";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  console.log("Seeding database with 12 months of realistic data...");

  // 1. Clear existing data
  console.log("Cleaning existing data...");
  await prisma.featureFlag.deleteMany({});
  await prisma.storeSettings.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.analyticsEvent.deleteMany({});
  await prisma.inventoryMovement.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.productAttribute.deleteMany({});
  await prisma.variant.deleteMany({});
  await prisma.productCategory.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.recentlyViewed.deleteMany({});
  await prisma.searchHistory.deleteMany({});
  await prisma.productView.deleteMany({});
  await prisma.wishlist.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.paymentAttempt.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.refund.deleteMany({});
  await prisma.orderStatusHistory.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.promotionProduct.deleteMany({});
  await prisma.promotion.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.banner.deleteMany({});
  await prisma.ticketAttachment.deleteMany({});
  await prisma.ticketMessage.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.notificationPreference.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.upload.deleteMany({});
  await prisma.newsletterSubscriber.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Existing data cleared.");

  // Constants
  const NUM_CUSTOMERS = 300;
  const NUM_PRODUCTS = 150;
  const NUM_ORDERS = 800;
  const ONE_YEAR_AGO = subDays(new Date(), 365);

  // Helper for random dates in the past year
  const randomPastDate = () => faker.date.between({ from: ONE_YEAR_AGO, to: new Date() });

  // 2. Seed Store Settings & Flags
  await prisma.storeSettings.createMany({
    data: [
      { key: "store_name", value: "Cruze Commerce", description: "The name of the storefront" },
      { key: "store_email", value: "support@cruzecommerce.com", description: "Support contact email" },
      { key: "currency", value: "NGN", description: "Default currency for checkout" },
      { key: "tax_rate", value: "0.075", description: "VAT tax rate (7.5%)" },
      { key: "shipping_fee", value: "2000.00", description: "Flat shipping rate" },
    ],
  });
  await prisma.featureFlag.createMany({
    data: [
      { name: "promotions_banner", enabled: true, description: "Show the top promotions banner" },
      { name: "search_autocomplete", enabled: true, description: "Enable autocomplete suggestions in search bar" },
      { name: "newsletter_signup", enabled: true, description: "Show the footer newsletter form" },
      { name: "wishlist_feature", enabled: true, description: "Allow customers to wishlist products" },
    ],
  });

  // 3. Seed Users (Admins and Customers)
  console.log("Seeding users...");
  const admin = await prisma.user.create({
    data: {
      email: "admin@cruzecommerce.com",
      name: "Cruze Admin",
      firstName: "Cruze",
      lastName: "Admin",
      role: "admin",
      emailVerified: true,
      createdAt: ONE_YEAR_AGO,
    },
  });

  const customers = [];
  for (let i = 0; i < NUM_CUSTOMERS; i++) {
    const createdAt = randomPastDate();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const customer = await prisma.user.create({
      data: {
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        role: "customer",
        emailVerified: faker.datatype.boolean({ probability: 0.8 }),
        createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
      },
    });
    customers.push(customer);
  }

  // Addresses for a subset of customers
  console.log("Seeding addresses...");
  for (const customer of customers) {
    if (faker.datatype.boolean({ probability: 0.7 })) {
      await prisma.address.create({
        data: {
          userId: customer.id,
          firstName: customer.firstName || "Customer",
          lastName: customer.lastName || "",
          phone: faker.phone.number(),
          addressLine1: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          postalCode: faker.location.zipCode(),
          country: "Nigeria",
          isDefaultShipping: true,
          isDefaultBilling: true,
          type: "shipping",
          createdAt: customer.createdAt,
        },
      });
    }
  }

  // 4. Seed Categories
  console.log("Seeding categories...");
  const categoryNames = ["Men", "Women", "Kids", "Accessories", "Footwear", "Activewear", "Outerwear"];
  const categories = [];
  for (const name of categoryNames) {
    const cat = await prisma.category.create({
      data: {
        name,
        slug: name.toLowerCase(),
        description: faker.commerce.productDescription(),
        isFeatured: faker.datatype.boolean({ probability: 0.4 }),
        createdAt: ONE_YEAR_AGO,
      },
    });
    categories.push(cat);
  }

  // 5. Seed Products, Variants, Inventory
  console.log("Seeding products and inventory...");
  const products = [];
  const allVariants = [];
  
  for (let i = 0; i < NUM_PRODUCTS; i++) {
    const createdAt = randomPastDate();
    const basePrice = parseFloat(faker.commerce.price({ min: 5000, max: 150000 }));
    const hasDiscount = faker.datatype.boolean({ probability: 0.3 });
    const product = await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        slug: faker.helpers.slugify(faker.commerce.productName() + "-" + i).toLowerCase(),
        description: faker.commerce.productDescription(),
        price: hasDiscount ? basePrice * 0.8 : basePrice,
        compareAtPrice: hasDiscount ? basePrice : null,
        costPerItem: basePrice * 0.4,
        sku: `PRD-${faker.string.alphanumeric(6).toUpperCase()}`,
        active: faker.datatype.boolean({ probability: 0.9 }),
        rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
        reviewsCount: faker.number.int({ min: 0, max: 200 }),
        createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
      },
    });
    products.push(product);

    // Assign to 1-2 categories
    const shuffledCategories = faker.helpers.shuffle(categories);
    const numCats = faker.number.int({ min: 1, max: 2 });
    for (let j = 0; j < numCats; j++) {
      await prisma.productCategory.create({
        data: { productId: product.id, categoryId: shuffledCategories[j].id },
      });
    }

    // Variants & Inventory
    const sizes = ["S", "M", "L", "XL"];
    const colors = [faker.color.human(), faker.color.human()];
    
    for (const color of colors) {
      for (const size of sizes) {
        if (faker.datatype.boolean({ probability: 0.7 })) { // Not all sizes/colors available
          const variant = await prisma.variant.create({
            data: {
              productId: product.id,
              name: `${product.name} - ${size} / ${color}`,
              size,
              color,
              price: product.price,
              sku: `${product.sku}-${size}-${color.substring(0,3).toUpperCase()}`,
              createdAt,
            },
          });
          allVariants.push(variant);

          // Inventory: Mix of healthy, low, and out of stock
          const stockState = faker.helpers.weightedArrayElement([
            { weight: 60, value: 'healthy' },
            { weight: 25, value: 'low' },
            { weight: 15, value: 'out' }
          ]);
          
          let qty = 0;
          if (stockState === 'healthy') qty = faker.number.int({ min: 20, max: 100 });
          else if (stockState === 'low') qty = faker.number.int({ min: 1, max: 5 });

          const inv = await prisma.inventory.create({
            data: {
              variantId: variant.id,
              quantity: qty,
              lowStockThreshold: 10,
            },
          });

          if (qty > 0) {
            await prisma.inventoryMovement.create({
              data: {
                inventoryId: inv.id,
                quantityChange: qty,
                type: "RESTOCK",
                reason: "Initial seed",
                createdAt,
              },
            });
          }
        }
      }
    }
  }

  // 6. Seed Promotions
  console.log("Seeding promotions...");
  for (let i = 0; i < 5; i++) {
    const isExpired = faker.datatype.boolean({ probability: 0.3 });
    const isUpcoming = !isExpired && faker.datatype.boolean({ probability: 0.2 });
    
    let startDate, endDate;
    if (isExpired) {
      startDate = faker.date.between({ from: subDays(new Date(), 90), to: subDays(new Date(), 30) });
      endDate = faker.date.between({ from: subDays(new Date(), 29), to: subDays(new Date(), 1) });
    } else if (isUpcoming) {
      startDate = faker.date.between({ from: addDays(new Date(), 5), to: addDays(new Date(), 30) });
      endDate = addDays(startDate, 14);
    } else {
      startDate = subDays(new Date(), faker.number.int({ min: 1, max: 10 }));
      endDate = addDays(new Date(), faker.number.int({ min: 5, max: 20 }));
    }

    const promo = await prisma.promotion.create({
      data: {
        name: faker.commerce.department() + " Sale",
        slug: faker.helpers.slugify(faker.word.words(2)).toLowerCase(),
        discountType: faker.helpers.arrayElement(["PERCENTAGE", "FIXED_AMOUNT"]),
        discountValue: faker.number.int({ min: 10, max: 50 }),
        startDate,
        endDate,
        active: !isExpired,
        createdAt: subDays(startDate, 5),
      },
    });

    // Add some products to promo
    const promoProducts = faker.helpers.arrayElements(products, faker.number.int({ min: 5, max: 20 }));
    for (const p of promoProducts) {
      await prisma.promotionProduct.create({
        data: { promotionId: promo.id, productId: p.id },
      });
    }
  }

  // 7. Seed Orders & Payments
  console.log(`Seeding ${NUM_ORDERS} orders (this may take a moment)...`);
  
  // Sort dates so we can increment order numbers chronologically
  const orderDates = Array.from({ length: NUM_ORDERS }, () => randomPastDate()).sort((a, b) => a.getTime() - b.getTime());
  
  let orderCounter = 1000;
  for (let i = 0; i < NUM_ORDERS; i++) {
    const createdAt = orderDates[i];
    const customer = faker.helpers.arrayElement(customers);
    
    // Address check
    const address = await prisma.address.findFirst({ where: { userId: customer.id } });
    if (!address) continue; // Skip if customer has no address

    // Determine status (older orders more likely delivered/refunded/cancelled)
    const daysAgo = (new Date().getTime() - createdAt.getTime()) / (1000 * 3600 * 24);
    let status;
    if (daysAgo > 14) {
      status = faker.helpers.weightedArrayElement([
        { weight: 85, value: "DELIVERED" },
        { weight: 10, value: "CANCELLED" },
        { weight: 5, value: "REFUNDED" },
      ]);
    } else if (daysAgo > 3) {
      status = faker.helpers.weightedArrayElement([
        { weight: 60, value: "DISPATCHED" },
        { weight: 30, value: "DELIVERED" },
        { weight: 10, value: "PACKED" },
      ]);
    } else {
      status = faker.helpers.weightedArrayElement([
        { weight: 40, value: "PLACED" },
        { weight: 40, value: "CONFIRMED" },
        { weight: 20, value: "PACKED" },
      ]);
    }

    const orderItemsCount = faker.number.int({ min: 1, max: 5 });
    let subtotal = 0;
    const orderVariants = faker.helpers.arrayElements(allVariants, orderItemsCount);
    const orderItemsData = orderVariants.map(v => {
      const qty = faker.number.int({ min: 1, max: 3 });
      const price = parseFloat(v.price?.toString() || "0");
      subtotal += price * qty;
      return {
        productId: v.productId,
        variantId: v.id,
        name: v.name,
        price,
        quantity: qty,
        sku: v.sku,
        createdAt,
      };
    });

    const tax = subtotal * 0.075;
    const shippingFee = 2000.0;
    const total = subtotal + tax + shippingFee;

    const paymentStatus = status === "CANCELLED" ? "FAILED" : status === "REFUNDED" ? "REFUNDED" : "PAID";
    const fulfillmentStatus = status === "DELIVERED" ? "FULFILLED" : (status === "DISPATCHED" ? "PARTIALLY_FULFILLED" : "UNFULFILLED");

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${orderCounter++}`,
        userId: customer.id,
        shippingAddressId: address.id,
        billingAddressId: address.id,
        subtotal,
        tax,
        shippingFee,
        discount: 0,
        total,
        currency: "NGN",
        status,
        paymentStatus,
        fulfillmentStatus,
        createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
        items: {
          create: orderItemsData,
        },
      },
    });

    // Payment
    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        amount: total,
        currency: "NGN",
        status: paymentStatus === "FAILED" ? "FAILED" : "SUCCESSFUL",
        provider: "PAYSTACK",
        transactionId: `TXN-${faker.string.uuid()}`,
        createdAt,
      },
    });

    if (paymentStatus === "REFUNDED") {
       await prisma.refund.create({
         data: {
           orderId: order.id,
           amount: total,
           reason: "Customer request",
           status: "APPROVED",
           actionedById: admin.id,
           createdAt: addDays(createdAt, faker.number.int({ min: 1, max: 5 })),
         }
       });
       // also update payment
       await prisma.payment.update({
         where: { id: payment.id },
         data: { status: "REFUNDED" }
       })
    }

    // Status History
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: "PLACED",
        createdAt,
      }
    });

    if (["CONFIRMED", "PACKED", "DISPATCHED", "DELIVERED"].includes(status)) {
       await prisma.orderStatusHistory.create({
         data: {
           orderId: order.id,
           status: "CONFIRMED",
           createdAt: addDays(createdAt, 0.1), // roughly 2 hours
         }
       });
    }
  }

  // 8. Support Tickets
  console.log("Seeding support tickets...");
  for (let i = 0; i < 50; i++) {
    const customer = faker.helpers.arrayElement(customers);
    const createdAt = randomPastDate();
    const status = faker.helpers.arrayElement(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]);
    const ticket = await prisma.ticket.create({
      data: {
        ticketNumber: `TCK-${faker.number.int({ min: 1000, max: 9999 })}`,
        userId: customer.id,
        name: customer.name,
        email: customer.email,
        subject: faker.helpers.arrayElement(["Order not received", "Return request", "Product question", "Payment failed"]),
        status,
        priority: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
        assignedToId: status !== "OPEN" ? admin.id : null,
        createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
      },
    });

    await prisma.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        senderId: customer.id,
        senderEmail: customer.email,
        message: faker.lorem.paragraph(),
        createdAt,
      }
    });
  }

  console.log("Seeding process completed.");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
