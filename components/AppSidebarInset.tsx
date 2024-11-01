import { cn } from "@/lib/utils";
import { ToggleSidebar } from "./ToggleSidebar";
import { SidebarInset, useSidebar } from "./ui/sidebar";

type AppSidebarInsetProps = {
  children: React.ReactNode;
};

const AppSidebarInset = (props: AppSidebarInsetProps) => {
  const { state } = useSidebar();
  return (
    <SidebarInset>
      <ToggleSidebar />
      <div
        className={cn("p-2", state == "collapsed" ? "pt-14" : "pt-[4.5rem]")}
      >
        {props.children}
      </div>
    </SidebarInset>
  );
};

export { AppSidebarInset };
