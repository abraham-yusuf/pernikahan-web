import type { Metadata } from "next";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";

export const metadata: Metadata = {
  title: "Admin Analitik - NikahDigital",
  description: "Pantau pendapatan, pembayaran berhasil, dan pertumbuhan pengguna NikahDigital.",
};

export default function AdminAnalyticsPage() {
  return <AdminAnalytics />;
}
