import Link from "next/link";

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ external_id?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <span className="text-3xl">✗</span>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Pembayaran Dibatalkan
        </h1>
        <p className="mt-2 text-gray-600">
          Pembayaran Anda tidak berhasil atau telah dibatalkan. Silakan coba
          lagi.
        </p>
        {params.external_id ? (
          <p className="mt-2 text-xs text-gray-400">Ref: {params.external_id}</p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/dashboard/invitations"
            className="rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Coba Lagi
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
