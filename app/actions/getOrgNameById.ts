"use server";

import { db } from "@/lib/db/db";
import { organization } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type OrgNameByIdProps = {
  orgId: string;
};

const getOrgNameById = async (
  props: OrgNameByIdProps
): Promise<string | null> => {
  if (!props.orgId) {
    throw new Error("Organization ID is required");
  }

  try {
    const result = await db
      .select({ name: organization.name })
      .from(organization)
      .where(eq(organization.id, props.orgId))
      .limit(1)
      .execute();

    if (result.length === 0) {
      return null;
    }

    return result[0].name;
  } catch (error) {
    console.error("Error fetching organization name:", error);
    throw new Error("Failed to fetch organization name");
  }
};

export { getOrgNameById };
export type { OrgNameByIdProps };
