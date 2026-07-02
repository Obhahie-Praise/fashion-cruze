import { format } from "date-fns";
import { ShoppingBagIcon, PackageIcon } from "lucide-react";
import type { DateFilterRange } from "@/actions/dashboard-overview";
import { getRecentEvents } from "@/actions/dashboard-overview";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  PROCESSING: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  SHIPPED: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  DELIVERED: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  CANCELLED: "bg-destructive/10 text-destructive",
  REFUNDED: "bg-destructive/10 text-destructive",
};

function eventIcon(type: string) {
  if (type === "order") {
    return (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
        <ShoppingBagIcon size={14} className="text-muted-foreground" aria-hidden="true" />
      </span>
    );
  }
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
      <PackageIcon size={14} className="text-muted-foreground" aria-hidden="true" />
    </span>
  );
}

interface RecentEventsFeedProps {
  range: DateFilterRange;
}

export async function RecentEventsFeed({ range }: RecentEventsFeedProps) {
  const events = await getRecentEvents(range, 8);

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col">
      <h2 className="text-base font-medium mb-0.5">Recent Events</h2>
      <p className="text-xs text-muted-foreground mb-4">Latest business activity</p>

      {events.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-8 gap-2">
          <ShoppingBagIcon size={24} className="text-muted-foreground/40" aria-hidden="true" />
          <p className="text-sm font-medium">No events yet</p>
          <p className="text-xs text-muted-foreground text-center">
            Events will appear here once orders are placed.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border" role="list">
          {events.map((event) => (
            <li key={event.id} className="flex items-start gap-3 py-3">
              {eventIcon(event.type)}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight truncate">{event.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {event.description}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {format(new Date(event.date), "MMM d, h:mm a")}
                </p>
              </div>
              {event.status && (
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    STATUS_STYLES[event.status] ?? "bg-muted text-muted-foreground"
                  }`}
                >
                  {event.status.charAt(0) + event.status.slice(1).toLowerCase()}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RecentEventsSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="h-5 w-28 rounded bg-muted animate-pulse" />
      <div className="h-3 w-40 rounded bg-muted animate-pulse mt-1 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 py-2">
            <div className="size-8 rounded-full bg-muted animate-pulse shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-40 rounded bg-muted animate-pulse" />
              <div className="h-3 w-52 rounded bg-muted animate-pulse" />
              <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
