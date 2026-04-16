import { NextRequest, NextResponse } from "next/server";
import { getInvitationById } from "@/lib/db";
import {
  createPaymentRecord,
  generateExternalId,
  getPremiumPrice,
} from "@/lib/payments";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { xenditClient } from "@/lib/xendit";

async function getAuthenticatedProfile(): Promise<{ id: string } | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (error || !profile) {
    return null;
  }

  return profile;
}

export async function POST(request: NextRequest) {
  const profile = await getAuthenticatedProfile();

  if (!profile) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { invitationId } = body;

    if (!invitationId || typeof invitationId !== "string") {
      return NextResponse.json(
        { error: "invitationId is required." },
        { status: 400 }
      );
    }

    const invitation = await getInvitationById(invitationId);
    if (!invitation || invitation.user_id !== profile.id) {
      return NextResponse.json(
        { error: "Invitation not found." },
        { status: 404 }
      );
    }

    const amount = getPremiumPrice();
    const externalId = generateExternalId(profile.id, invitationId);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const invoice = await xenditClient.Invoice.createInvoice({
      data: {
        externalId,
        amount,
        description: `Premium Invitation: ${invitation.title}`,
        currency: "IDR",
        invoiceDuration: 86400,
        successRedirectUrl: `${appUrl}/payment/success?external_id=${externalId}`,
        failureRedirectUrl: `${appUrl}/payment/cancel?external_id=${externalId}`,
        items: [
          {
            name: "Premium Wedding Invitation",
            quantity: 1,
            price: amount,
          },
        ],
      },
    });

    const payment = await createPaymentRecord({
      user_id: profile.id,
      invitation_id: invitationId,
      xendit_invoice_id: invoice.id!,
      xendit_external_id: externalId,
      xendit_invoice_url: invoice.invoiceUrl,
      amount,
      plan: "premium_invitation",
    });

    return NextResponse.json(
      {
        invoiceUrl: invoice.invoiceUrl,
        paymentId: payment.id,
        externalId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to create checkout.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
