"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { ChevronsUpDown, Search, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/getInitials";
import { useOrganization } from "./OrganizationProvider";
import { authClient } from "@/lib/authClient";
import type { Organization } from "@/lib/auth_types";

export const OrganizationSwitcher = () => {
  const { organizations, setActiveOrganization, addOrganization, isLoading } =
    useOrganization();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOrganizations = useMemo(() => {
    const trimmedQuery = searchQuery.trim().toLowerCase();
    return trimmedQuery
      ? organizations.filter((org) =>
          org.name.toLowerCase().includes(trimmedQuery)
        )
      : organizations;
  }, [organizations, searchQuery]);

  const handleOrganizationSelect = useCallback(
    (organizationId: string) => {
      setActiveOrganization(organizationId);
      setIsDropdownOpen(false);
      setSearchQuery("");
    },
    [setActiveOrganization]
  );

  const getScrollAreaHeight = () => {
    if (filteredOrganizations.length > 2) return "h-[9.25rem]";
    if (filteredOrganizations.length === 2) return "h-[6.16rem]";
    if (filteredOrganizations.length === 1) return "h-[3.08rem]";
    return "h-[3.08rem]";
  };

  const handleDropdownOpenChange = (open: boolean) => {
    if (!isLoading) {
      setIsDropdownOpen(open);
      if (open) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      } else {
        setSearchQuery("");
      }
    }
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownOpenChange}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground pl-3"
          disabled={isLoading}
        >
          {/* {!isLoading && (
            <>
              {activeOrganization ? (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    {getInitials(activeOrganization.name)}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {activeOrganization.name}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-muted text-sidebar-muted-foreground">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="text-xs text-muted-foreground">
                      Select an organization
                    </span>
                  </div>
                </>
              )}
              <ChevronsUpDown className="ml-auto" />
            </>
          )} */}
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <div className="p-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        </div>
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Organizations ({filteredOrganizations.length})
        </DropdownMenuLabel>
        <div
          className={`${getScrollAreaHeight()} transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <ScrollArea className="h-full">
            {filteredOrganizations.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-sm text-muted-foreground">
                  No organizations found.
                </div>
              </div>
            ) : (
              filteredOrganizations.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  className="flex items-center gap-2 p-2 cursor-pointer"
                  onSelect={(event) => {
                    if (document.activeElement === searchInputRef.current) {
                      event.preventDefault();
                    } else {
                      handleOrganizationSelect(org.id);
                    }
                  }}
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    {getInitials(org.name)}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="font-semibold truncate">{org.name}</span>
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </ScrollArea>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            setIsDropdownOpen(false);
            setSearchQuery("");
            const newOrg: Organization = {
              id: `new-org-${Date.now()}`,
              name: "New Organization",
              createdAt: new Date(),
              slug: `new-org-${Date.now()}`,
            };
            addOrganization(newOrg);
          }}
        >
          <div className="font-medium">Add organization</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
