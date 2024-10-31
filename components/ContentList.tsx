"use client"

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
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const ContentList = () => {
  const { state = "open" } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            {state === "collapsed" ? (
              <Button variant="outline">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Content</span>
              </Button>
            ) : (
              <span className="font-medium">Example Content</span>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      {state !== "collapsed" && (
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarGroupAction>
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add Content</span>
            </SidebarGroupAction>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            Add Content
          </TooltipContent>
        </Tooltip>
      )}
    </SidebarGroup>
  )
}

export { ContentList }