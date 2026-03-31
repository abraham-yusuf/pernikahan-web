import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite";
import { OAuthProvider } from "node-appwrite";

export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get("provider");

  if (!provider || provider !== "google") {
    return NextResponse.json({ error: "Provider tidak valid." }, { status: 400 });
  }

  const { account } = createAdminClient();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${baseUrl}/api/auth/oauth/callback`,
    `${baseUrl}/auth/login?error=oauth_failed`
  );

  return NextResponse.redirect(redirectUrl);
}
