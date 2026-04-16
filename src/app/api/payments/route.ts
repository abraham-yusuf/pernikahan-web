import { NextRequest, NextResponse } from "next/server";
import { getPaymentByExternalId, listPaymentsByUser } from "@/lib/payments";
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

export async function GET(request: NextRequest) {
  const profile = await getAuthenticatedProfile();

  if (!profile) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const externalId = url.searchParams.get("external_id")?.trim();

    if (externalId) {
      const payment = await getPaymentByExternalId(externalId);

      if (!payment || payment.user_id !== profile.id) {
        return NextResponse.json(
          { error: "Payment not found." },
          { status: 404 }
        );
      }

      return NextResponse.json({ payment });
    }

    const rawLimit = Number(url.searchParams.get("limit") ?? 20);
    const rawOffset = Number(url.searchParams.get("offset") ?? 0);
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.trunc(rawLimit), 1), 100)
      : 20;
    const offset = Number.isFinite(rawOffset)
      ? Math.max(Math.trunc(rawOffset), 0)
      : 0;

    const { payments, total } = await listPaymentsByUser(
      profile.id,
      limit,
      offset
    );

    return NextResponse.json({ payments, total, limit, offset });
  } catch (err) {
    console.error("Payments list error:", err);
    return NextResponse.json(
      { error: "Failed to load payments." },
      { status: 500 }
    );
  }
}
