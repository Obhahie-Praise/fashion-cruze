"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronsUpDownIcon,
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
import { cn } from "@/lib/utils";

interface DashboardUserMenuProps {
  isCollapsed?: boolean;
}

/**
 * DashboardUserMenu
 *
 * Profile section anchored to the bottom of the sidebar.
 * Spans the available width when expanded, showing avatar, name, and role.
 * Opens a DropdownMenu with Profile, Settings, and Sign Out actions.
 */
export function DashboardUserMenu({
  isCollapsed = false,
}: DashboardUserMenuProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const name = session?.user?.name ?? "Admin";
  const email = session?.user?.email ?? "";
  const role = session?.user?.role ?? "Administrator";

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
            className={cn(
              "flex items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full",
              isCollapsed && "justify-center",
            )}
          />
        }
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
          {initials || <UserIcon size={14} />}
        </div>
        {!isCollapsed && (
          <>
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="truncate text-sm font-medium text-foreground">
                {name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {email}
              </span>
            </div>
            <ChevronsUpDownIcon
              size={14}
              className="shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
          </>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={isCollapsed ? "start" : "end"}
        side={isCollapsed ? "right" : "bottom"}
        sideOffset={8}
        className={isCollapsed ? "" : "w-52"}
      >
        {/* User identity label */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex justify-between items-center p-1 shadow shadow-muted border-0.5 border-border/50 rounded-sm">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {name}
              </span>
              {email && (
                <span className="text-xs text-muted-foreground">{email}</span>
              )}
            </div>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              {initials || <UserIcon size={14} />}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

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

        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onSelect={handleSignOut}
            className="cursor-pointer"
          >
            <LogOutIcon size={14} aria-hidden="true" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
