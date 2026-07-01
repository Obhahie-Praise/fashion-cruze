import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import "dotenv/config";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  console.log("Seeding database...");

  // 1. Clear existing data
  // Clean in correct order of dependency
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
  await prisma.product.deleteMany({});
  await prisma.banner.deleteMany({});
  await prisma.upload.deleteMany({});
  await prisma.newsletterSubscriber.deleteMany({});

  console.log("Existing data cleared.");

  // 2. Seed Store Settings
  await prisma.storeSettings.createMany({
    data: [
      { key: "store_name", value: "Cruze Commerce", description: "The name of the storefront" },
      { key: "store_email", value: "support@cruzecommerce.com", description: "Support contact email" },
      { key: "currency", value: "NGN", description: "Default currency for checkout" },
      { key: "tax_rate", value: "0.075", description: "VAT tax rate (7.5%)" },
      { key: "shipping_fee", value: "2000.00", description: "Flat shipping rate" },
    ],
  });
  console.log("Store settings seeded.");

  // 3. Seed Feature Flags
  await prisma.featureFlag.createMany({
    data: [
      { name: "promotions_banner", enabled: true, description: "Show the top promotions banner" },
      { name: "search_autocomplete", enabled: true, description: "Enable autocomplete suggestions in search bar" },
      { name: "newsletter_signup", enabled: true, description: "Show the footer newsletter form" },
      { name: "wishlist_feature", enabled: true, description: "Allow customers to wishlist products" },
    ],
  });
  console.log("Feature flags seeded.");

  // 4. Seed Categories
  const men = await prisma.category.create({
    data: {
      name: "Men",
      slug: "men",
      description: "Men's fashion clothing and accessories",
      isFeatured: true,
    },
  });

  const women = await prisma.category.create({
    data: {
      name: "Women",
      slug: "women",
      description: "Women's fashion clothing, bags, and luxury items",
      isFeatured: true,
    },
  });

  const accessories = await prisma.category.create({
    data: {
      name: "Accessories",
      slug: "accessories",
      description: "Fashion accessories, jewellery, and watches",
      isFeatured: false,
    },
  });
  console.log("Categories seeded.");

  // 5. Seed Products & Variants & Inventory
  // Product 1: Classic Linen Shirt (Men)
  const linenShirt = await prisma.product.create({
    data: {
      name: "Classic Linen Shirt",
      slug: "classic-linen-shirt",
      description: "A breathable, classic fit linen shirt perfect for casual summer outings.",
      price: 15000.00,
      compareAtPrice: 18000.00,
      costPerItem: 7000.00,
      sku: "MS-LIN-01",
      active: true,
      rating: 4.8,
      reviewsCount: 12,
    },
  });

  await prisma.productCategory.create({
    data: { productId: linenShirt.id, categoryId: men.id },
  });

  // Product 1 Attributes
  await prisma.productAttribute.createMany({
    data: [
      { productId: linenShirt.id, name: "Fabric", value: "100% Linen" },
      { productId: linenShirt.id, name: "Season", value: "Summer" },
      { productId: linenShirt.id, name: "Style", value: "Casual" },
    ],
  });

  // Product 1 Variants
  const sizes = ["S", "M", "L", "XL"];
  for (const size of sizes) {
    const variant = await prisma.variant.create({
      data: {
        productId: linenShirt.id,
        name: `Linen Shirt - ${size} / White`,
        size,
        color: "White",
        price: 15000.00,
        sku: `MS-LIN-01-${size}-WHT`,
      },
    });

    // Create Inventory for Variant
    const inv = await prisma.inventory.create({
      data: {
        variantId: variant.id,
        quantity: 25,
        lowStockThreshold: 5,
      },
    });

    // Inventory movement
    await prisma.inventoryMovement.create({
      data: {
        inventoryId: inv.id,
        quantityChange: 25,
        type: "RESTOCK",
        reason: "Initial import",
      },
    });
  }

  // Product 2: Silk Slip Dress (Women)
  const slipDress = await prisma.product.create({
    data: {
      name: "Silk Slip Dress",
      slug: "silk-slip-dress",
      description: "An elegant, minimal silk slip dress featuring a cowl neckline and adjustable straps.",
      price: 35000.00,
      costPerItem: 15000.00,
      sku: "WD-SLK-02",
      active: true,
      rating: 4.9,
      reviewsCount: 8,
    },
  });

  await prisma.productCategory.create({
    data: { productId: slipDress.id, categoryId: women.id },
  });

  await prisma.productAttribute.createMany({
    data: [
      { productId: slipDress.id, name: "Fabric", value: "100% Mulberry Silk" },
      { productId: slipDress.id, name: "Occasion", value: "Evening" },
    ],
  });

  const dressSizes = ["XS", "S", "M", "L"];
  for (const size of dressSizes) {
    const variant = await prisma.variant.create({
      data: {
        productId: slipDress.id,
        name: `Silk Dress - ${size} / Midnight Black`,
        size,
        color: "Midnight Black",
        price: 35000.00,
        sku: `WD-SLK-02-${size}-BLK`,
      },
    });

    const inv = await prisma.inventory.create({
      data: {
        variantId: variant.id,
        quantity: 15,
        lowStockThreshold: 3,
      },
    });

    await prisma.inventoryMovement.create({
      data: {
        inventoryId: inv.id,
        quantityChange: 15,
        type: "RESTOCK",
        reason: "Initial import",
      },
    });
  }

  // Product 3: Leather Crossbody Bag (Accessories)
  const leatherBag = await prisma.product.create({
    data: {
      name: "Leather Crossbody Bag",
      slug: "leather-crossbody-bag",
      description: "Handcrafted full-grain leather crossbody bag with multiple compartments and brass hardware.",
      price: 45000.00,
      compareAtPrice: 50000.00,
      costPerItem: 22000.00,
      sku: "AC-BAG-03",
      active: true,
      rating: 4.7,
      reviewsCount: 22,
    },
  });

  await prisma.productCategory.create({
    data: { productId: leatherBag.id, categoryId: accessories.id },
  });

  await prisma.productAttribute.createMany({
    data: [
      { productId: leatherBag.id, name: "Material", value: "Full-Grain Leather" },
      { productId: leatherBag.id, name: "Hardware", value: "Solid Brass" },
    ],
  });

  // Single default variant for one-size items
  const bagVariant = await prisma.variant.create({
    data: {
      productId: leatherBag.id,
      name: "Leather Crossbody Bag - O/S Tan",
      size: "O/S",
      color: "Tan",
      price: 45000.00,
      sku: "AC-BAG-03-OS-TAN",
    },
  });

  const bagInv = await prisma.inventory.create({
    data: {
      variantId: bagVariant.id,
      quantity: 50,
      lowStockThreshold: 10,
    },
  });

  await prisma.inventoryMovement.create({
    data: {
      inventoryId: bagInv.id,
      quantityChange: 50,
      type: "RESTOCK",
      reason: "Initial import",
    },
  });

  console.log("Products, variants, and inventory seeded successfully.");
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
