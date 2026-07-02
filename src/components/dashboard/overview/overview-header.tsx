"use client";

import { useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  BarChart2Icon,
  RefreshCwIcon,
  DownloadIcon,
} from "lucide-react";
import type { DateFilterRange } from "@/actions/dashboard-overview";

const DATE_RANGE_OPTIONS: { label: string; value: DateFilterRange }[] = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "This Year", value: "this_year" },
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "Last 30 Days", value: "last_30_days" },
  { label: "All Time", value: "all_time" },
];

export function OverviewHeader() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isExporting, startExportTransition] = useTransition();
  const [range, setRange] = useQueryState<DateFilterRange>("range", {
    defaultValue: "this_month",
    parse: (v) => v as DateFilterRange,
  });

  function handleRefresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  function handleExportPdf() {
    startExportTransition(async () => {
      // Open the PDF stream — browser triggers download via Content-Disposition header
      window.location.href = `/api/dashboard/report?range=${range}`;
    });
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Title */}
      <div className="flex items-center gap-2">
        <BarChart2Icon size={20} className="text-muted-foreground" aria-hidden="true" />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-muted-foreground">
            Your business performance at a glance
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Date Range Select */}
        <div className="relative">
          <select
            id="overview-date-range"
            value={range}
            onChange={(e) => setRange(e.target.value as DateFilterRange)}
            className="h-9 rounded-md border border-border bg-background px-3 pr-8 text-sm text-foreground appearance-none cursor-pointer transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Select date range"
          >
            {DATE_RANGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            ▾
          </span>
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isPending}
          aria-label="Refresh dashboard data"
          className="flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          <RefreshCwIcon
            size={15}
            aria-hidden="true"
            className={isPending ? "animate-spin" : ""}
          />
        </button>

        {/* Export PDF */}
        <button
          type="button"
          onClick={handleExportPdf}
          disabled={isExporting}
          aria-label="Export dashboard as PDF"
          className="flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          <DownloadIcon
            size={14}
            aria-hidden="true"
            className={isExporting ? "animate-bounce" : ""}
          />
          <span className="hidden sm:inline">
            {isExporting ? "Generating…" : "Export PDF"}
          </span>
        </button>
      </div>
    </div>
  );
}
