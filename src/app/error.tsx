"use client";

import { useEffect } from "react";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error("Root error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 text-center px-4 bg-background">
      <div className="max-w-md">
        <h2 className="text-2xl font-semibold tracking-tight text-destructive">Application Error</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A critical error occurred. Please try reloading the application.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="rounded bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/95 transition-colors"
      >
        Reload Application
      </button>
    </div>
  );
}
