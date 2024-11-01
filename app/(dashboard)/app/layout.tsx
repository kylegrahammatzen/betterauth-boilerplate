import { AppSidebar } from "@/components/AppSidebar";
import { OrganizationProvider } from "@/components/OrganizationProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <TooltipProvider>
      <OrganizationProvider>
        <AppSidebar initialSession={session}>{children}</AppSidebar>
      </OrganizationProvider>
    </TooltipProvider>
  );
}
