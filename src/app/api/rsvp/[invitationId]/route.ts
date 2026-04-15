import { NextRequest, NextResponse } from "next/server";
import {
  countRSVPsByInvitation,
  getInvitationById,
  listRSVPsByInvitation,
} from "@/lib/appwrite-db";
import { createSessionClient } from "@/lib/appwrite";
import { getSessionToken } from "@/lib/auth";
import { RSVP_STORAGE_CONFIGURED } from "@/lib/collections";

const APPWRITE_SERVER_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
    process.env.APPWRITE_API_KEY
);

type Params = Promise<{ invitationId: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  if (!RSVP_STORAGE_CONFIGURED || !APPWRITE_SERVER_CONFIGURED) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { account } = createSessionClient(sessionToken);
    const user = await account.get();
    const { invitationId } = await params;

    const invitation = await getInvitationById(invitationId);
    if (!invitation || invitation.userId !== user.$id) {
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
