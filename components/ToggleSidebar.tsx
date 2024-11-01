"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function ToggleSidebar() {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger
          className={cn(
            "absolute border border-input bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent rounded-md flex items-center justify-center left-2 top-2",
            "transition-all duration-300 ease-in-out",
            isMobile || state === "collapsed" ? "w-8 h-8" : "w-12 h-12"
          )}
        >
          <PanelLeft
            className={cn(
              "transition-all duration-300 ease-in-out",
              isMobile || state === "collapsed" ? "w-4 h-4" : "w-6 h-6"
            )}
          />
        </SidebarTrigger>
      </TooltipTrigger>
      <TooltipContent side="right">Toggle Sidebar</TooltipContent>
    </Tooltip>
  );
}
