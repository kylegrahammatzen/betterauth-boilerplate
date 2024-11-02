"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useProfile } from "../provider/ProfileProvider";
import { Invitation } from "@/lib/auth_types";
import { OrganizationAvatar } from "@/components/organization/OrganizationAvatar";

type InvitationsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const InvitationsDialog = (props: InvitationsDialogProps) => {
  const {
    invitations,
    refreshInvitations,
    acceptInvitation,
    rejectInvitation,
  } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [processingInvitations, setProcessingInvitations] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (props.open) {
      setIsLoading(true);
      refreshInvitations().finally(() => setIsLoading(false));
    }
  }, [props.open, refreshInvitations]);

  const handleAccept = async (id: string) => {
    setProcessingInvitations((prev) => [...prev, id]);
    try {
      await acceptInvitation(id);
    } catch (error) {
      console.error("Error accepting invitation:", error);
    } finally {
      setProcessingInvitations((prev) =>
        prev.filter((inviteId) => inviteId !== id)
      );
    }
  };

  const handleReject = async (id: string) => {
    setProcessingInvitations((prev) => [...prev, id]);
    try {
      await rejectInvitation(id);
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    } finally {
      setProcessingInvitations((prev) =>
        prev.filter((inviteId) => inviteId !== id)
      );
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Organization Invitations</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <ScrollArea className="h-[300px] pr-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                Loading invitations...
              </div>
            ) : invitations.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                No invitations available.
              </div>
            ) : (
              invitations.map((invite: Invitation) => (
                <div
                  key={invite.id}
                  className={`flex items-center justify-between py-4 transition-all duration-300 ${
                    processingInvitations.includes(invite.id)
                      ? "opacity-50"
                      : "opacity-100"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <OrganizationAvatar name={invite.organizationId} />
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
                      onClick={() => handleReject(invite.id)}
                      disabled={
                        isLoading || processingInvitations.includes(invite.id)
                      }
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAccept(invite.id)}
                      disabled={
                        isLoading || processingInvitations.includes(invite.id)
                      }
                    >
                      Accept
                    </Button>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
