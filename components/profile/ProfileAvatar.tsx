import { getInitials } from "@/lib/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ProfileAvatarProps = {
  name: string;
  image?: string;
  badgeCount?: number;
};

const ProfileAvatar = (props: ProfileAvatarProps) => {
  return (
    <Avatar className="h-8 w-8 rounded-md">
      <AvatarImage src={props.image} />
      <AvatarFallback className="rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
        {getInitials(props.name)}
      </AvatarFallback>
    </Avatar>
  );
};

export { ProfileAvatar };
