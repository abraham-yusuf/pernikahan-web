import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import {
  countRecentRSVPSubmissionsByTag,
  createRSVPResponse,
  findRecentDuplicateRSVP,
  getLatestRSVPSubmissionByTag,
} from "@/lib/db";
import { validateRSVPInput } from "@/lib/validators/rsvp";

const RATE_LIMIT_WINDOW_MS = Number(process.env.RSVP_RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RSVP_RATE_LIMIT_MAX_REQUESTS ?? 8);
const MIN_COOLDOWN_SECONDS = Number(process.env.RSVP_MIN_COOLDOWN_SECONDS ?? 10);
const DUPLICATE_LOOKBACK_HOURS = Number(process.env.RSVP_DUPLICATE_LOOKBACK_HOURS ?? 12);

function resolveClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(",");
    if (firstIp) {
      return firstIp.trim();
    }
  }

  return request.headers.get("x-real-ip")?.trim() ?? "unknown";
}

function createGuestTag(ip: string) {
  const digest = createHash("sha256").update(ip).digest("hex").slice(0, 24);
  return `ip:${digest}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const honeypotRaw =
      body && typeof body === "object"
        ? (body as Record<string, unknown>).website
        : undefined;
    if (typeof honeypotRaw === "string" && honeypotRaw.trim().length > 0) {
      return NextResponse.json(
        { error: "Suspicious submission detected." },
        { status: 400 }
      );
    }

    const { data, error } = validateRSVPInput(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const ip = resolveClientIp(request);
    const guestTag = createGuestTag(ip);
    const now = Date.now();
    const rateLimitSinceISO = new Date(now - RATE_LIMIT_WINDOW_MS).toISOString();
    const recentAttempts = await countRecentRSVPSubmissionsByTag(
      data.invitationId,
      guestTag,
      rateLimitSinceISO
    );

    if (recentAttempts >= RATE_LIMIT_MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Terlalu banyak percobaan RSVP. Coba lagi beberapa menit lagi." },
        { status: 429 }
      );
    }

    if (MIN_COOLDOWN_SECONDS > 0 && recentAttempts > 0) {
      const latestSubmissionAt = await getLatestRSVPSubmissionByTag(
        data.invitationId,
        guestTag
      );
      const latestTimestamp = latestSubmissionAt ? Date.parse(latestSubmissionAt) : NaN;
      const elapsedSeconds = Number.isNaN(latestTimestamp)
        ? MIN_COOLDOWN_SECONDS
        : Math.floor((now - latestTimestamp) / 1000);

      if (elapsedSeconds < MIN_COOLDOWN_SECONDS) {
        const retryAfter = MIN_COOLDOWN_SECONDS - elapsedSeconds;
        return NextResponse.json(
          { error: `Mohon tunggu ${retryAfter} detik sebelum mengirim ulang.` },
          { status: 429 }
        );
      }
    }

    const duplicateSinceISO = new Date(
      now - DUPLICATE_LOOKBACK_HOURS * 60 * 60 * 1000
    ).toISOString();
    const duplicate = await findRecentDuplicateRSVP(
      data.invitationId,
      {
        guestName: data.guestName,
        attendance: data.attendance,
        guestCount: data.guestCount,
        message: data.message ?? null,
      },
      duplicateSinceISO
    );

    if (duplicate) {
      return NextResponse.json(
        {
          error:
            "Kami mendeteksi data RSVP yang sama sudah pernah dikirim. Jika ada perubahan, silakan ubah isi pesan.",
        },
        { status: 409 }
      );
    }

    const document = await createRSVPResponse({
      invitation_id: data.invitationId,
      guest_name: data.guestName,
      attendance: data.attendance,
      guest_count: data.guestCount,
      message: data.message ?? null,
      guest_tag: guestTag,
      submitted_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, document }, { status: 201 });
  } catch (err) {
    console.error("RSVP submit error:", err);
    const message = err instanceof Error ? err.message : "Failed to submit RSVP.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
