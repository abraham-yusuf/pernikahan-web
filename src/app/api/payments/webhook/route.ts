import { NextRequest, NextResponse } from "next/server";
import {
  activatePremium,
  getPaymentByExternalId,
  updatePaymentStatus,
} from "@/lib/payments";

function verifyWebhookToken(request: NextRequest): boolean {
  const token = request.headers.get("x-callback-token");
  return token === process.env.XENDIT_WEBHOOK_TOKEN;
}

export async function POST(request: NextRequest) {
  if (!verifyWebhookToken(request)) {
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { external_id, status, payment_method, payment_channel, paid_at } =
      body;

    if (!external_id || !status) {
      return NextResponse.json({ error: "Missing fields." }, { status: 400 });
    }

    const payment = await getPaymentByExternalId(external_id);
    if (!payment) {
      console.error(
        `Webhook: payment not found for external_id=${external_id}`
      );
      return NextResponse.json({ error: "Payment not found." }, { status: 404 });
    }

    if (payment.status === "paid") {
      return NextResponse.json({ success: true });
    }

    let mappedStatus: "pending" | "paid" | "failed" | "expired";
    switch (status) {
      case "PAID":
      case "SETTLED":
        mappedStatus = "paid";
        break;
      case "EXPIRED":
        mappedStatus = "expired";
        break;
      case "FAILED":
        mappedStatus = "failed";
        break;
      default:
        mappedStatus = "pending";
    }

    await updatePaymentStatus(payment.id, mappedStatus, {
      paid_at:
        mappedStatus === "paid" ? paid_at || new Date().toISOString() : undefined,
      xendit_payment_method: payment_method ?? undefined,
      xendit_payment_channel: payment_channel ?? undefined,
    });

    if (mappedStatus === "paid") {
      await activatePremium(payment.user_id);

      if (payment.invitation_id) {
        const { createSupabaseAdminClient } = await import(
          "@/lib/supabase/server"
        );
        const db = createSupabaseAdminClient();
        const { error: watermarkError } = await db
          .from("invitations")
          .update({
            watermark_enabled: false,
            updated_at: new Date().toISOString(),
          })
          .eq("id", payment.invitation_id);

        if (watermarkError) {
          console.error(
            `Webhook: failed to remove watermark for invitation=${payment.invitation_id}:`,
            watermarkError.message
          );
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
