"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ProfileDropdownContent } from "./ProfileDropdownContent";
import { ProfileDropdownCollapsedButton } from "./ProfileDropdownCollapsedButton";
import { ProfileDropdownExpandedButton } from "./ProfileDropdownExpandedButton";
import { useProfile } from "../provider/ProfileProvider";

export const ProfileDropdown = () => {
  const { state } = useSidebar();
  const { session, inviteCount } = useProfile();
  const [showBadge, setShowBadge] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return null;
  }

  const { name, image, email } = session.user;

  useEffect(() => {
    setShowBadge(false);
    const timer = setTimeout(() => {
      setShowBadge(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [state]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          {state === "collapsed" ? (
            <ProfileDropdownCollapsedButton
              name={name}
              image={image}
              inviteCount={inviteCount}
              showBadge={showBadge}
            />
          ) : (
            <ProfileDropdownExpandedButton
              name={name}
              image={image}
              inviteCount={inviteCount}
              showBadge={showBadge}
            />
          )}
        </div>
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
        <ProfileDropdownContent
          name={name}
          image={image}
          email={email}
          inviteCount={inviteCount}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
