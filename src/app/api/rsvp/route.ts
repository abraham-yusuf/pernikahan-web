import { NextRequest, NextResponse } from "next/server";
import { createRSVPResponse } from "@/lib/appwrite-db";
import { RSVP_STORAGE_CONFIGURED } from "@/lib/collections";
import { validateRSVPInput } from "@/lib/validators/rsvp";

const APPWRITE_SERVER_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT &&
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID &&
    process.env.APPWRITE_API_KEY
);

export async function POST(request: NextRequest) {
  if (!RSVP_STORAGE_CONFIGURED || !APPWRITE_SERVER_CONFIGURED) {
    return NextResponse.json(
      { error: "Database not configured. RSVP saved locally only." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { data, error } = validateRSVPInput(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const document = await createRSVPResponse({
      invitationId: data.invitationId,
      guestName: data.guestName,
      attendance: data.attendance,
      guestCount: data.guestCount,
      message: data.message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, document }, { status: 201 });
  } catch (err) {
    console.error("RSVP submit error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to submit RSVP.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
