"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { cn } from "@/lib/utils";
import { ProfileDropdownContent } from "./ProfileDropdownContent";
import { ProfileDropdownCollapsedButton } from "./ProfileDropdownCollapsedButton";
import { ProfileDropdownExpandedButton } from "./ProfileDropdownExpandedButton";
import { useProfile } from "../provider/ProfileProvider";
import { InvitationsDialog } from "./InvitationsDialog";

export const ProfileDropdown = () => {
  const router = useRouter();
  const { state } = useSidebar();
  const { session, inviteCount } = useProfile();
  const [showBadge, setShowBadge] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInvitationsDialogOpen, setIsInvitationsDialogOpen] = useState(false);

  const handleSignout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const handleOpenInvitations = () => {
    setIsInvitationsDialogOpen(true);
    setIsDropdownOpen(false);
  };

  if (!session) {
    return null;
  }

  const { name, image, email } = session.user;

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
            onOpenInvitations={handleOpenInvitations}
          />
        </DropdownMenuContent>
      </DropdownMenu>
      <InvitationsDialog
        open={isInvitationsDialogOpen}
        onOpenChange={setIsInvitationsDialogOpen}
      />
    </>
  );
};
