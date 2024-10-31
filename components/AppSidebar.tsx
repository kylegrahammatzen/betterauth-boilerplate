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
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProfileDropdown } from "./ProfileDropdown";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { ToggleSidebar } from "./ToggleSidebar";
import { OrganizationProvider } from "./OrganizationProvider";

type AppSidebarProps = {
  initialSession: Session;
  children: React.ReactNode;
};

export const AppSidebar = (props: AppSidebarProps) => {
  const { data } = useSession();
  const activeSession = data || props.initialSession;

  return (
    <SidebarProvider>
      <TooltipProvider>
        <OrganizationProvider>
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
          <SidebarInset className="h-full p-2">
            <ToggleSidebar />
            {props.children}
          </SidebarInset>
        </OrganizationProvider>
      </TooltipProvider>
    </SidebarProvider>
  );
};
