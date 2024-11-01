"use client";

import React from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
            <div className="flex justify-between items-center">
              <span className="font-medium pl-1">Example Content</span>
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
            </div>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
