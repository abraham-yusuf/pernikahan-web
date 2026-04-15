import { NextRequest, NextResponse } from "next/server";
import {
  deleteInvitation,
  getInvitationById,
  updateInvitation,
} from "@/lib/appwrite-db";
import { createSessionClient } from "@/lib/appwrite";
import { getSessionToken } from "@/lib/auth";
import { INVITATION_STORAGE_CONFIGURED } from "@/lib/collections";
import { validateUpdateInvitationInput } from "@/lib/invitations";

const APPWRITE_SERVER_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
    process.env.APPWRITE_API_KEY
);

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
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
    const { id } = await params;
    const invitation = await getInvitationById(id);

    if (!invitation || invitation.userId !== user.$id) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return NextResponse.json({ invitation });
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
    const { id } = await params;
    const invitation = await getInvitationById(id);

    if (!invitation || invitation.userId !== user.$id) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const body = await request.json();
    const { data, error } = validateUpdateInvitationInput(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const nextData = {
      ...data,
      ...(data.status === "published" && !invitation.publishedAt
        ? { publishedAt: new Date().toISOString() }
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
  request: NextRequest,
  { params }: { params: Params }
) {
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
    const { id } = await params;
    const invitation = await getInvitationById(id);

    if (!invitation || invitation.userId !== user.$id) {
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
