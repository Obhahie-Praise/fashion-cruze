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
 * The outer container is `h-screen overflow-hidden` so the viewport is
 * fixed. Only the `<main>` content area scrolls — the sidebar and top
 * navigation remain fixed to the viewport at all times.
 *
 * Desktop:  Persistent sidebar (full or icon-only when collapsed)
 * Tablet:   Same as desktop but collapses to icon-only
 * Mobile:   Sidebar hidden; opens as Sheet via DashboardTopNav toggle
 */
export function DashboardShell({ children }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Desktop / Tablet Sidebar ── */}
      <aside
        aria-label="Sidebar navigation"
        className={cn(
          "hidden md:flex md:flex-col md:shrink-0 h-full",
          "bg-background",
          "transition-[width] duration-200 ease-in-out",
          isCollapsed ? "w-14" : "w-56"
        )}
      >
        <DashboardSidebarInner isCollapsed={isCollapsed} />
      </aside>

      {/* ── Main content area ── */}
      {/* min-h-0 is required: without it, a flex child won't shrink below
          its intrinsic height, so the inner overflow-y-auto on <main>
          would never trigger. */}
      <div className="flex min-w-0 min-h-0 flex-1 flex-col">
        <DashboardTopNav
          onToggleSidebar={() => setIsCollapsed((prev) => !prev)}
        />

        <main
          id="main-content"
          className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 border-l border-t border-border rounded-tl-4xl bg-muted/10"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
