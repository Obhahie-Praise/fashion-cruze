"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";

interface RevenueDataPoint {
  date: string;
  revenue: number;
  profit: number;
}

interface RevenueAnalyticsChartProps {
  data: RevenueDataPoint[];
}

function formatCurrencyAxis(value: number): string {
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `₦${(value / 1_000).toFixed(0)}K`;
  return `₦${value}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1.5 font-medium text-foreground">
        {label ? format(parseISO(label), "MMM d, yyyy") : ""}
      </p>
      {payload.map((item) => (
        <p key={item.name} className="text-muted-foreground">
          <span style={{ color: item.color }} className="font-medium">
            {item.name}:{" "}
          </span>
          {formatCurrencyAxis(item.value)}
        </p>
      ))}
    </div>
  );
}

export function RevenueAnalyticsChart({ data }: RevenueAnalyticsChartProps) {
  if (!data.length) {
    return (
      <div className="flex h-60 items-center justify-center rounded-lg border border-border bg-card">
        <p className="text-sm text-muted-foreground">No revenue data for this period.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h2 className="text-base font-medium mb-0.5">Revenue Analytics</h2>
      <p className="text-xs text-muted-foreground mb-4">Revenue vs. Profit over time</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.12} />
              <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => {
              try {
                return format(parseISO(v), "MMM d");
              } catch {
                return v;
              }
            }}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrencyAxis}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            width={56}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={1.5}
            fill="url(#gradRevenue)"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="profit"
            name="Profit"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1.5}
            strokeDasharray="4 2"
            fill="url(#gradProfit)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueAnalyticsSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="h-5 w-36 rounded bg-muted animate-pulse" />
      <div className="h-3 w-48 rounded bg-muted animate-pulse mt-1 mb-4" />
      <div className="h-[220px] rounded bg-muted/50 animate-pulse" />
    </div>
  );
}
