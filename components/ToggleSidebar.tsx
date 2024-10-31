"use client";

import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "@/lib/utils";

const ToggleSidebar = () => {
  const { state } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger
          className={cn(
            "absolute border border-input bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent rounded-md flex items-center justify-center left-2 top-2 ",
            state === "collapsed" ? "w-8 h-8" : "w-12 h-12"
          )}
        />
      </TooltipTrigger>
      <TooltipContent side="right">Toggle Sidebar</TooltipContent>
    </Tooltip>
  );
};

export { ToggleSidebar };
