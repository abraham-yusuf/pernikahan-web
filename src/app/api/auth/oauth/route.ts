import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get("provider");

  if (!provider || provider !== "google") {
    return NextResponse.json({ error: "Provider tidak valid." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${baseUrl}/api/auth/oauth/callback`,
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(`${baseUrl}/auth/login?error=oauth_failed`);
  }

  return NextResponse.redirect(data.url);
}
