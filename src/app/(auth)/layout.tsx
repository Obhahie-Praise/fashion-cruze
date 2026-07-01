import React from "react";
import { AuthCarousel } from "@/components/shared/auth-carousel";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-background">
      <Link href="/" className="absolute top-4 flex items-center gap-1 left-4 z-50 text-sm font-medium hover:opacity-80">
        <ChevronLeft className="h-4 w-4" />
        <span className="text-foreground">Back to Cruze</span>
      </Link>
      
      {/* Right Panel (Carousel) - On mobile, it's above the form */}
      <div className="relative w-full md:w-1/2 h-64 md:h-screen order-1 md:order-2 bg-muted">
        <AuthCarousel />
      </div>
      
      {/* Left Panel (Form) */}
      <div className="flex-1 flex flex-col justify-center px-4 py-8 sm:px-6 lg:flex-none lg:px-20 xl:px-32 w-full md:w-1/2 order-2 md:order-1 -mt-24 rounded-t-3xl md:-mt-0 md:rounded-t-none md:rounded-r-3xl shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] md:shadow-none relative z-20 bg-background">
        <div className="mx-auto w-full max-w-md lg:w-[24rem]">
          {children}
        </div>
      </div>
      
      {/* Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
