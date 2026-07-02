import Link from "next/link";
import { AlertTriangleIcon } from "lucide-react";
import { getLowStockProducts } from "@/actions/dashboard-overview";

export async function LowStockList() {
  const rawItems = await getLowStockProducts();
  // Filter out any inventory records whose variant was deleted
  const items = rawItems.filter((item) => item.variant !== null);

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col">
      <div className="flex items-center justify-between mb-0.5">
        <h2 className="text-base font-medium">Low Stock</h2>
        {items.length > 0 && (
          <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
            {items.length} items
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Products running low on inventory
      </p>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-8 gap-2">
          <AlertTriangleIcon
            size={24}
            className="text-muted-foreground/40"
            aria-hidden="true"
          />
          <p className="text-sm font-medium">Inventory levels are healthy</p>
          <p className="text-xs text-muted-foreground text-center">
            No products are running low on stock.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border" role="list">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-tight truncate">
                  {item.variant!.product.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.variant!.name}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-xs font-medium tabular-nums ${
                    item.quantity === 0
                      ? "text-destructive"
                      : item.quantity <= 3
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.quantity} left
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/dashboard/products"
        className="mt-4 text-xs text-muted-foreground underline-offset-4 hover:underline"
      >
        Manage inventory →
      </Link>
    </div>
  );
}

export function LowStockSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="h-5 w-24 rounded bg-muted animate-pulse" />
      <div className="h-3 w-44 rounded bg-muted animate-pulse mt-1 mb-4" />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <div className="flex-1 space-y-1">
              <div className="h-4 w-36 rounded bg-muted animate-pulse" />
              <div className="h-3 w-24 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-4 w-12 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
