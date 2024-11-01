"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const getOrgInviteCount = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    return null;
  }

  // get count of organization invites

  return 0;
};

export { getOrgInviteCount };
