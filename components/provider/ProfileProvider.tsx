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
    async (page: number, perPage: number) => {},
    []
  );

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
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider };
