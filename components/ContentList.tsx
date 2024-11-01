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
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ContentList = () => {
  const { state = "open" } = useSidebar();
  const isMobile = useIsMobile();

  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            {isCollapsed ? (
              isMobile ? (
                <Button variant="outline">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add Content</span>
                </Button>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="px-2 h-8" variant="outline">
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add Content</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center">
                    Add X
                  </TooltipContent>
                </Tooltip>
              )
            ) : (
              <span className="font-medium">Content</span>
            )}
          </SidebarMenuButton>
          <SidebarMenuSub>
            <h1>content</h1>
          </SidebarMenuSub>
          <SidebarGroupAction className="-mt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Plus />
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                Add X
              </TooltipContent>
            </Tooltip>
          </SidebarGroupAction>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export { ContentList };
