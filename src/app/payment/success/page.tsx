import type { Metadata } from "next";
import { PaymentSuccessStatus } from "./payment-success-status";

export const metadata: Metadata = {
  title: "Pembayaran Berhasil | Nikah Digital",
  description:
    "Konfirmasi status pembayaran premium undangan Anda dan lanjutkan ke dashboard atau editor.",
  robots: {
    index: false,
    follow: false,
  },
};

type SearchParams = Promise<{ external_id?: string }>;

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { external_id } = await searchParams;

  return <PaymentSuccessStatus externalId={external_id} />;
}
