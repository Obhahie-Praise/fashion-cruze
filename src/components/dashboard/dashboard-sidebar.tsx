"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  PackageIcon,
  UsersIcon,
  TagIcon,
  PercentIcon,
  BarChart3Icon,
  HeadphonesIcon,
  SettingsIcon,
} from "lucide-react";
import { SidebarNavItem } from "@/components/dashboard/sidebar-nav-item";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  tooltip: string;
  icon: React.ReactNode;
  group: "management" | "system";
}

const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard/overview",
    label: "Overview",
    tooltip: "Business summary",
    icon: <LayoutDashboardIcon size={16} />,
    group: "management",
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    tooltip: "Manage orders",
    icon: <ShoppingCartIcon size={16} />,
    group: "management",
  },
  {
    href: "/dashboard/products",
    label: "Products",
    tooltip: "Inventory",
    icon: <PackageIcon size={16} />,
    group: "management",
  },
  {
    href: "/dashboard/categories",
    label: "Categories",
    tooltip: "Product categories",
    icon: <TagIcon size={16} />,
    group: "management",
  },
  {
    href: "/dashboard/promotions",
    label: "Promotions",
    tooltip: "Promotions",
    icon: <PercentIcon size={16} />,
    group: "management",
  },
  {
    href: "/dashboard/customers",
    label: "Customers",
    tooltip: "Customer insights",
    icon: <UsersIcon size={16} />,
    group: "management",
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    tooltip: "Business analytics",
    icon: <BarChart3Icon size={16} />,
    group: "system",
  },
  {
    href: "/dashboard/support",
    label: "Support",
    tooltip: "Support tickets",
    icon: <HeadphonesIcon size={16} />,
    group: "system",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    tooltip: "Configuration",
    icon: <SettingsIcon size={16} />,
    group: "system",
  },
];

interface DashboardSidebarInnerProps {
  isCollapsed: boolean;
}

/**
 * DashboardSidebarInner
 *
 * The inner content of the sidebar — shared by the desktop aside and the
 * mobile Sheet. Uses pathname for active state detection.
 */
export function DashboardSidebarInner({ isCollapsed }: DashboardSidebarInnerProps) {
  const pathname = usePathname();

  const managementItems = NAV_ITEMS.filter((item) => item.group === "management");
  const systemItems = NAV_ITEMS.filter((item) => item.group === "system");

  return (
    <div className="flex h-full flex-col">
      {/* Brand header */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-border px-4",
          isCollapsed ? "justify-center" : "gap-2"
        )}
      >
        <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary">
          <span className="text-xs font-semibold text-primary-foreground" aria-hidden="true">
            C
          </span>
        </div>
        {!isCollapsed && (
          <span className="text-sm font-semibold tracking-tight text-foreground">
            Cruze Console
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-3"
        aria-label="Dashboard navigation"
      >
        {/* Management group */}
        <div className="flex flex-col gap-0.5">
          {!isCollapsed && (
            <p className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
              Management
            </p>
          )}
          {managementItems.map((item) => (
            <SidebarNavItem
              key={item.href}
              href={item.href}
              label={item.label}
              tooltip={item.tooltip}
              icon={item.icon}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>

        {/* System group */}
        <div className="flex flex-col gap-0.5">
          {!isCollapsed && (
            <p className="mb-1 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/60">
              System
            </p>
          )}
          {systemItems.map((item) => (
            <SidebarNavItem
              key={item.href}
              href={item.href}
              label={item.label}
              tooltip={item.tooltip}
              icon={item.icon}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
