import type { Metadata } from "next";
import { getLoggedInUser } from "@/lib/auth";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardRecentInvitations } from "@/components/dashboard/DashboardRecentInvitations";

export const metadata: Metadata = {
  title: "Dashboard - NikahDigital",
  description: "Kelola undangan pernikahan digital Anda.",
};

export default async function DashboardPage() {
  const user = await getLoggedInUser();
  const fullName =
    user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "Pengguna";
  const firstName = fullName.split(" ")[0] ?? "Pengguna";

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Selamat datang, {firstName}! 👋
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Pantau undangan, RSVP tamu, dan lanjutkan persiapan hari spesial Anda.
        </p>
      </div>

      <DashboardStats />
      <DashboardRecentInvitations />

      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Informasi Akun</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4 border-b border-gray-50 py-2">
            <dt className="text-gray-500">Nama</dt>
            <dd className="font-medium text-gray-900">{fullName || "-"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 border-b border-gray-50 py-2">
            <dt className="text-gray-500">Email</dt>
            <dd className="text-gray-900">{user?.email || "-"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2">
            <dt className="text-gray-500">Paket</dt>
            <dd>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                Gratis
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
