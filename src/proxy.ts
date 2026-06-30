import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Get session using Better Auth API
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Define path classifications
  const isAuthRoute = pathname.startsWith("/signin") || 
                      pathname.startsWith("/signup") || 
                      pathname.startsWith("/forgot-password");

  const isDashboardRoute = pathname.startsWith("/dashboard");

  const isProtectedCustomerRoute = pathname.startsWith("/cart") ||
                                    pathname.startsWith("/checkout") ||
                                    pathname.startsWith("/profile") ||
                                    pathname.startsWith("/orders") ||
                                    pathname.startsWith("/wishlist");

  // 3. Redirect logic
  if (session) {
    // If authenticated and trying to access auth pages (signin/signup/etc.)
    if (isAuthRoute) {
      if (session.user.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard/overview", request.url));
      }
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If authenticated and trying to access dashboard but is not an admin
    if (isDashboardRoute && session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // If not authenticated and trying to access protected routes
    if (isDashboardRoute || isProtectedCustomerRoute) {
      const signInUrl = new URL("/signin", request.url);
      signInUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cart",
    "/checkout",
    "/profile",
    "/orders",
    "/wishlist",
    "/signin",
    "/signup",
    "/forgot-password",
  ],
};
