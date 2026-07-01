import React from "react";
import { AuthCarousel } from "@/components/shared/auth-carousel";
import { ThemeToggle } from "@/components/shared/theme-toggle";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-background">
      {/* Left Panel (Form) */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32 w-full md:w-1/2 order-2 md:order-1">
        <div className="mx-auto w-full max-w-md lg:w-[24rem]">
          {children}
        </div>
      </div>
      
      {/* Right Panel (Carousel) */}
      <div className="relative w-full md:w-1/2 md:flex-1 h-48 md:h-screen order-1 md:order-2 bg-muted">
        <AuthCarousel />
      </div>

      {/* Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
