import type { Metadata } from "next";
import { AdminTemplateTable } from "@/components/admin/AdminTemplateTable";

export const metadata: Metadata = {
  title: "Admin Template - NikahDigital",
  description: "Kelola status, tier, urutan, dan featured template NikahDigital.",
};

export default function AdminTemplatesPage() {
  return <AdminTemplateTable />;
}
