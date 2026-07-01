import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * Next.js Proxy (formerly middleware)
 *
 * Handles authentication guards for protected, admin-only, and auth routes.
 * Kept lightweight — only session validation via Better Auth cookies.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Retrieve session from Better Auth
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.role === "admin";

  // 2. Classify routes
  const isAuthRoute =
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password");

  const isDashboardRoute = pathname.startsWith("/dashboard");

  const isProtectedCustomerRoute =
    pathname.startsWith("/cart") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/orders") ||
    pathname.startsWith("/wishlist");

  // 3. Redirect logic

  // Authenticated user on auth pages → redirect appropriately
  if (isAuthenticated && isAuthRoute) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/dashboard/overview", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Unauthenticated user on protected routes → redirect to sign-in
  if (!isAuthenticated && (isDashboardRoute || isProtectedCustomerRoute)) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Authenticated non-admin on dashboard → redirect to home
  if (isAuthenticated && isDashboardRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
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
