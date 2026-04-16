import { redirect } from "next/navigation";
import { PricingCards } from "@/components/payment/PricingCards";
import { getLoggedInUser } from "@/lib/auth";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ invitationId?: string }>;
}) {
  const user = await getLoggedInUser();
  if (!user) redirect("/auth/login");

  const params = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-gray-900">Pilih Paket</h1>
        <p className="mt-2 text-gray-600">
          Upgrade ke premium untuk akses semua fitur dan template.
        </p>
        <div className="mt-10">
          <PricingCards invitationId={params.invitationId} />
        </div>
        <p className="mt-8 text-xs text-gray-400">
          Pembayaran diproses secara aman oleh Xendit. Mendukung Bank Transfer
          (BCA, BNI, BRI, Mandiri), E-Wallet (OVO, DANA, GoPay, ShopeePay), dan
          QRIS.
        </p>
      </div>
    </div>
  );
}
