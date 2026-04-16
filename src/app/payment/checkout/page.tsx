import type { Metadata } from "next";
import { PaymentCheckoutHandoff } from "./payment-checkout-handoff";

export const metadata: Metadata = {
  title: "Checkout Premium | Nikah Digital",
  description:
    "Menyiapkan checkout premium undangan digital Anda sebelum diarahkan ke halaman pembayaran.",
  robots: {
    index: false,
    follow: false,
  },
};

type CheckoutSearchParams = Promise<{
  invitation_id?: string;
}>;

export default async function PaymentCheckoutPage({
  searchParams,
}: {
  searchParams: CheckoutSearchParams;
}) {
  const { invitation_id } = await searchParams;

  return <PaymentCheckoutHandoff invitationId={invitation_id} />;
}
