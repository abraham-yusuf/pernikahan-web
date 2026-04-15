import { NextRequest, NextResponse } from "next/server";
import {
  countRSVPsByInvitation,
  getInvitationById,
  listRSVPsByInvitation,
} from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

type Params = Promise<{ invitationId: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const profile = await getAuthenticatedProfile();

  if (!profile) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { invitationId } = await params;
    const invitation = await getInvitationById(invitationId);

    if (!invitation || invitation.user_id !== profile.id) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const url = new URL(request.url);
    const rawLimit = Number(url.searchParams.get("limit") ?? 50);
    const rawOffset = Number(url.searchParams.get("offset") ?? 0);
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.trunc(rawLimit), 1), 100)
      : 50;
    const offset = Number.isFinite(rawOffset)
      ? Math.max(Math.trunc(rawOffset), 0)
      : 0;

    const [responses, counts] = await Promise.all([
      listRSVPsByInvitation(invitationId, limit, offset),
      countRSVPsByInvitation(invitationId),
    ]);

    return NextResponse.json({
      responses: responses.documents,
      total: responses.total,
      summary: counts,
    });
  } catch (err) {
    console.error("RSVP list error:", err);
    return NextResponse.json(
      { error: "Failed to load RSVPs." },
      { status: 500 }
    );
  }
}
