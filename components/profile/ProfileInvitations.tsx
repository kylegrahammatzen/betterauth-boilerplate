"use client";

import { Badge } from "@/components/ui/badge";
import { UserPlus } from "lucide-react";
import { useProfile } from "../provider/ProfileProvider";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type ProfileInvitationsProps = {
  onOpenInvitations: () => void;
};

export const ProfileInvitations = (props: ProfileInvitationsProps) => {
  const { inviteCount } = useProfile();

  return (
    <DropdownMenuItem className="group" onSelect={props.onOpenInvitations}>
      <UserPlus className="mr-2 h-4 w-4 flex-shrink-0" />
      <span>Invitations</span>
      {inviteCount > 0 && (
        <Badge
          variant="secondary"
          className="ml-auto px-1 py-0 text-xs font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          {inviteCount}
        </Badge>
      )}
    </DropdownMenuItem>
  );
};
