"use client";

import { Session } from "@/lib/auth_types";
import { useSession } from "@/lib/authClient";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ToggleSidebar } from "./ToggleSidebar";
import { ContentList } from "./ContentList";
import { useMount } from "@/hooks/use-mount";
import { ProfileDropdown } from "./profile/ProfileDropdown";
import { OrganizationSwitcher } from "./OrganizationSwitcher";

type AppSidebarProps = {
  initialSession: Session;
  children: React.ReactNode;
};

export const AppSidebar = (props: AppSidebarProps) => {
  const isMounted = useMount();

  const { data } = useSession();
  const activeSession = data || props.initialSession;

  if (!isMounted) {
    return null; // Prevent rendering until after mount
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <OrganizationSwitcher />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <ContentList />
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <h1>hi</h1>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <ProfileDropdown session={activeSession} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <ToggleSidebar />
        {props.children}
      </SidebarInset>
    </SidebarProvider>
  );
};
