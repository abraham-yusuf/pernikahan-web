import { NextRequest, NextResponse } from "next/server";
import {
  createInvitation,
  listInvitationsByUser,
} from "@/lib/appwrite-db";
import { createSessionClient } from "@/lib/appwrite";
import { getSessionToken } from "@/lib/auth";
import { INVITATION_STORAGE_CONFIGURED } from "@/lib/collections";
import {
  generateSlug,
  validateCreateInvitationInput,
} from "@/lib/invitations";

const APPWRITE_SERVER_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
    process.env.APPWRITE_API_KEY
);

export async function POST(request: NextRequest) {
  if (!INVITATION_STORAGE_CONFIGURED || !APPWRITE_SERVER_CONFIGURED) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { account } = createSessionClient(sessionToken);
    const user = await account.get();
    const body = await request.json();
    const { data, error } = validateCreateInvitationInput(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const invitation = await createInvitation({
      userId: user.$id,
      templateId: data.templateId,
      slug: generateSlug(data.bride, data.groom),
      title: data.title,
      status: "draft",
      bride: data.bride,
      groom: data.groom,
      brideParents: data.brideParents,
      groomParents: data.groomParents,
      akadDate: data.akadDate,
      akadTime: data.akadTime,
      akadLocation: data.akadLocation,
      resepsiDate: data.resepsiDate,
      resepsiTime: data.resepsiTime,
      resepsiLocation: data.resepsiLocation,
      mapUrl: data.mapUrl,
      story: data.story,
      rsvpEnabled: true,
      watermarkEnabled: true,
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
  if (!INVITATION_STORAGE_CONFIGURED || !APPWRITE_SERVER_CONFIGURED) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const { account } = createSessionClient(sessionToken);
    const user = await account.get();
    const url = new URL(request.url);
    const rawLimit = Number(url.searchParams.get("limit") ?? 20);
    const rawOffset = Number(url.searchParams.get("offset") ?? 0);
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.trunc(rawLimit), 1), 100)
      : 20;
    const offset = Number.isFinite(rawOffset)
      ? Math.max(Math.trunc(rawOffset), 0)
      : 0;

    const invitations = await listInvitationsByUser(user.$id, limit, offset);

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
