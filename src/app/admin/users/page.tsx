import type { Metadata } from "next";
import { AdminUserTable } from "@/components/admin/AdminUserTable";

export const metadata: Metadata = {
  title: "Admin Pengguna - NikahDigital",
  description: "Kelola pengguna, role, dan tier akses platform NikahDigital.",
};

export default function AdminUsersPage() {
  return <AdminUserTable />;
}
