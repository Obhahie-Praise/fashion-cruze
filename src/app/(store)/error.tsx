"use client";

import { useEffect } from "react";

interface StoreErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function StoreError({ error, reset }: StoreErrorProps) {
  useEffect(() => {
    console.error("Store error:", error);
  }, [error]);

  return (
    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-semibold tracking-tight">Something went wrong</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          An error occurred in the storefront. Please try reloading or contact support if the issue persists.
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
