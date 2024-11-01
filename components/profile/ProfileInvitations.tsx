import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserPlus } from "lucide-react";
import { Invitation } from "@/lib/auth_types";
import { getOrgInviteCount } from "@/app/actions/getOrgInviteCount";

type ProfileInvitationsProps = {
  onInvitationUpdate: (count: number) => void;
};

const ProfileInvitations = ({
  onInvitationUpdate,
}: ProfileInvitationsProps) => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [inviteCount, setInviteCount] = useState(0);

  useEffect(() => {
    const fetchInviteCount = async () => {
      const count = await getOrgInviteCount();
      if (count !== null) {
        setInviteCount(count);
        onInvitationUpdate(count);
      }
    };

    fetchInviteCount();
    const intervalId = setInterval(fetchInviteCount, 30000);

    return () => clearInterval(intervalId);
  }, [onInvitationUpdate]);

  // TODO: Implement a function to fetch actual invitations
  // const fetchInvitations = async () => {
  //   // Fetch invitations from your API
  //   // setInvitations(fetchedInvitations)
  // }

  return (
    <DropdownMenuItem className="group">
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

export { ProfileInvitations };
