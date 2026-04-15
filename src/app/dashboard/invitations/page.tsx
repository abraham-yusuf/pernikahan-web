import Link from "next/link";
import { InvitationList } from "@/components/dashboard/InvitationList";

export default function DashboardInvitationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Undangan Saya</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola draft, link publik, dan akses RSVP untuk semua undangan Anda.
          </p>
        </div>
        <Link
          href="/dashboard/invitations/new"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Buat Undangan Baru
        </Link>
      </div>

      <InvitationList />
    </div>
  );
}
