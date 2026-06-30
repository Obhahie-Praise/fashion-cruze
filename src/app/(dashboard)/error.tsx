"use client";

import { useEffect } from "react";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-semibold tracking-tight text-destructive">Dashboard Error</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          An error occurred inside the administration panel. Please retry the operation.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="rounded bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
