import { format } from "date-fns";
import { UserIcon } from "lucide-react";
import type { DateFilterRange } from "@/actions/dashboard-overview";
import { getRecentCustomerActivity } from "@/actions/dashboard-overview";

interface RecentCustomerActivityProps {
  range: DateFilterRange;
}

export async function RecentCustomerActivity({ range }: RecentCustomerActivityProps) {
  const activities = await getRecentCustomerActivity(range, 8);

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col">
      <h2 className="text-base font-medium mb-0.5">Customer Activity</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Recent customer registrations
      </p>

      {activities.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-8 gap-2">
          <UserIcon size={24} className="text-muted-foreground/40" aria-hidden="true" />
          <p className="text-sm font-medium">No customer activity</p>
          <p className="text-xs text-muted-foreground text-center">
            New customer registrations will appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border" role="list">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start gap-3 py-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                <UserIcon size={14} className="text-muted-foreground" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {format(new Date(activity.date), "MMM d, h:mm a")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RecentCustomerActivitySkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="h-5 w-36 rounded bg-muted animate-pulse" />
      <div className="h-3 w-44 rounded bg-muted animate-pulse mt-1 mb-4" />
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
