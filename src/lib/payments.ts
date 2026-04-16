import "server-only";

import { createSupabaseAdminClient } from "./supabase/server";
import type { PaymentRow, PaymentStatus } from "./supabase/types";

const PREMIUM_PRICE = 99000;

export function getPremiumPrice(): number {
  return PREMIUM_PRICE;
}

export function generateExternalId(userId: string, invitationId: string): string {
  return `nd-${userId.slice(0, 8)}-${invitationId.slice(0, 8)}-${Date.now()}`;
}

export async function createPaymentRecord(data: {
  user_id: string;
  invitation_id: string;
  xendit_invoice_id: string;
  xendit_external_id: string;
  xendit_invoice_url: string;
  amount: number;
  plan: "premium_invitation";
}): Promise<PaymentRow> {
  const db = createSupabaseAdminClient();
  const { data: payment, error } = await db
    .from("payments")
    .insert({
      user_id: data.user_id,
      invitation_id: data.invitation_id,
      xendit_invoice_id: data.xendit_invoice_id,
      xendit_external_id: data.xendit_external_id,
      xendit_invoice_url: data.xendit_invoice_url,
      amount: data.amount,
      currency: "idr",
      plan: data.plan,
      status: "pending",
    })
    .select()
    .single();

  if (error || !payment) {
    throw new Error(error?.message ?? "Failed to create payment record");
  }

  return payment;
}

export async function getPaymentByExternalId(
  externalId: string
): Promise<PaymentRow | null> {
  const db = createSupabaseAdminClient();
  const { data } = await db
    .from("payments")
    .select("*")
    .eq("xendit_external_id", externalId)
    .single();

  return data ?? null;
}

export async function getPaymentByInvoiceId(
  invoiceId: string
): Promise<PaymentRow | null> {
  const db = createSupabaseAdminClient();
  const { data } = await db
    .from("payments")
    .select("*")
    .eq("xendit_invoice_id", invoiceId)
    .single();

  return data ?? null;
}

export async function updatePaymentStatus(
  paymentId: string,
  status: PaymentStatus,
  extra?: {
    paid_at?: string;
    xendit_payment_method?: string;
    xendit_payment_channel?: string;
  }
): Promise<PaymentRow> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db
    .from("payments")
    .update({
      status,
      updated_at: new Date().toISOString(),
      ...extra,
    })
    .eq("id", paymentId)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to update payment");
  }

  return data;
}

export async function activatePremium(userId: string): Promise<void> {
  const db = createSupabaseAdminClient();
  const { error } = await db
    .from("users")
    .update({
      tier: "premium",
      subscription_status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to activate premium: ${error.message}`);
  }
}

export async function listPaymentsByUser(
  userId: string,
  limit = 20,
  offset = 0
): Promise<{ payments: PaymentRow[]; total: number }> {
  const db = createSupabaseAdminClient();
  const { data, count, error } = await db
    .from("payments")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error(error.message);
  }

  return { payments: data ?? [], total: count ?? 0 };
}
