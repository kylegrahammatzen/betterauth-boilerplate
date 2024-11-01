import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

type ProfileBadgeProps = {
  count: number;
  show: boolean;
};

const ProfileBadge = (props: ProfileBadgeProps) => {
  return (
    <Badge
      variant="default"
      className={cn(
        "absolute -bottom-1 -right-1 h-4 w-4 rounded-md p-0 text-[10px] font-medium flex items-center justify-center bg-primary text-primary-foreground transition-all duration-300",
        props.show ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )}
    >
      {props.count}
    </Badge>
  );
};

export { ProfileBadge };
