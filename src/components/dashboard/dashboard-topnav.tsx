"use client";

import { usePathname } from "next/navigation";
import { PanelLeftIcon, SearchIcon, BellIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { DashboardUserMenu } from "@/components/dashboard/dashboard-user-menu";
import { DashboardSidebarInner } from "@/components/dashboard/dashboard-sidebar";
import { useState } from "react";

interface DashboardTopNavProps {
  onToggleSidebar: () => void;
}

/**
 * Converts a pathname segment into a human-readable label.
 * e.g. "dashboard" → "Dashboard", "overview" → "Overview"
 */
function segmentToLabel(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * DashboardTopNav
 *
 * Fixed top navigation bar for the admin dashboard.
 *
 * Left:   Sidebar toggle button | Search button
 * Centre: Shadcn Breadcrumb (auto-generated from pathname)
 * Right:  Notifications | Theme toggle | User menu
 */
export function DashboardTopNav({ onToggleSidebar }: DashboardTopNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Build breadcrumb segments from the pathname, e.g. /dashboard/overview → ["dashboard", "overview"]
  const segments = pathname.split("/").filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center border-b border-border bg-background">
      <div className="flex w-full items-center gap-4 px-4">

        {/* ── Left: mobile toggle + desktop toggle + search ── */}
        <div className="flex items-center gap-2">
          {/* Mobile: opens Sheet */}
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            <PanelLeftIcon size={16} aria-hidden="true" />
          </button>

          {/* Desktop: collapses the sidebar */}
          <button
            type="button"
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
            className="hidden size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex"
          >
            <PanelLeftIcon size={16} aria-hidden="true" />
          </button>

          {/* Search button — reserved for future global search */}
          <button
            type="button"
            aria-label="Search"
            className="hidden items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex"
          >
            <SearchIcon size={14} aria-hidden="true" />
            <span>Search…</span>
          </button>
        </div>

        {/* ── Centre: Breadcrumb ── */}
        <div className="flex flex-1 items-center justify-center">
          <Breadcrumb>
            <BreadcrumbList>
              {segments.map((segment, index) => {
                const isLast = index === segments.length - 1;
                const href = "/" + segments.slice(0, index + 1).join("/");
                const label = segmentToLabel(segment);

                return (
                  <span key={href} className="flex items-center gap-1.5">
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink render={<a href={href} />}>
                          {label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </span>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* ── Right: Notifications + Theme + User ── */}
        <div className="flex items-center gap-1">
          {/* Notifications — reserved for future implementation */}
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <BellIcon size={16} aria-hidden="true" />
          </button>

          <ThemeToggle />

          <DashboardUserMenu />
        </div>
      </div>

      {/* ── Mobile: Sheet sidebar ── */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <DashboardSidebarInner isCollapsed={false} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
