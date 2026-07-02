import { Suspense } from "react";
import type { Metadata } from "next";
import type { DateFilterRange } from "@/actions/dashboard-overview";

// Components
import { OverviewHeader } from "@/components/dashboard/overview/overview-header";
import {
  MetricCardsSection,
  MetricCardsSkeleton,
} from "@/components/dashboard/overview/metric-cards-section";
import {
  BusinessHealthCard,
  BusinessHealthSkeleton,
} from "@/components/dashboard/overview/business-health-card";
import {
  RevenueAnalyticsChart,
  RevenueAnalyticsSkeleton,
} from "@/components/dashboard/overview/revenue-analytics-chart";
import {
  CustomerAnalyticsChart,
  CustomerAnalyticsSkeleton,
} from "@/components/dashboard/overview/customer-analytics-chart";
import {
  RecentEventsFeed,
  RecentEventsSkeleton,
} from "@/components/dashboard/overview/recent-events-feed";
import {
  RecentCustomerActivity,
  RecentCustomerActivitySkeleton,
} from "@/components/dashboard/overview/recent-customer-activity";
import { TopCategoriesList, TopCategoriesSkeleton } from "@/components/dashboard/overview/top-categories-list";
import { LowStockList, LowStockSkeleton } from "@/components/dashboard/overview/low-stock-list";
import {
  RecentProductsSection,
  RecentOrdersSection,
  TopProductsSection,
  HorizontalSectionSkeleton,
} from "@/components/dashboard/overview/horizontal-item-sections";

// Server Actions (for chart data — fetched in page to pass as props to client components)
import {
  getRevenueAnalytics,
  getCustomerAnalytics,
} from "@/actions/dashboard-overview";

export const metadata: Metadata = {
  title: "Overview",
  description: "Business performance overview for Cruze Commerce",
};

// Dynamic — no caching for always-fresh dashboard data
export const dynamic = "force-dynamic";

interface OverviewPageProps {
  searchParams: Promise<{ range?: string }>;
}

// ─── Revenue Chart Wrapper ────────────────────────────────────────────────────
// Chart components are Client Components (they use recharts). We fetch data
// server-side and pass it as serialisable props.

async function RevenueChartWrapper({ range }: { range: DateFilterRange }) {
  const data = await getRevenueAnalytics(range);
  return <RevenueAnalyticsChart data={data} />;
}

async function CustomerChartWrapper({ range }: { range: DateFilterRange }) {
  const data = await getCustomerAnalytics(range);
  return <CustomerAnalyticsChart data={data} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function OverviewPage({ searchParams }: OverviewPageProps) {
  const params = await searchParams;
  const validRanges: DateFilterRange[] = [
    "today",
    "this_week",
    "this_month",
    "this_year",
    "last_7_days",
    "last_30_days",
    "all_time",
  ];
  const range: DateFilterRange =
    validRanges.includes(params.range as DateFilterRange)
      ? (params.range as DateFilterRange)
      : "this_month";

  return (
    <div className="space-y-6 pb-10">
      {/* ── Header ────────────────────────────────────────────────── */}
      <OverviewHeader />

      {/* ── Metric Cards ──────────────────────────────────────────── */}
      <Suspense fallback={<MetricCardsSkeleton />}>
        <MetricCardsSection range={range} />
      </Suspense>

      {/* ── Analytics Charts ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Suspense fallback={<RevenueAnalyticsSkeleton />}>
          <RevenueChartWrapper range={range} />
        </Suspense>
        <Suspense fallback={<CustomerAnalyticsSkeleton />}>
          <CustomerChartWrapper range={range} />
        </Suspense>
      </div>

      {/* ── Business Health + Recent Events ───────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Suspense fallback={<BusinessHealthSkeleton />}>
          <BusinessHealthCard range={range} />
        </Suspense>

        <div className="lg:col-span-2">
          <Suspense fallback={<RecentEventsSkeleton />}>
            <RecentEventsFeed range={range} />
          </Suspense>
        </div>
      </div>

      {/* ── Catalog Highlights ────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Suspense fallback={<TopCategoriesSkeleton />}>
          <TopCategoriesList range={range} />
        </Suspense>
        <Suspense fallback={<LowStockSkeleton />}>
          <LowStockList />
        </Suspense>
        <Suspense fallback={<RecentCustomerActivitySkeleton />}>
          <RecentCustomerActivity range={range} />
        </Suspense>
      </div>

      {/* ── Recent Products, Orders & Top Products ────────────────── */}
      <div className="space-y-6">
        <Suspense fallback={<HorizontalSectionSkeleton title="Recent Products" />}>
          <RecentProductsSection />
        </Suspense>
        <Suspense fallback={<HorizontalSectionSkeleton title="Recent Orders" />}>
          <RecentOrdersSection />
        </Suspense>
        <Suspense fallback={<HorizontalSectionSkeleton title="Top Products" />}>
          <TopProductsSection />
        </Suspense>
      </div>
    </div>
  );
}