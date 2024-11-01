"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Session, Invitation } from "@/lib/auth_types";
import { getOrgInviteCount } from "@/app/actions/getOrgInviteCount";
import { useMount } from "@/hooks/use-mount";

type ProfileContextType = {
  session: Session | null;
  inviteCount: number;
  invitations: Invitation[];
  updateSession: (newSession: Session) => void;
  refreshInviteCount: () => Promise<void>;
  refreshInvitations: (page: number, perPage: number) => Promise<void>;
  acceptInvitation: (invitationId: string) => Promise<void>;
  declineInvitation: (invitationId: string) => Promise<void>;
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
  const [refreshInterval, setRefreshInterval] = useState(30000);
  const isMounted = useMount();

  const fetchInviteCount = useCallback(async () => {
    const count = await getOrgInviteCount();
    if (count !== null) {
      if (count === inviteCount) {
        setRefreshInterval((prevInterval) =>
          Math.min(prevInterval * 2, 120000)
        );
      } else {
        setRefreshInterval(30000);
      }
      setInviteCount(count);
    }
  }, [inviteCount]);

  const refreshInviteCount = useCallback(async () => {
    await fetchInviteCount();
    setRefreshInterval(30000);
  }, [fetchInviteCount]);

  const refreshInvitations = useCallback(
    async (page: number, perPage: number) => {
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
    },
    []
  );

  const acceptInvitation = useCallback(async (invitationId: string) => {
    setInvitations((prevInvitations) =>
      prevInvitations.filter((invitation) => invitation.id !== invitationId)
    );
    setInviteCount((prevCount) => prevCount - 1);
    console.log(`Accepting invitation ${invitationId}`);
  }, []);

  const declineInvitation = useCallback(async (invitationId: string) => {
    setInvitations((prevInvitations) =>
      prevInvitations.filter((invitation) => invitation.id !== invitationId)
    );
    setInviteCount((prevCount) => prevCount - 1);
    console.log(`Declining invitation ${invitationId}`);
  }, []);

  useEffect(() => {
    if (isMounted) {
      fetchInviteCount();
      const intervalId = setInterval(fetchInviteCount, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [isMounted, fetchInviteCount, refreshInterval]);

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
        declineInvitation,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider };
