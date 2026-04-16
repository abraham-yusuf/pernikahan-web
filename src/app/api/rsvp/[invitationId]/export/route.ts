import { NextResponse } from "next/server";
import { getInvitationById, listAllRSVPsByInvitation } from "@/lib/db";
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

function escapeCsvCell(value: string | number | null | undefined) {
  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);
  const escaped = text.replaceAll('"', '""');
  return /[",\n\r]/.test(escaped) ? `"${escaped}"` : escaped;
}

export async function GET(
  request: Request,
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
    const format = url.searchParams.get("format") ?? "csv";

    if (format !== "csv") {
      return NextResponse.json(
        { error: "Unsupported export format." },
        { status: 400 }
      );
    }

    const responses = await listAllRSVPsByInvitation(invitationId);
    const header = [
      "id",
      "guest_name",
      "attendance",
      "guest_count",
      "message",
      "submitted_at",
      "created_at",
    ];

    const lines = [
      header.join(","),
      ...responses.map((row) =>
        [
          row.id,
          row.guest_name,
          row.attendance,
          row.guest_count,
          row.message,
          row.submitted_at,
          row.created_at,
        ]
          .map(escapeCsvCell)
          .join(",")
      ),
    ];

    return new NextResponse(lines.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="rsvp-${invitationId}.csv"`,
      },
    });
  } catch (error) {
    console.error("RSVP export error:", error);
    return NextResponse.json({ error: "Failed to export RSVPs." }, { status: 500 });
  }
}
