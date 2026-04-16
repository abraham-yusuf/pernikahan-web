import { NextRequest, NextResponse } from "next/server";
import { createInvitation, listInvitationsByUser } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  generateSlug,
  validateCreateInvitationInput,
} from "@/lib/invitations";
import type { UserTier } from "@/lib/supabase/types";

async function getAuthenticatedProfile(): Promise<
  { id: string; tier: UserTier } | null
> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("id, tier")
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
    const { data, error } = validateCreateInvitationInput(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const supabase = await createSupabaseServerClient();
    const { data: template, error: templateError } = await supabase
      .from("templates")
      .select("template_key, tier_access, status")
      .eq("template_key", data.templateId)
      .maybeSingle();

    if (templateError) {
      throw templateError;
    }

    if (!template || template.status !== "active") {
      return NextResponse.json(
        { error: "Template tidak tersedia." },
        { status: 400 }
      );
    }

    if (profile.tier === "free" && template.tier_access === "premium") {
      return NextResponse.json(
        {
          error:
            "Template premium hanya tersedia untuk akun Premium. Silakan upgrade terlebih dahulu.",
        },
        { status: 403 }
      );
    }

    const invitation = await createInvitation({
      user_id: profile.id,
      template_id: data.templateId,
      slug: generateSlug(data.bride, data.groom),
      title: data.title,
      status: "draft",
      bride: data.bride,
      groom: data.groom,
      bride_parents: data.brideParents,
      groom_parents: data.groomParents,
      akad_date: data.akadDate,
      akad_time: data.akadTime,
      akad_location: data.akadLocation,
      resepsi_date: data.resepsiDate,
      resepsi_time: data.resepsiTime,
      resepsi_location: data.resepsiLocation,
      map_url: data.mapUrl || null,
      story: data.story || null,
      custom_primary_color: null,
      custom_accent_color: null,
      cover_image_url: null,
      gallery_urls: null,
      rsvp_enabled: true,
      watermark_enabled: true,
    });

    return NextResponse.json({ invitation }, { status: 201 });
  } catch (error) {
    console.error("Invitation create error:", error);
    return NextResponse.json(
      { error: "Failed to create invitation." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const profile = await getAuthenticatedProfile();

  if (!profile) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const rawLimit = Number(url.searchParams.get("limit") ?? 20);
    const rawOffset = Number(url.searchParams.get("offset") ?? 0);
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.trunc(rawLimit), 1), 100)
      : 20;
    const offset = Number.isFinite(rawOffset)
      ? Math.max(Math.trunc(rawOffset), 0)
      : 0;

    const invitations = await listInvitationsByUser(profile.id, limit, offset);

    return NextResponse.json({
      invitations: invitations.documents,
      total: invitations.total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Invitation list error:", error);
    return NextResponse.json(
      { error: "Failed to load invitations." },
      { status: 500 }
    );
  }
}
