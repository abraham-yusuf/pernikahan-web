import { NextRequest, NextResponse } from "next/server";
import { createRSVPResponse } from "@/lib/db";
import { validateRSVPInput } from "@/lib/validators/rsvp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, error } = validateRSVPInput(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const document = await createRSVPResponse({
      invitation_id: data.invitationId,
      guest_name: data.guestName,
      attendance: data.attendance,
      guest_count: data.guestCount,
      message: data.message ?? null,
      submitted_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, document }, { status: 201 });
  } catch (err) {
    console.error("RSVP submit error:", err);
    const message = err instanceof Error ? err.message : "Failed to submit RSVP.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
