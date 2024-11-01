"use client";

import React from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
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

export function ContentList() {
  const { state = "open" } = useSidebar();
  const isMobile = useIsMobile();

  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          {isCollapsed ? (
            <SidebarMenuButton asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Content</span>
              </Button>
            </SidebarMenuButton>
          ) : (
            <>
              <SidebarGroupContent className="flex items-center justify-between py-1">
                <span className="font-medium">Example Content</span>
                {isMobile ? (
                  <Button size="sm" variant="link">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add Content</span>
                  </Button>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="link">
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Add Content</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">
                      Add Content
                    </TooltipContent>
                  </Tooltip>
                )}
              </SidebarGroupContent>
            </>
          )}
          <SidebarMenuSub>
            <h1>content</h1>
          </SidebarMenuSub>
        </SidebarMenuItem>
        <SidebarMenuItem>
          {isCollapsed ? (
            <>
              <SidebarMenuButton asChild>
                {isMobile ? (
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
                      Add Whiteboard
                    </TooltipContent>
                  </Tooltip>
                )}
              </SidebarMenuButton>
            </>
          ) : (
            <>
              <SidebarMenuButton asChild>
                <span className="font-medium">Content</span>
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
                    Add Whiteboard
                  </TooltipContent>
                </Tooltip>
              </SidebarGroupAction>
            </>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
