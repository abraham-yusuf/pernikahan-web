import "server-only";

import { createSupabaseAdminClient } from "./supabase";
import { createSupabaseServerClient } from "./supabase/server";
import type { UserRow } from "./supabase/types";

export async function getAdminUser(): Promise<UserRow | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const adminClient = createSupabaseAdminClient();
  const { data: profile, error } = await adminClient
    .from("users")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  if (error || !profile) {
    return null;
  }

  if (profile.role !== "admin") {
    return null;
  }

  return profile;
}
