import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pembayaran Dibatalkan | Nikah Digital",
  description:
    "Checkout premium dibatalkan. Pelajari alasan pembatalan dan coba lagi kapan saja.",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = Promise<{
  external_id?: string;
  invitation_id?: string;
  reason?: string;
}>;

function getCancelReason(reason?: string): string {
  switch (reason) {
    case "expired":
      return "Waktu pembayaran habis sebelum transaksi selesai.";
    case "failed":
      return "Metode pembayaran gagal diproses oleh penyedia pembayaran.";
    case "user_cancelled":
      return "Transaksi dibatalkan oleh pengguna sebelum pembayaran selesai.";
    default:
      return "Pembayaran belum diselesaikan. Anda bisa mencoba lagi kapan saja.";
  }
}

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { external_id, invitation_id, reason } = await searchParams;

  const checkoutUrl = invitation_id
    ? `/payment/checkout?invitation_id=${encodeURIComponent(invitation_id)}`
    : "/dashboard";

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-amber-700">Pembayaran Dibatalkan</h1>
      <p className="mt-3 text-sm text-gray-600">{getCancelReason(reason)}</p>
      {external_id ? (
        <p className="mt-2 text-xs text-gray-500">External ID: {external_id}</p>
      ) : null}

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href={checkoutUrl}
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white"
        >
          Coba Bayar Lagi
        </Link>
        <Link
          href="/dashboard/settings"
          className="rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700"
        >
          Kembali ke Pengaturan
        </Link>
      </div>
    </div>
  );
}
