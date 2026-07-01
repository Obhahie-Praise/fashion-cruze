"use client";

import { useState } from "react";
import { DashboardSidebarInner } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopNav } from "@/components/dashboard/dashboard-topnav";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
}

/**
 * DashboardShell
 *
 * Client component that manages sidebar collapse state and composes the
 * full dashboard layout: sidebar + top nav + page content.
 *
 * Desktop:  Persistent sidebar (full or icon-only when collapsed)
 * Tablet:   Same as desktop but collapses to icon-only
 * Mobile:   Sidebar hidden; opens as Sheet via DashboardTopNav toggle
 */
export function DashboardShell({ children }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* ── Desktop / Tablet Sidebar ── */}
      <aside
        aria-label="Sidebar navigation"
        className={cn(
          "hidden md:flex md:flex-col md:shrink-0",
          "border-r border-border bg-background",
          "transition-[width] duration-200 ease-in-out",
          isCollapsed ? "w-16" : "w-56"
        )}
      >
        <DashboardSidebarInner isCollapsed={isCollapsed} />
      </aside>

      {/* ── Main content area ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopNav
          onToggleSidebar={() => setIsCollapsed((prev) => !prev)}
        />

        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-6 md:p-8"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
