"use client";

import { useState, useRef } from "react";
import { ChevronsUpDown, Search, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { getInitials } from "@/lib/getInitials";
import { useOrganization } from "./provider/OrganizationProvider";
import { authClient } from "@/lib/authClient";
import type { Organization } from "@/lib/auth_types";

export function OrganizationSwitcher() {
  const { organizations, setActiveOrganization, addOrganization, isLoading } =
    useOrganization();
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { state } = useSidebar();

  const filteredOrgs = organizations
    .filter((org) =>
      search.trim()
        ? org.name.toLowerCase().includes(search.toLowerCase().trim())
        : true
    )
    .filter((org) => org.id !== activeOrganization?.id);

  const scrollHeight =
    filteredOrgs.length > 2
      ? "h-[9.25rem]"
      : filteredOrgs.length === 2
      ? "h-[6.16rem]"
      : "h-[3.08rem]";

  const handleSelect = (orgId: string) => {
    setActiveOrganization(orgId);
    setIsOpen(false);
    setSearch("");
  };

  const handleOpenChange = (open: boolean) => {
    if (isLoading) return;
    setIsOpen(open);
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 0);
    } else {
      setSearch("");
    }
  };

  const handleAddOrg = () => {
    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: "New Organization",
      createdAt: new Date(),
      slug: `org-${Date.now()}`,
    };
    addOrganization(newOrg);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="border data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground pl-3"
          disabled={isLoading}
        >
          {isLoading ? (
            "Loading"
          ) : activeOrganization ? (
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
              ref={searchRef}
              placeholder="Search organizations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
        </div>
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Organizations ({filteredOrgs.length})
        </DropdownMenuLabel>
        <div
          className={`${scrollHeight} transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <ScrollArea className="h-full">
            {filteredOrgs.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-sm text-muted-foreground">
                  No organizations found.
                </div>
              </div>
            ) : (
              filteredOrgs.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  className="flex items-center gap-2 p-2 cursor-pointer"
                  onSelect={(e) => {
                    if (document.activeElement === searchRef.current) {
                      e.preventDefault();
                    } else {
                      handleSelect(org.id);
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
          onSelect={(e) => {
            e.preventDefault();
            handleAddOrg();
          }}
        >
          <div className="font-medium">Add organization</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
