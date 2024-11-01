import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileToggleTheme } from "./ProfileToggleTheme";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, UserPlus } from "lucide-react";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";

type ProfileDropdownContentProps = {
  name: string;
  image?: string;
  email: string;
  inviteCount: number;
};

export const ProfileDropdownContent = (props: ProfileDropdownContentProps) => {
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal flex items-center gap-2 px-1 py-1.5 text-left text-sm">
        <ProfileAvatar name={props.name} image={props.image} />
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{props.name}</span>
          <span className="truncate text-xs text-gray-600 dark:text-gray-400">
            {props.email}
          </span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <ProfileToggleTheme />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="group">
          <UserPlus className="mr-2 h-4 w-4 flex-shrink-0" />
          <span>Invitations</span>
          {props.inviteCount > 0 && (
            <Badge
              variant="secondary"
              className="ml-auto px-1 py-0 text-xs font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              {props.inviteCount}
            </Badge>
          )}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem onClick={handleSignout}>
          <LogOut className="mr-3 h-4 w-4 flex-shrink-0" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </>
  );
};
