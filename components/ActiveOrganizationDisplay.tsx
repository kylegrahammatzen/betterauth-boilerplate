"use client";

import { useOrganization } from "./OrganizationProvider";
import { authClient } from "@/lib/authClient";

export const ActiveOrganizationDisplay = () => {
  const { organizations } = useOrganization();
  const { data: activeOrganization } = authClient.useActiveOrganization();

  if (!activeOrganization) {
    return <div>Loading active organization...</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-2">Active Organization</h2>
      <p>
        <strong>Name:</strong> {activeOrganization.name}
      </p>
      <p>
        <strong>ID:</strong> {activeOrganization.id}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(activeOrganization.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Total Organizations:</strong> {organizations.length}
      </p>
    </div>
  );
};
