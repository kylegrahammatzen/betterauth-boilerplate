"use client";

import React from "react";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Plus, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

const OrganizationInvites = () => {
  const { state = "open" } = useSidebar();
  const isMobile = useIsMobile();

  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenuButton asChild>
      {isCollapsed ? (
        isMobile ? (
          <Button size="icon" aria-label="Invites">
            <Users className="h-4 w-4" />
            <span className="sr-only">Invites</span>
          </Button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="px-2 h-8 ml-[-0.06rem]" variant="outline">
                <Users className="h-4 w-4" />
                <span className="sr-only">Invites</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              View Invites
            </TooltipContent>
          </Tooltip>
        )
      ) : (
        <Button variant="outline" className="h-12">
          <Users className="mr-2 h-4 w-4" />
          Invites
        </Button>
      )}
    </SidebarMenuButton>
  );
};

export { OrganizationInvites };
