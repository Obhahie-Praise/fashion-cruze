import { TagIcon } from "lucide-react";
import { getTopCategories } from "@/actions/dashboard-overview";
import type { DateFilterRange } from "@/actions/dashboard-overview";

interface TopCategoriesListProps {
  range: DateFilterRange;
}

export async function TopCategoriesList({ range }: TopCategoriesListProps) {
  const categories = await getTopCategories(range);

  const maxCount = categories.reduce(
    (max, cat) => Math.max(max, cat._count.products),
    0
  );

  return (
    <div className="rounded-lg border border-border bg-card p-4 flex flex-col">
      <h2 className="text-base font-medium mb-0.5">Top Categories</h2>
      <p className="text-xs text-muted-foreground mb-4">By product count</p>

      {categories.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center py-8 gap-2">
          <TagIcon size={24} className="text-muted-foreground/40" aria-hidden="true" />
          <p className="text-sm font-medium">No categories</p>
          <p className="text-xs text-muted-foreground text-center">
            Categories with products will appear here.
          </p>
        </div>
      ) : (
        <ul className="space-y-3" role="list">
          {categories.map((cat) => {
            const pct = maxCount > 0 ? (cat._count.products / maxCount) * 100 : 0;
            return (
              <li key={cat.id}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium truncate">{cat.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 shrink-0">
                    {cat._count.products} products
                  </span>
                </div>
                <div
                  className="h-1.5 w-full rounded-full bg-muted overflow-hidden"
                  role="progressbar"
                  aria-valuenow={cat._count.products}
                  aria-valuemax={maxCount}
                  aria-label={`${cat.name}: ${cat._count.products} products`}
                >
                  <div
                    className="h-full rounded-full bg-foreground/30 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function TopCategoriesSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="h-5 w-28 rounded bg-muted animate-pulse" />
      <div className="h-3 w-36 rounded bg-muted animate-pulse mt-1 mb-4" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between">
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
              <div className="h-4 w-16 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-1.5 rounded-full bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
