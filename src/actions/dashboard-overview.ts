"use server";

import { prisma } from "@/lib/db";
import { subDays, subYears, startOfDay, startOfWeek, startOfMonth, startOfYear } from "date-fns";

export type DateFilterRange = 
  | "all_time"
  | "today"
  | "this_week"
  | "this_month"
  | "this_year"
  | "last_7_days"
  | "last_30_days";

function getDateRange(range: DateFilterRange): { gte: Date; lte: Date } | undefined {
  const now = new Date();
  switch (range) {
    case "today":
      return { gte: startOfDay(now), lte: now };
    case "this_week":
      return { gte: startOfWeek(now), lte: now };
    case "this_month":
      return { gte: startOfMonth(now), lte: now };
    case "this_year":
      return { gte: startOfYear(now), lte: now };
    case "last_7_days":
      return { gte: subDays(now, 7), lte: now };
    case "last_30_days":
      return { gte: subDays(now, 30), lte: now };
    case "all_time":
    default:
      return undefined;
  }
}

export async function getMetricCards(range: DateFilterRange = "this_month") {
  const dateFilter = getDateRange(range);
  const whereFilter = dateFilter ? { createdAt: dateFilter } : {};

  // Fetch all orders matching the date range
  const orders = await prisma.order.findMany({
    where: whereFilter,
    select: {
      total: true,
      status: true,
    }
  });

  const totalRevenue = orders
    .filter(o => !["CANCELLED", "REFUNDED"].includes(o.status))
    .reduce((sum, order) => sum + Number(order.total), 0);

  // Profit estimation (assuming 40% margin for this example)
  const totalProfit = totalRevenue * 0.4;

  const totalOrders = orders.length;

  const activeCustomers = await prisma.user.count({
    where: {
      role: "customer",
      ...whereFilter
    }
  });

  const totalProducts = await prisma.product.count({
    where: { active: true }
  });

  // Since Store Visits isn't fully tracked yet, returning a mock proportional to orders
  const storeVisits = totalOrders * 12;

  return {
    revenue: totalRevenue,
    profit: totalProfit,
    storeVisits,
    activeCustomers,
    orders: totalOrders,
    products: totalProducts,
  };
}

export async function getBusinessHealth(_range: DateFilterRange = "this_month") {
  
  // Example Health check logic
  const lowStockCount = await prisma.inventory.count({
    where: { quantity: { lte: 5 } }
  });

  const pendingTickets = await prisma.ticket.count({
    where: { status: "OPEN" }
  });

  return {
    inventoryHealth: lowStockCount > 10 ? "Warning" : "Healthy",
    inventoryMessage: `${lowStockCount} items low on stock`,
    supportHealth: pendingTickets > 5 ? "Action Needed" : "Good",
    supportMessage: `${pendingTickets} pending tickets`,
    paymentHealth: "Healthy",
    paymentMessage: "Payments processing normally",
  };
}

export async function getRevenueAnalytics(range: DateFilterRange = "this_month") {
  const dateFilter = getDateRange(range) || { gte: subYears(new Date(), 1), lte: new Date() };
  
  // Aggregate revenue by date
  // For simplicity in development, we'll fetch orders and group them manually
  const orders = await prisma.order.findMany({
    where: {
      createdAt: dateFilter,
      status: { notIn: ["CANCELLED", "REFUNDED"] }
    },
    select: { createdAt: true, total: true }
  });

  const dataMap = new Map<string, { date: string; revenue: number; profit: number }>();
  
  orders.forEach(order => {
    // Format YYYY-MM-DD
    const dateStr = order.createdAt.toISOString().split("T")[0];
    const amount = Number(order.total);
    if (dataMap.has(dateStr)) {
      const existing = dataMap.get(dateStr)!;
      existing.revenue += amount;
      existing.profit += amount * 0.4;
    } else {
      dataMap.set(dateStr, {
        date: dateStr,
        revenue: amount,
        profit: amount * 0.4
      });
    }
  });

  return Array.from(dataMap.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export async function getCustomerAnalytics(range: DateFilterRange = "this_month") {
  const dateFilter = getDateRange(range) || { gte: subYears(new Date(), 1), lte: new Date() };
  
  const customers = await prisma.user.findMany({
    where: {
      role: "customer",
      createdAt: dateFilter
    },
    select: { createdAt: true }
  });

  const dataMap = new Map<string, { date: string; customers: number }>();
  
  customers.forEach(customer => {
    const dateStr = customer.createdAt.toISOString().split("T")[0];
    if (dataMap.has(dateStr)) {
      dataMap.get(dateStr)!.customers += 1;
    } else {
      dataMap.set(dateStr, { date: dateStr, customers: 1 });
    }
  });

  // Cumulative sum could be applied here if desired for "growth"
  let cumulative = 0;
  const sorted = Array.from(dataMap.values()).sort((a, b) => a.date.localeCompare(b.date));
  return sorted.map(d => {
    cumulative += d.customers;
    return { date: d.date, newCustomers: d.customers, totalCustomers: cumulative };
  });
}

export async function getRecentEvents(range: DateFilterRange = "this_month", limit: number = 5) {
  const dateFilter = getDateRange(range);
  const whereFilter = dateFilter ? { createdAt: dateFilter } : {};

  const orders = await prisma.order.findMany({
    where: whereFilter,
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { user: { select: { name: true, email: true } } }
  });

  return orders.map(o => ({
    id: o.id,
    type: "order",
    title: `New Order ${o.orderNumber}`,
    description: `${o.user?.name || "Guest"} placed an order for ${Number(o.total).toLocaleString()} NGN`,
    date: o.createdAt,
    status: o.status
  }));
}

export async function getTopCategories(_range: DateFilterRange = "this_month") {
  // Simplification: top categories by product count
  return await prisma.category.findMany({
    take: 5,
    orderBy: { products: { _count: "desc" } },
    include: {
      _count: { select: { products: true } }
    }
  });
}

export async function getLowStockProducts() {
  return await prisma.inventory.findMany({
    where: { quantity: { lte: 10 } },
    include: {
      variant: {
        include: { product: true }
      }
    },
    take: 10,
    orderBy: { quantity: "asc" }
  });
}

export async function getRecentProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { images: { include: { upload: true } } }
  });
}

export async function getRecentOrders() {
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { user: true }
  });
}

export async function getTopProducts() {
  return await prisma.product.findMany({
    orderBy: { reviewsCount: "desc" },
    take: 10,
    include: { images: { include: { upload: true } } }
  });
}

export async function getRecentCustomerActivity(range: DateFilterRange = "this_month", limit: number = 5) {
  const dateFilter = getDateRange(range);
  const whereFilter = dateFilter ? { createdAt: dateFilter } : {};

  const users = await prisma.user.findMany({
    where: { role: "customer", ...whereFilter },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return users.map(u => ({
    id: u.id,
    type: "registration",
    title: "New Customer Registration",
    description: `${u.name} registered an account.`,
    date: u.createdAt
  }));
}
