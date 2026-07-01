import React from "react";
import type { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: {
    template: "%s | Cruze Console",
    default: "Cruze Console",
  },
  description: "Cruze Commerce administrator console",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout (Server Component)
 *
 * Root layout for all /dashboard/* routes.
 * Wraps every page in DashboardShell — the sidebar, top navigation,
 * and main content area are all encapsulated there.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <DashboardShell>{children}</DashboardShell>;
}

