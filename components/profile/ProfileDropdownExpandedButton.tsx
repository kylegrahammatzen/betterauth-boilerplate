import { SidebarMenuButton } from "../ui/sidebar";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBadge } from "./ProfileBadge";
import { ChevronsUpDown } from "lucide-react";

type ProfileDropdownExpandedButtonProps = {
  name: string;
  image?: string;
  inviteCount: number;
  showBadge: boolean;
};

const ProfileDropdownExpandedButton = (
  props: ProfileDropdownExpandedButtonProps
) => {
  return (
    <SidebarMenuButton
      size="lg"
      className="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="relative">
        <ProfileAvatar name={props.name} image={props.image} />
        {props.inviteCount > 0 && (
          <ProfileBadge count={props.inviteCount} show={props.showBadge} />
        )}
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{props.name}</span>
      </div>
      <ChevronsUpDown className="ml-auto size-4" />
    </SidebarMenuButton>
  );
};

export { ProfileDropdownExpandedButton };
