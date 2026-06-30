import React from "react";

interface StoreLayoutProps {
  children: React.ReactNode;
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background py-4 px-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span className="font-commissioner font-semibold text-lg tracking-tight">Cruze Commerce</span>
          <nav className="flex gap-4 text-sm font-medium text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer">Shop</span>
            <span className="hover:text-foreground cursor-pointer">Cart</span>
            <span className="hover:text-foreground cursor-pointer">Profile</span>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">{children}</main>
      <footer className="border-t border-border bg-background py-6 px-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Cruze Commerce. All rights reserved.
      </footer>
    </div>
  );
}
