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

const OrganizationInvites = () => {
  const { state = "open" } = useSidebar();
  const isMobile = useIsMobile();

  const isCollapsed = state === "collapsed";

  return <h1>test</h1>;
};

export { OrganizationInvites };
