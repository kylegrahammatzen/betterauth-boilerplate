"use client";

import { Session } from "@/lib/auth_types";
import { useSession } from "@/lib/authClient";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProfileDropdown } from "./ProfileDropdown";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { ChevronsLeft } from "lucide-react";
import { OrganizationProvider } from "./OrganizationProvider";

type AppSidebarProps = {
  initialSession: Session;
  children: React.ReactNode;
};

export const AppSidebar = (props: AppSidebarProps) => {
  const { data } = useSession();
  const activeSession = data || props.initialSession;

  return (
    <OrganizationProvider>
      <SidebarProvider>
        <TooltipProvider>
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <OrganizationSwitcher />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <ProfileDropdown session={activeSession} />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="h-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger className="absolute left-4 top-4 w-10 h-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent rounded-md flex items-center justify-center">
                  <ChevronsLeft className="h-4 w-4" />
                </SidebarTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Toggle Sidebar</TooltipContent>
            </Tooltip>
            {props.children}
          </SidebarInset>
        </TooltipProvider>
      </SidebarProvider>
    </OrganizationProvider>
  );
};
