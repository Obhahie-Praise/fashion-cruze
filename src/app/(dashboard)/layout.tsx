import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar navigation shell */}
      <aside className="w-64 border-r border-border bg-background flex flex-col">
        <div className="p-6 border-b border-border">
          <span className="font-commissioner font-semibold tracking-tight text-foreground">Cruze Console</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 text-sm font-medium text-muted-foreground">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Management</div>
          <span className="block px-3 py-2 rounded hover:text-foreground cursor-pointer hover:bg-muted/40">Overview</span>
          <span className="block px-3 py-2 rounded hover:text-foreground cursor-pointer hover:bg-muted/40">Orders</span>
          <span className="block px-3 py-2 rounded hover:text-foreground cursor-pointer hover:bg-muted/40">Products</span>
          <span className="block px-3 py-2 rounded hover:text-foreground cursor-pointer hover:bg-muted/40">Categories</span>
          <span className="block px-3 py-2 rounded hover:text-foreground cursor-pointer hover:bg-muted/40">Promotions</span>
          <span className="block px-3 py-2 rounded hover:text-foreground cursor-pointer hover:bg-muted/40">Customers</span>
          
          <div className="pt-4 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">System</div>
          <span className="block px-3 py-2 rounded hover:text-foreground cursor-pointer hover:bg-muted/40">Analytics</span>
          <span className="block px-3 py-2 rounded hover:text-foreground cursor-pointer hover:bg-muted/40">Support</span>
          <span className="block px-3 py-2 rounded hover:text-foreground cursor-pointer hover:bg-muted/40">Settings</span>
        </nav>
      </aside>
      
      {/* Main content body */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-background flex items-center justify-between px-8">
          <span className="text-sm text-muted-foreground">Console / Admin</span>
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">AD</div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
