"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";

/**
 * Returns `true` only on the client, `false` during SSR.
 * Uses useSyncExternalStore to avoid the setState-in-effect lint rule.
 */
function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/**
 * ThemeToggle
 *
 * Cycles through system → light → dark on each click.
 * Renders a stable placeholder during SSR to prevent hydration mismatches.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) {
    return <div className="size-8 rounded-md" aria-hidden="true" />;
  }

  function cycle() {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  }

  const label =
    theme === "light"
      ? "Switch to dark mode"
      : theme === "dark"
        ? "Switch to system mode"
        : "Switch to light mode";

  const Icon =
    theme === "light" ? SunIcon : theme === "dark" ? MoonIcon : SunMoonIcon;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon size={16} aria-hidden="true" />
    </button>
  );
}
