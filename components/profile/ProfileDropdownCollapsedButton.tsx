import { SidebarMenuButton } from "../ui/sidebar";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileBadge } from "./ProfileBadge";

type ProfileDropdownCollapsedButtonProps = {
  name: string;
  image?: string;
  inviteCount: number;
  showBadge: boolean;
};

const ProfileDropdownCollapsedButton = (
  props: ProfileDropdownCollapsedButtonProps
) => {
  return (
    <div className="relative">
      <SidebarMenuButton
        size="lg"
        className="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <ProfileAvatar name={props.name} image={props.image} />
      </SidebarMenuButton>
      {props.inviteCount > 0 && (
        <ProfileBadge count={props.inviteCount} show={props.showBadge} />
      )}
    </div>
  );
};

export { ProfileDropdownCollapsedButton };
