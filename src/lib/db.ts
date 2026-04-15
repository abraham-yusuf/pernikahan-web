import "server-only";

import { createSupabaseAdminClient } from "./supabase";
import type { Database, InvitationRow, RSVPResponseRow } from "./supabase/types";

export async function createRSVPResponse(
  data: Database["public"]["Tables"]["rsvp_responses"]["Insert"]
): Promise<RSVPResponseRow> {
  const supabase = createSupabaseAdminClient();
  const { data: row, error } = await supabase
    .from("rsvp_responses")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return row;
}

export async function listRSVPsByInvitation(
  invitationId: string,
  limit = 50,
  offset = 0
) {
  const supabase = createSupabaseAdminClient();
  const { data, error, count } = await supabase
    .from("rsvp_responses")
    .select("*", { count: "exact" })
    .eq("invitation_id", invitationId)
    .order("submitted_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }

  return { documents: data ?? [], total: count ?? 0 };
}

export async function countRSVPsByInvitation(invitationId: string) {
  const supabase = createSupabaseAdminClient();

  const [attending, notAttending] = await Promise.all([
    supabase
      .from("rsvp_responses")
      .select("*", { count: "exact", head: true })
      .eq("invitation_id", invitationId)
      .eq("attendance", "hadir"),
    supabase
      .from("rsvp_responses")
      .select("*", { count: "exact", head: true })
      .eq("invitation_id", invitationId)
      .eq("attendance", "tidak_hadir"),
  ]);

  return {
    attending: attending.count ?? 0,
    notAttending: notAttending.count ?? 0,
    total: (attending.count ?? 0) + (notAttending.count ?? 0),
  };
}

export async function getInvitationBySlug(slug: string): Promise<InvitationRow | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getInvitationById(id: string): Promise<InvitationRow | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createInvitation(
  data: Database["public"]["Tables"]["invitations"]["Insert"]
): Promise<InvitationRow> {
  const supabase = createSupabaseAdminClient();
  const { data: row, error } = await supabase
    .from("invitations")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return row;
}

export async function listInvitationsByUser(
  userId: string,
  limit = 20,
  offset = 0
) {
  const supabase = createSupabaseAdminClient();
  const { data, error, count } = await supabase
    .from("invitations")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }

  return { documents: data ?? [], total: count ?? 0 };
}

export async function updateInvitation(
  id: string,
  data: Database["public"]["Tables"]["invitations"]["Update"]
): Promise<InvitationRow> {
  const supabase = createSupabaseAdminClient();
  const { data: row, error } = await supabase
    .from("invitations")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return row;
}

export async function deleteInvitation(id: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("invitations").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
