import Link from "next/link";

type SearchParams = Promise<{ external_id?: string }>;

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { external_id } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-amber-700">Pembayaran Dibatalkan</h1>
      <p className="mt-3 text-sm text-gray-600">
        Pembayaran belum diselesaikan. Anda bisa mencoba lagi kapan saja melalui checkout Premium.
      </p>
      {external_id ? (
        <p className="mt-2 text-xs text-gray-500">External ID: {external_id}</p>
      ) : null}
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/payment/checkout" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white">
          Coba Bayar Lagi
        </Link>
        <Link href="/dashboard" className="rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700">
          Ke Dashboard
        </Link>
      </div>
    </div>
  );
}
