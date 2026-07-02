/**
 * GET /api/dashboard/report?range=this_month
 *
 * Generates and streams a PDF report of the dashboard data.
 * Protected: admin-only.
 */

import { NextRequest } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { format } from "date-fns";
import { createElement } from "react";

import { requireAdmin } from "@/lib/server-utils";
import {
  getMetricCards,
  getBusinessHealth,
  getTopCategories,
  getLowStockProducts,
  getRecentOrders,
  type DateFilterRange,
} from "@/actions/dashboard-overview";
import {
  DashboardReport,
  type DashboardReportData,
} from "@/components/dashboard/overview/dashboard-report";

const VALID_RANGES: DateFilterRange[] = [
  "today",
  "this_week",
  "this_month",
  "this_year",
  "last_7_days",
  "last_30_days",
  "all_time",
];

const RANGE_LABELS: Record<DateFilterRange, string> = {
  today: "Today",
  this_week: "This Week",
  this_month: "This Month",
  this_year: "This Year",
  last_7_days: "Last 7 Days",
  last_30_days: "Last 30 Days",
  all_time: "All Time",
};

export async function GET(request: NextRequest) {
  // ── Auth Guard ───────────────────────────────────────────────────────────
  try {
    await requireAdmin();
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }

  // ── Parse Range ──────────────────────────────────────────────────────────
  const { searchParams } = new URL(request.url);
  const rawRange = searchParams.get("range") ?? "this_month";
  const range: DateFilterRange = VALID_RANGES.includes(
    rawRange as DateFilterRange
  )
    ? (rawRange as DateFilterRange)
    : "this_month";

  // ── Fetch Data ───────────────────────────────────────────────────────────
  const [metrics, health, categories, lowStockRaw, ordersRaw] =
    await Promise.all([
      getMetricCards(range),
      getBusinessHealth(range),
      getTopCategories(range),
      getLowStockProducts(),
      getRecentOrders(),
    ]);

  // ── Shape Data ───────────────────────────────────────────────────────────
  const data: DashboardReportData = {
    range: RANGE_LABELS[range],
    generatedAt: format(new Date(), "PPP 'at' p"),
    metrics,
    health: [
      {
        label: "Inventory",
        status: health.inventoryHealth,
        message: health.inventoryMessage,
      },
      {
        label: "Support",
        status: health.supportHealth,
        message: health.supportMessage,
      },
      {
        label: "Payments",
        status: health.paymentHealth,
        message: health.paymentMessage,
      },
    ],
    categories: categories.map((c) => ({
      name: c.name,
      productCount: c._count.products,
    })),
    lowStock: lowStockRaw
      .filter((item) => item.variant !== null)
      .map((item) => ({
        productName: item.variant!.product.name,
        variantName: item.variant!.name,
        quantity: item.quantity,
      })),
    recentOrders: ordersRaw.map((o) => ({
      orderNumber: o.orderNumber,
      customerName: o.user?.name ?? "Guest",
      total: Number(o.total),
      status: o.status,
      date: format(new Date(o.createdAt), "MMM d, yyyy"),
    })),
  };

  // ── Render PDF ───────────────────────────────────────────────────────────
  const element = createElement(DashboardReport, { data }) as Parameters<typeof renderToBuffer>[0];
  const buffer = await renderToBuffer(element);

  const filename = `cruze-report-${range}-${format(new Date(), "yyyy-MM-dd")}.pdf`;

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
