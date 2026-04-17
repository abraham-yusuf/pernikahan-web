import { NextRequest, NextResponse } from "next/server";
import { deleteInvitation, getInvitationById, updateInvitation } from "@/lib/db";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { validateUpdateInvitationInput } from "@/lib/invitations";

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

type Params = Promise<{ id: string }>;

export async function GET(
  _request: NextRequest,
  { params }: { params: Params }
) {
  const profile = await getAuthenticatedProfile();

  if (!profile) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const invitation = await getInvitationById(id);

    if (!invitation || invitation.user_id !== profile.id) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const adminSupabase = createSupabaseAdminClient();
    const { data: template, error: templateError } = await adminSupabase
      .from("templates")
      .select("name, description")
      .eq("template_key", invitation.template_id)
      .maybeSingle();

    if (templateError) {
      throw templateError;
    }

    return NextResponse.json({
      invitation: {
        ...invitation,
        template_name: template?.name ?? null,
        template_description: template?.description ?? null,
      },
    });
  } catch (error) {
    console.error("Invitation fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load invitation." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  const profile = await getAuthenticatedProfile();

  if (!profile) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const invitation = await getInvitationById(id);

    if (!invitation || invitation.user_id !== profile.id) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const body = await request.json();
    const { data, error } = validateUpdateInvitationInput(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const nextData = {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.bride !== undefined ? { bride: data.bride } : {}),
      ...(data.groom !== undefined ? { groom: data.groom } : {}),
      ...(data.brideParents !== undefined ? { bride_parents: data.brideParents } : {}),
      ...(data.groomParents !== undefined ? { groom_parents: data.groomParents } : {}),
      ...(data.akadDate !== undefined ? { akad_date: data.akadDate } : {}),
      ...(data.akadTime !== undefined ? { akad_time: data.akadTime } : {}),
      ...(data.akadLocation !== undefined ? { akad_location: data.akadLocation } : {}),
      ...(data.resepsiDate !== undefined ? { resepsi_date: data.resepsiDate } : {}),
      ...(data.resepsiTime !== undefined ? { resepsi_time: data.resepsiTime } : {}),
      ...(data.resepsiLocation !== undefined
        ? { resepsi_location: data.resepsiLocation }
        : {}),
      ...(data.mapUrl !== undefined ? { map_url: data.mapUrl || null } : {}),
      ...(data.story !== undefined ? { story: data.story || null } : {}),
      ...(data.status === "published" && !invitation.published_at
        ? { published_at: new Date().toISOString() }
        : {}),
    };

    const updatedInvitation = await updateInvitation(id, nextData);

    return NextResponse.json({ invitation: updatedInvitation });
  } catch (error) {
    console.error("Invitation update error:", error);
    return NextResponse.json(
      { error: "Failed to update invitation." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Params }
) {
  const profile = await getAuthenticatedProfile();

  if (!profile) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const invitation = await getInvitationById(id);

    if (!invitation || invitation.user_id !== profile.id) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    await deleteInvitation(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Invitation delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete invitation." },
      { status: 500 }
    );
  }
}
