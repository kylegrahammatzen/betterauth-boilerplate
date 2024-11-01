"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "../provider/ProfileProvider";
import { Invitation } from "@/lib/auth_types";

type InvitationsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const InvitationsDialog = (props: InvitationsDialogProps) => {
  const {
    invitations,
    refreshInvitations,
    acceptInvitation,
    declineInvitation,
  } = useProfile();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.open) {
      setIsLoading(true);
      refreshInvitations(1, 10).finally(() => setIsLoading(false));
    }
  }, [props.open, refreshInvitations]);

  const handleAccept = async (id: string) => {
    setIsLoading(true);
    await acceptInvitation(id);
    setIsLoading(false);
  };

  const handleDecline = async (id: string) => {
    setIsLoading(true);
    await declineInvitation(id);
    setIsLoading(false);
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Organization Invitations</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Loading invitations...</p>
            </div>
          ) : invitations.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p>No invitations available.</p>
            </div>
          ) : (
            invitations.map((invite: Invitation) => (
              <div
                key={invite.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${invite.organizationId}`}
                    />
                    <AvatarFallback>
                      {invite.organizationId.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      Organization ID: {invite.organizationId}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Role: {invite.role}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Email: {invite.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires: {invite.expiresAt.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDecline(invite.id)}
                    disabled={isLoading}
                  >
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAccept(invite.id)}
                    disabled={isLoading}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
