import { CheckCircleIcon, AlertTriangleIcon, XCircleIcon } from "lucide-react";
import { getBusinessHealth } from "@/actions/dashboard-overview";
import type { DateFilterRange } from "@/actions/dashboard-overview";

type HealthStatus = "Healthy" | "Good" | "Warning" | "Action Needed";

interface HealthItemProps {
  label: string;
  status: HealthStatus;
  message: string;
}

function statusIcon(status: HealthStatus) {
  if (status === "Healthy" || status === "Good") {
    return (
      <CheckCircleIcon
        size={15}
        className="text-green-600 dark:text-green-500 shrink-0"
        aria-hidden="true"
      />
    );
  }
  if (status === "Warning") {
    return (
      <AlertTriangleIcon
        size={15}
        className="text-yellow-500 shrink-0"
        aria-hidden="true"
      />
    );
  }
  return (
    <XCircleIcon
      size={15}
      className="text-destructive shrink-0"
      aria-hidden="true"
    />
  );
}

function HealthItem({ label, status, message }: HealthItemProps) {
  return (
    <div className="flex items-start gap-2.5 py-2.5">
      {statusIcon(status)}
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{message}</p>
      </div>
      <span
        className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
          status === "Healthy" || status === "Good"
            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
            : status === "Warning"
            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
            : "bg-destructive/10 text-destructive"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

interface BusinessHealthCardProps {
  range: DateFilterRange;
}

export async function BusinessHealthCard({ range }: BusinessHealthCardProps) {
  const health = await getBusinessHealth(range);

  const items: HealthItemProps[] = [
    {
      label: "Inventory",
      status: health.inventoryHealth as HealthStatus,
      message: health.inventoryMessage,
    },
    {
      label: "Support",
      status: health.supportHealth as HealthStatus,
      message: health.supportMessage,
    },
    {
      label: "Payments",
      status: health.paymentHealth as HealthStatus,
      message: health.paymentMessage,
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-1">
      <h2 className="text-base font-medium">Business Health</h2>
      <p className="text-xs text-muted-foreground mb-2">
        System-wide status indicators
      </p>
      <div className="divide-y divide-border">
        {items.map((item) => (
          <HealthItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

export function BusinessHealthSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-1">
      <div className="h-5 w-32 rounded bg-muted animate-pulse" />
      <div className="h-3 w-48 rounded bg-muted animate-pulse mt-1" />
      <div className="mt-3 space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 py-2">
            <div className="size-4 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-1">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-3 w-36 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
