import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/**
 * Retrieves the current session securely from Better Auth.
 */
export async function getCurrentSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Retrieves the current authenticated user.
 */
export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

/**
 * Requires an authenticated user. Redirects to sign-in if not authenticated.
 */
export async function requireAuth(redirectTo?: string) {
  const user = await getCurrentUser();
  if (!user) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const url = new URL("/signin", appUrl);
    if (redirectTo) {
      url.searchParams.set("redirectTo", redirectTo);
    }
    redirect(url.pathname + url.search);
  }
  return user;
}

/**
 * Requires an administrator role. Redirects to home if unauthorized.
 */
export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "admin") {
    redirect("/");
  }
  return user;
}

/**
 * Checks if the current user has a specific role.
 */
export async function checkRole(role: string) {
  const user = await getCurrentUser();
  return user?.role === role;
}
