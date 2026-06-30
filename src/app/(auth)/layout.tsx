import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 border border-border bg-background p-8 rounded-lg shadow-sm">
        <div className="flex flex-col items-center">
          <span className="font-commissioner font-semibold text-xl tracking-tight">Cruze Commerce</span>
          <p className="mt-2 text-xs text-muted-foreground">Minimalist, Premium, Quiet Commerce</p>
        </div>
        {children}
      </div>
    </div>
  );
}
