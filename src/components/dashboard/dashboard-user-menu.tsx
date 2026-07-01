"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "@/lib/auth-client";

/**
 * DashboardUserMenu
 *
 * Avatar button that opens a Shadcn DropdownMenu with Profile, Settings,
 * and Sign Out actions. Reads the current session from Better Auth.
 */
export function DashboardUserMenu() {
  const { data: session } = useSession();
  const router = useRouter();

  const name = session?.user?.name ?? "Admin";
  const email = session?.user?.email ?? "";

  // Generate initials from the user's name (max 2 characters)
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  async function handleSignOut() {
    await signOut();
    router.push("/signin");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            aria-label={`Account menu for ${name}`}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        }
      >
        {initials || <UserIcon size={14} />}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="bottom" sideOffset={8}>
        {/* User identity label */}
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name}</span>
          {email && (
            <span className="text-xs text-muted-foreground">{email}</span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/dashboard/profile" />}>
            <UserIcon size={14} aria-hidden="true" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem render={<Link href="/dashboard/settings" />}>
            <SettingsIcon size={14} aria-hidden="true" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onSelect={handleSignOut}
          className="cursor-pointer"
        >
          <LogOutIcon size={14} aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
