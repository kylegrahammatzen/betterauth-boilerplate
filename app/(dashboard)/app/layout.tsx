import { AppSidebar } from "@/components/AppSidebar";
import { OrganizationProvider } from "@/components/provider/OrganizationProvider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/lib/auth";
import { LOGIN_URL } from "@/middleware";
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
    redirect(LOGIN_URL);
  }

  return (
    <TooltipProvider>
      <OrganizationProvider>
        <AppSidebar initialSession={session}>{children}</AppSidebar>
        <Toaster />
      </OrganizationProvider>
    </TooltipProvider>
  );
}
