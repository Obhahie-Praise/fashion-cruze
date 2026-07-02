"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";

interface CustomerDataPoint {
  date: string;
  newCustomers: number;
  totalCustomers: number;
}

interface CustomerAnalyticsChartProps {
  data: CustomerDataPoint[];
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
          {item.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export function CustomerAnalyticsChart({ data }: CustomerAnalyticsChartProps) {
  if (!data.length) {
    return (
      <div className="flex h-60 items-center justify-center rounded-lg border border-border bg-card">
        <p className="text-sm text-muted-foreground">
          No customer data for this period.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h2 className="text-base font-medium mb-0.5">Customer Growth</h2>
      <p className="text-xs text-muted-foreground mb-4">
        New registrations and cumulative customers
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
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
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="newCustomers"
            name="New Customers"
            stroke="hsl(var(--primary))"
            strokeWidth={1.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="totalCustomers"
            name="Total Customers"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1.5}
            strokeDasharray="4 2"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CustomerAnalyticsSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="h-5 w-36 rounded bg-muted animate-pulse" />
      <div className="h-3 w-52 rounded bg-muted animate-pulse mt-1 mb-4" />
      <div className="h-[220px] rounded bg-muted/50 animate-pulse" />
    </div>
  );
}
