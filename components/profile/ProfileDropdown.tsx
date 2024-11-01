"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ProfileAvatar } from "./ProfileAvatar";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sun,
  Moon,
  Laptop,
  User,
} from "lucide-react";
import { Session } from "@/lib/auth_types";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { useTheme } from "../provider/ThemeProvider";
import { ProfileToggleTheme } from "./ProfileToggleTheme";

type ProfileDropdownProps = {
  session: Session;
};

const ProfileDropdown = (props: ProfileDropdownProps) => {
  const router = useRouter();
  const { state } = useSidebar();
  const { theme, setTheme } = useTheme();
  const name = props.session.user.name;
  const image = props.session.user.image;

  const handleSignout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <ProfileAvatar name={name} image={image} />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{name}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg",
          state === "collapsed" && "ml-2"
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
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ProfileDropdown };
