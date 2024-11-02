"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Session, Invitation } from "@/lib/auth_types";
import { getOrgInviteCount } from "@/app/actions/getOrgInvites";
import { useMount } from "@/hooks/use-mount";
import { authClient } from "@/lib/authClient";
import { APIError } from "better-auth/api";
import { toast } from "@/hooks/use-toast";

type ProfileContextType = {
  session: Session | null;
  inviteCount: number;
  invitations: Invitation[];
  updateSession: (newSession: Session) => void;
  refreshInviteCount: () => Promise<void>;
  refreshInvitations: () => Promise<void>;
  acceptInvitation: (invitationId: string) => Promise<void>;
  rejectInvitation: (invitationId: string) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

type ProfileProviderProps = {
  children: React.ReactNode;
  initialSession: Session | null;
};

const ProfileProvider = (props: ProfileProviderProps) => {
  const [session, setSession] = useState<Session | null>(props.initialSession);
  const [inviteCount, setInviteCount] = useState(0);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const isMounted = useMount();

  useEffect(() => {
    const fetchInviteCount = async () => {
      const count = await getOrgInviteCount();
      if (count !== null) {
        setInviteCount(count);
      }
    };

    // Fetch immediately on mount
    fetchInviteCount();

    // Set up interval to fetch every 30 seconds
    const intervalId = setInterval(fetchInviteCount, 30000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const refreshInviteCount = useCallback(async () => {
    const count = await getOrgInviteCount();
    if (count !== null) {
      setInviteCount(count);
    }
  }, []);

  const refreshInvitations = useCallback(async () => {
    try {
      const dummyInvitations: Invitation[] = [
        {
          id: "1",
          expiresAt: new Date(),
          status: "pending",
          email: "john@acme.com",
          organizationId: "org1",
          role: "member",
          inviterId: "inviter1",
        },
        {
          id: "2",
          expiresAt: new Date(),
          status: "pending",
          email: "jane@globex.com",
          organizationId: "org2",
          role: "admin",
          inviterId: "inviter2",
        },
      ];
      setInvitations(dummyInvitations);
      setInviteCount(dummyInvitations.length);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh invitations. Please try again.",
        variant: "destructive",
      });
    }
  }, []);

  const acceptInvitation = useCallback(async (invitationId: string) => {
    try {
      await authClient.organization.acceptInvitation({
        invitationId: invitationId,
      });
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation.id !== invitationId)
      );
      setInviteCount((prevCount) => prevCount - 1);
      toast({
        title: "Invitation Accepted",
        description: "You have successfully joined the organization.",
      });
    } catch (error) {
      throw error;
    }
  }, []);

  const rejectInvitation = useCallback(async (invitationId: string) => {
    try {
      await authClient.organization.rejectInvitation({
        invitationId: invitationId,
      });
      setInvitations((prevInvitations) =>
        prevInvitations.filter((invitation) => invitation.id !== invitationId)
      );
      setInviteCount((prevCount) => prevCount - 1);
      toast({
        title: "Invitation Rejected",
        description: "The invitation has been rejected.",
      });
    } catch (error) {
      throw error;
    }
  }, []);

  const updateSession = (newSession: Session) => {
    setSession(newSession);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ProfileContext.Provider
      value={{
        session,
        inviteCount,
        invitations,
        updateSession,
        refreshInviteCount,
        refreshInvitations,
        acceptInvitation,
        rejectInvitation,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider };
