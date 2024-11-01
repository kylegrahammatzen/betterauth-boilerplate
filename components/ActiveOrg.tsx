"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrganization } from "./provider/OrganizationProvider";
import { authClient } from "@/lib/authClient";

export function ActiveOrg() {
  const { organizations } = useOrganization();
  const { data: activeOrganization } = authClient.useActiveOrganization();

  if (!activeOrganization) {
    return <h1>no org</h1>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Organization</CardTitle>
        <CardDescription>
          Details of your current active organization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-muted-foreground">Name</dt>
            <dd className="text-sm mt-1">{activeOrganization.name}</dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-muted-foreground">ID</dt>
            <dd className="text-sm font-mono mt-1">{activeOrganization.id}</dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-muted-foreground">
              Created At
            </dt>
            <dd className="text-sm mt-1">
              {new Date(activeOrganization.createdAt).toLocaleString()}
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-muted-foreground">
              Total Organizations
            </dt>
            <dd className="text-sm mt-1">{organizations.length}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
