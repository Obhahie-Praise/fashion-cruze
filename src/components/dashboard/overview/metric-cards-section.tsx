import {
  DollarSignIcon,
  TrendingUpIcon,
  ShoppingBagIcon,
  UsersIcon,
  PackageIcon,
  EyeIcon,
} from "lucide-react";
import type { DateFilterRange } from "@/actions/dashboard-overview";
import { getMetricCards } from "@/actions/dashboard-overview";

interface MetricCardProps {
  label: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
}

function MetricCard({ label, value, description, icon }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {icon}
        </span>
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(1)}K`;
  }
  return `₦${amount.toFixed(0)}`;
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

interface MetricCardsSectionProps {
  range: DateFilterRange;
}

export async function MetricCardsSection({ range }: MetricCardsSectionProps) {
  const metrics = await getMetricCards(range);

  const cards: MetricCardProps[] = [
    {
      label: "Total Revenue",
      value: formatCurrency(metrics.revenue),
      description: "Excludes cancelled & refunded orders",
      icon: <DollarSignIcon size={15} aria-hidden="true" />,
    },
    {
      label: "Total Profit",
      value: formatCurrency(metrics.profit),
      description: "Estimated at 40% margin",
      icon: <TrendingUpIcon size={15} aria-hidden="true" />,
    },
    {
      label: "Total Orders",
      value: formatNumber(metrics.orders),
      description: "All orders in selected period",
      icon: <ShoppingBagIcon size={15} aria-hidden="true" />,
    },
    {
      label: "Active Customers",
      value: formatNumber(metrics.activeCustomers),
      description: "Registered in selected period",
      icon: <UsersIcon size={15} aria-hidden="true" />,
    },
    {
      label: "Active Products",
      value: formatNumber(metrics.products),
      description: "Currently listed products",
      icon: <PackageIcon size={15} aria-hidden="true" />,
    },
    {
      label: "Store Visits",
      value: formatNumber(metrics.storeVisits),
      description: "Estimated from order volume",
      icon: <EyeIcon size={15} aria-hidden="true" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <MetricCard key={card.label} {...card} />
      ))}
    </div>
  );
}

export function MetricCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            <div className="size-8 rounded-md bg-muted animate-pulse" />
          </div>
          <div>
            <div className="h-7 w-20 rounded bg-muted animate-pulse" />
            <div className="mt-1 h-3 w-28 rounded bg-muted animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
