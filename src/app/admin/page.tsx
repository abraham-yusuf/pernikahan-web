import type { Metadata } from "next";
import { AdminOverview } from "@/components/admin/AdminOverview";

export const metadata: Metadata = {
  title: "Admin Dashboard - NikahDigital",
};

export default function AdminPage() {
  return <AdminOverview />;
}
