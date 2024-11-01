import { getInitials } from "@/lib/getInitials";

type OrganizationAvatarProps = {
  name: string;
};

const OrganizationAvatar = (props: OrganizationAvatarProps) => {
  return (
    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
      {getInitials(props.name)}
    </div>
  );
};

export { OrganizationAvatar };
