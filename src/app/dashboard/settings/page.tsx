import Link from "next/link";
import { getLoggedInUser } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardSettingsPage() {
  const user = await getLoggedInUser();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="mt-1 text-sm text-gray-500">
          Lihat informasi profil dan status akun Anda.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Profil</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4 border-b border-gray-50 py-2">
            <dt className="text-gray-500">Display name</dt>
            <dd className="font-medium text-gray-900">{user?.name || "-"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2">
            <dt className="text-gray-500">Email</dt>
            <dd className="text-gray-900">{user?.email || "-"}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Akun</h2>
            <p className="mt-1 text-sm text-gray-500">
              Paket premium dan pembayaran Stripe akan tersedia pada fase berikutnya.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
              Gratis
            </span>
            <Link
              href="/#harga"
              aria-disabled="true"
              tabIndex={-1}
              className="pointer-events-none inline-flex items-center justify-center rounded-full bg-gray-100 px-5 py-3 text-sm font-medium text-gray-400"
            >
              Upgrade ke Premium
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-red-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Danger zone</h2>
        <p className="mt-1 text-sm text-gray-500">
          Keluar dari akun Anda di perangkat ini.
        </p>
        <div className="mt-4">
          <LogoutButton />
        </div>
      </section>
    </div>
  );
}
