"use client";

import React, { createContext, useContext, useState } from "react";
import { authClient } from "@/lib/authClient";
import type { Organization } from "@/lib/auth_types";

type OrganizationContextType = {
  organizations: Organization[];
  setActiveOrganization: (organizationId: string) => void;
  addOrganization: (organization: Organization) => void;
  isLoading: boolean;
};

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error(
      "useOrganization must be used within an OrganizationProvider"
    );
  }
  return context;
};

type OrganizationProviderProps = {
  children: React.ReactNode;
};

export const OrganizationProvider = ({
  children,
}: OrganizationProviderProps) => {
  const { data, error, isPending } = authClient.useListOrganizations();

  const setActiveOrganization = async (organizationId: string) => {
    try {
      await authClient.organization.setActive(organizationId);
    } catch (error) {
      console.error("Failed to set active organization:", error);
    }
  };

  const addOrganization = async (newOrganization: Organization) => {
    // This is a placeholder. In a real application, you'd typically call an API to create the organization
    console.log("Adding new organization:", newOrganization);
    // After successfully adding the organization, you might want to refetch the list of organizations

    await authClient.organization.create({
      name: newOrganization.name,
      slug: newOrganization.slug,
    });
  };

  const value = {
    organizations: data || [],
    setActiveOrganization,
    addOrganization,
    isLoading: isPending,
  };

  if (error) {
    console.error("Error fetching organizations:", error);
  }

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
};
