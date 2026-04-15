import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/admin";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/dashboard");
  }

  return (
    <AdminShell
      user={{
        name: admin.full_name,
        email: admin.email,
      }}
    >
      {children}
    </AdminShell>
  );
}
