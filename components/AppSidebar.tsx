'use client'

import { Session } from "@/lib/auth_types"
import { useSession } from "@/lib/authClient"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ContentList } from "./ContentList"
import { useMount } from "@/hooks/use-mount"
import { ProfileDropdown } from "./profile/ProfileDropdown"
import { AppSidebarInset } from "./AppSidebarInset"
import { OrganizationSwitcher } from "./organization/OrganizationSwitcher"
import { ProfileProvider } from "./provider/ProfileProvider"

type AppSidebarProps = {
  initialSession: Session
  children: React.ReactNode
}

export const AppSidebar = (props: AppSidebarProps) => {
  const isMounted = useMount()

  const { data } = useSession()
  const activeSession = data || props.initialSession

  if (!isMounted) {
    return null
  }

  return (
    <ProfileProvider initialSession={activeSession}>
      <SidebarProvider>
        <Sidebar variant="inset" collapsible="icon">
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
                <ProfileDropdown />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <AppSidebarInset>{props.children}</AppSidebarInset>
      </SidebarProvider>
    </ProfileProvider>
  )
}