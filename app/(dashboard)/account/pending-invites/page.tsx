import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LOGIN_URL } from "@/middleware";
import { getOrgInvites, GetOrgInvitesProps } from "@/app/actions/getOrgInvites";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect(LOGIN_URL);
  }

  let inviteCount: number;

  try {
    const props: GetOrgInvitesProps = { userId: session.user.id };
    inviteCount = await getOrgInvites(props);
  } catch (error) {
    console.error("Failed to fetch organization invites:", error);
    inviteCount = 0;
  }

  return (
    <div className="p-4">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Pending Invitations</h2>
        <p className="text-lg">
          You have <span className="font-semibold">{inviteCount}</span> pending
          invitation(s).
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-2">Session Data:</h2>
      <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-w-full">
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  );
}
