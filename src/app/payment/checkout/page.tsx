import Link from "next/link";
import { getLoggedInUser } from "@/lib/auth";
import { getPremiumPrice } from "@/lib/payments";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { StartPremiumCheckoutButton } from "@/components/payment/StartPremiumCheckoutButton";

async function getUserInvitations(authUserId: string) {
  const db = createSupabaseAdminClient();
  const { data: profile } = await db
    .from("users")
    .select("id")
    .eq("auth_user_id", authUserId)
    .single();

  if (!profile?.id) {
    return [] as { id: string; title: string; status: string }[];
  }

  const { data } = await db
    .from("invitations")
    .select("id, title, status")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return data ?? [];
}

export default async function PaymentCheckoutPage() {
  const user = await getLoggedInUser();

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Checkout Premium</h1>
        <p className="mt-3 text-sm text-gray-600">
          Silakan masuk untuk memilih undangan yang ingin di-upgrade.
        </p>
        <Link
          href="/auth/login"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-white"
        >
          Masuk
        </Link>
      </div>
    );
  }

  const invitations = await getUserInvitations(user.id);
  const formattedPrice = new Intl.NumberFormat("id-ID").format(getPremiumPrice());

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-12">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Checkout Premium</h1>
        <p className="mt-2 text-sm text-gray-600">
          Pilih undangan yang ingin di-upgrade ke Premium (Rp {formattedPrice}/undangan).
        </p>
      </div>

      {invitations.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
          Anda belum punya undangan. Buat dulu undangan pertama sebelum checkout.
          <div>
            <Link
              href="/dashboard/invitations/new"
              className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-medium text-white"
            >
              Buat Undangan
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {invitations.map((invitation) => (
            <article key={invitation.id} className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">{invitation.title}</h2>
                <p className="text-sm text-gray-500">Status undangan: {invitation.status}</p>
              </div>
              <StartPremiumCheckoutButton
                invitationId={invitation.id}
                label="Bayar Premium via Xendit"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
