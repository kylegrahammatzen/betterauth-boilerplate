"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProfileAvatar } from "./ProfileAvatar";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import { ChevronsUpDown, LogOut, User, UserPlus } from "lucide-react";
import { Session } from "@/lib/auth_types";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { ProfileToggleTheme } from "./ProfileToggleTheme";
import { Badge } from "@/components/ui/badge";
import { ProfileBadge } from "./ProfileBadge";
import { useEffect, useState } from "react";

type ProfileDropdownProps = {
  session: Session;
};

const ProfileDropdown = (props: ProfileDropdownProps) => {
  const router = useRouter();
  const { state } = useSidebar();
  const name = props.session.user.name;
  const image = props.session.user.image;

  const inviteCount = 5;
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    setShowBadge(false);
    const timer = setTimeout(() => {
      setShowBadge(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [state]);

  const handleSignout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const CollapsedButton = (
    <div className="relative">
      <SidebarMenuButton
        size="lg"
        className="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <ProfileAvatar name={name} image={image} />
      </SidebarMenuButton>
      {inviteCount > 0 && <ProfileBadge count={inviteCount} show={showBadge} />}
    </div>
  );

  const ExpandedButton = (
    <SidebarMenuButton
      size="lg"
      className="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="relative">
        <ProfileAvatar name={name} image={image} />
        {inviteCount > 0 && (
          <ProfileBadge count={inviteCount} show={showBadge} />
        )}
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{name}</span>
      </div>
      <ChevronsUpDown className="ml-auto size-4" />
    </SidebarMenuButton>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {state === "collapsed" ? CollapsedButton : ExpandedButton}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
          state === "collapsed" && "ml-4"
        )}
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <ProfileAvatar name={name} image={image} />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{name}</span>
            <span className="truncate text-xs text-gray-600 dark:text-gray-400">
              {props.session.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ProfileToggleTheme />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="group">
            <UserPlus className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>Invites</span>
            {inviteCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-auto px-1 py-0 text-xs font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                {inviteCount}
              </Badge>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignout}>
            <LogOut className="mr-3 h-4 w-4 flex-shrink-0" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ProfileDropdown };
