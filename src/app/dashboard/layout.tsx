import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <DashboardShell
      user={{
        name: user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "User",
        email: user.email ?? "",
      }}
    >
      {children}
    </DashboardShell>
  );
}
