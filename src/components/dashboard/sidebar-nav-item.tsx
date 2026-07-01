"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  href: string;
  label: string;
  tooltip: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCollapsed: boolean;
}

/**
 * SidebarNavItem
 *
 * Atomic sidebar navigation link. Renders a Shadcn Tooltip when the sidebar
 * is collapsed (icon-only mode). Always accessible via keyboard.
 */
export function SidebarNavItem({
  href,
  label,
  tooltip,
  icon,
  isActive,
  isCollapsed,
}: SidebarNavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            href={href}
            aria-label={isCollapsed ? label : undefined}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary text-primary-foreground shadow-md shadow-muted-foreground/80"
                : "text-muted-foreground/75 hover:text-foreground/80",
              isCollapsed && "justify-center px-2"
            )}
          />
        }
      >
        <span
          className={cn(
            "shrink-0 transition-colors",
            isActive
              ? "text-primary-foreground"
              : "text-muted-foreground group-hover:text-foreground"
          )}
          aria-hidden="true"
        >
          {icon}
        </span>

        {!isCollapsed && (
          <span className="truncate leading-none">{label}</span>
        )}
      </TooltipTrigger>

      {/* Tooltip description always shown — brief and purposeful */}
      <TooltipContent side="right" sideOffset={8}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
