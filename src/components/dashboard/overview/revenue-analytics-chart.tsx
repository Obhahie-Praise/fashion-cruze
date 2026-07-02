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
    <div className="rounded-lg border border-border bg-popover px-3.5 py-2.5 text-xs shadow-lg">
      <p className="mb-2 text-xs font-medium text-muted-foreground">
        {label ? format(parseISO(label), "MMMM d, yyyy") : ""}
      </p>
      <div className="flex flex-col gap-1.5">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-6">
            <span className="flex items-center gap-1.5 text-foreground">
              <span
                className="inline-block size-2 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              {item.name}
            </span>
            <span className="font-medium text-foreground">
              {formatCurrencyAxis(item.value)}
            </span>
          </div>
        ))}
      </div>
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
    <div className="rounded-lg border border-border bg-card p-5">
      <h2 className="text-base font-medium mb-0.5">Revenue Analytics</h2>
      <p className="text-xs text-muted-foreground mb-5">Revenue vs. Profit over time</p>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 6, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.18} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.14} />
              <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
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
            interval="preserveStartEnd"
            minTickGap={40}
            tickFormatter={(v) => {
              try {
                return format(parseISO(v), "MMM d");
              } catch {
                return v;
              }
            }}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            dy={6}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrencyAxis}
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            width={60}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
          />
          <Area
            type="natural"
            dataKey="revenue"
            name="Revenue"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="url(#gradRevenue)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            isAnimationActive={false}
          />
          <Area
            type="natural"
            dataKey="profit"
            name="Profit"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            strokeDasharray="5 3"
            fill="url(#gradProfit)"
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueAnalyticsSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="h-5 w-36 rounded bg-muted animate-pulse" />
      <div className="h-3 w-48 rounded bg-muted animate-pulse mt-1 mb-5" />
      <div className="h-[240px] rounded bg-muted/50 animate-pulse" />
    </div>
  );
}
