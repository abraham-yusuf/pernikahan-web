import "server-only";

import { createSupabaseAdminClient } from "./supabase";
import type {
  SubscriptionStatus,
  TemplateRow,
  UserRole,
  UserRow,
  UserTier,
} from "./supabase/types";

export async function adminListUsers(
  limit = 20,
  offset = 0,
  search?: string
) {
  const supabase = createSupabaseAdminClient();
  let query = supabase
    .from("users")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return { users: data ?? [], total: count ?? 0 };
}

export async function adminGetUser(id: string): Promise<UserRow | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function adminUpdateUser(
  id: string,
  updates: {
    role?: UserRole;
    tier?: UserTier;
    subscription_status?: SubscriptionStatus;
  }
): Promise<UserRow> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function adminListTemplates(limit = 50, offset = 0) {
  const supabase = createSupabaseAdminClient();
  const { data, error, count } = await supabase
    .from("templates")
    .select("*", { count: "exact" })
    .order("sort_order", { ascending: true })
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }

  return { templates: data ?? [], total: count ?? 0 };
}

export async function adminGetTemplate(id: string): Promise<TemplateRow | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function adminUpdateTemplate(
  id: string,
  updates: Partial<
    Pick<
      TemplateRow,
      | "status"
      | "tier_access"
      | "sort_order"
      | "is_featured"
      | "template_key"
      | "name"
      | "description"
      | "region"
      | "category"
      | "preview_color"
      | "accent_color"
      | "bg_pattern"
      | "component_name"
      | "thumbnail_url"
      | "preview_url"
    >
  >
): Promise<TemplateRow> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("templates")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function adminCreateTemplate(
  input: Pick<
    TemplateRow,
    | "template_key"
    | "name"
    | "description"
    | "region"
    | "category"
    | "preview_color"
    | "accent_color"
    | "bg_pattern"
    | "component_name"
    | "tier_access"
    | "status"
    | "sort_order"
    | "is_featured"
  > & {
    thumbnail_url?: string | null;
    preview_url?: string | null;
    created_by_user_id?: string | null;
  }
): Promise<TemplateRow> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("templates")
    .insert(input)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function adminGetPlatformStats() {
  const supabase = createSupabaseAdminClient();

  const [
    usersResult,
    invitationsResult,
    rsvpResult,
    paymentsResult,
    templatesResult,
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("invitations").select("*", { count: "exact", head: true }),
    supabase.from("rsvp_responses").select("*", { count: "exact", head: true }),
    supabase.from("payments").select("amount", { count: "exact" }).eq("status", "paid"),
    supabase.from("templates").select("*", { count: "exact", head: true }),
  ]);

  if (usersResult.error) {
    throw usersResult.error;
  }

  if (invitationsResult.error) {
    throw invitationsResult.error;
  }

  if (rsvpResult.error) {
    throw rsvpResult.error;
  }

  if (paymentsResult.error) {
    throw paymentsResult.error;
  }

  if (templatesResult.error) {
    throw templatesResult.error;
  }

  const totalRevenue = (paymentsResult.data ?? []).reduce(
    (sum, payment) => sum + (payment.amount ?? 0),
    0
  );

  return {
    totalUsers: usersResult.count ?? 0,
    totalInvitations: invitationsResult.count ?? 0,
    totalRsvps: rsvpResult.count ?? 0,
    totalPayments: paymentsResult.count ?? 0,
    totalRevenue,
    totalTemplates: templatesResult.count ?? 0,
  };
}

export async function adminGetRevenueAnalytics(days = 30) {
  const supabase = createSupabaseAdminClient();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from("payments")
    .select("amount, status, paid_at, created_at, plan")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function adminGetUserGrowth(days = 30) {
  const supabase = createSupabaseAdminClient();
  const since = new Date();
  since.setDate(since.getDate() - days);

  const { data, error } = await supabase
    .from("users")
    .select("created_at, tier")
    .gte("created_at", since.toISOString())
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}
