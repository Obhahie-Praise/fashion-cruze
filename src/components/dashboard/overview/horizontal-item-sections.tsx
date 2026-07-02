import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { PackageIcon, ShoppingBagIcon, TrendingUpIcon } from "lucide-react";
import {
  getRecentProducts,
  getRecentOrders,
  getTopProducts,
} from "@/actions/dashboard-overview";

// ─── Types ────────────────────────────────────────────────────────────────────

interface HorizontalProduct {
  id: string;
  name: string;
  imageUrl?: string;
  subtitle?: string;
  badge?: string;
}

interface HorizontalOrder {
  id: string;
  name: string;
  subtitle?: string;
  badge?: string;
}

// ─── Card Primitives ──────────────────────────────────────────────────────────

function ProductCard({ item }: { item: HorizontalProduct }) {
  return (
    <div className="flex w-44 shrink-0 flex-col gap-2 rounded-lg border border-border bg-card p-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="176px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <PackageIcon size={24} className="text-muted-foreground/40" />
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight truncate">{item.name}</p>
        {item.subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.subtitle}</p>
        )}
      </div>
      {item.badge && (
        <span className="self-start rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {item.badge}
        </span>
      )}
    </div>
  );
}

function OrderCard({ item }: { item: HorizontalOrder }) {
  return (
    <div className="flex w-52 shrink-0 flex-col gap-2 rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <ShoppingBagIcon size={14} className="text-muted-foreground" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-tight truncate">{item.name}</p>
          {item.subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.subtitle}</p>
          )}
        </div>
      </div>
      {item.badge && (
        <span className="self-start rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {item.badge}
        </span>
      )}
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

interface HorizontalSectionWrapperProps {
  title: string;
  description: string;
  viewAllHref?: string;
  children: React.ReactNode;
  isEmpty: boolean;
  emptyIcon: React.ReactNode;
  emptyTitle: string;
  emptyDescription: string;
}

function HorizontalSectionWrapper({
  title,
  description,
  viewAllHref,
  children,
  isEmpty,
  emptyIcon,
  emptyTitle,
  emptyDescription,
}: HorizontalSectionWrapperProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-0.5">
        <h2 className="text-base font-medium">{title}</h2>
        {viewAllHref && !isEmpty && (
          <Link
            href={viewAllHref}
            className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            View all
          </Link>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-4">{description}</p>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-8 gap-2">
          <span className="text-muted-foreground/40">{emptyIcon}</span>
          <p className="text-sm font-medium">{emptyTitle}</p>
          <p className="text-xs text-muted-foreground text-center">{emptyDescription}</p>
        </div>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scroll-smooth">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Composed Sections ────────────────────────────────────────────────────────

export async function RecentProductsSection() {
  const products = await getRecentProducts();

  const items: HorizontalProduct[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: p.images[0]?.upload?.publicUrl,
    subtitle: p.active ? "Active" : "Inactive",
    badge: `Added ${format(new Date(p.createdAt), "MMM d")}`,
  }));

  return (
    <HorizontalSectionWrapper
      title="Recent Products"
      description="Latest products added to the catalog"
      viewAllHref="/dashboard/products"
      isEmpty={items.length === 0}
      emptyIcon={<PackageIcon size={24} />}
      emptyTitle="No products yet"
      emptyDescription="Add products to your catalog to see them here."
    >
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </HorizontalSectionWrapper>
  );
}

export async function RecentOrdersSection() {
  const orders = await getRecentOrders();

  const items: HorizontalOrder[] = orders.map((o) => ({
    id: o.id,
    name: o.orderNumber,
    subtitle: o.user?.name ?? "Guest",
    badge: `₦${Number(o.total).toLocaleString()}`,
  }));

  return (
    <HorizontalSectionWrapper
      title="Recent Orders"
      description="Latest customer orders"
      viewAllHref="/dashboard/orders"
      isEmpty={items.length === 0}
      emptyIcon={<ShoppingBagIcon size={24} />}
      emptyTitle="No orders yet"
      emptyDescription="Customer orders will appear here once placed."
    >
      {items.map((item) => (
        <OrderCard key={item.id} item={item} />
      ))}
    </HorizontalSectionWrapper>
  );
}

export async function TopProductsSection() {
  const products = await getTopProducts();

  const items: HorizontalProduct[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    imageUrl: p.images[0]?.upload?.publicUrl,
    subtitle: `${p.reviewsCount} reviews`,
    badge: p.active ? "Active" : "Inactive",
  }));

  return (
    <HorizontalSectionWrapper
      title="Top Products"
      description="Highest-reviewed products"
      viewAllHref="/dashboard/products"
      isEmpty={items.length === 0}
      emptyIcon={<TrendingUpIcon size={24} />}
      emptyTitle="No top products"
      emptyDescription="Products with reviews will appear here."
    >
      {items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </HorizontalSectionWrapper>
  );
}

export function HorizontalSectionSkeleton({ title: _title }: { title: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="h-5 w-32 rounded bg-muted animate-pulse" />
      <div className="h-3 w-48 rounded bg-muted animate-pulse mt-1 mb-4" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-44 shrink-0 rounded-lg border border-border bg-card p-3 space-y-2"
          >
            <div className="aspect-square w-full rounded-md bg-muted animate-pulse" />
            <div className="h-4 w-28 rounded bg-muted animate-pulse" />
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
