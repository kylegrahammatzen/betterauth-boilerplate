"use server";

import { db } from "@/lib/db/db";
import { invitation } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

type GetOrgInvitesProps = {
  userId: string;
};

const getOrgInvites = async (props: GetOrgInvitesProps): Promise<number> => {
  if (!props.userId) {
    throw new Error("User ID is required");
  }

  try {
    const result = await db
      .select({ count: invitation.id })
      .from(invitation)
      .where(
        and(
          eq(invitation.inviterId, props.userId),
          eq(invitation.status, "pending")
        )
      )
      .execute();

    return result.length;
  } catch (error) {
    console.error("Error fetching organization invites:", error);
    throw new Error("Failed to fetch organization invites");
  }
};

export { getOrgInvites };
export type { GetOrgInvitesProps };
