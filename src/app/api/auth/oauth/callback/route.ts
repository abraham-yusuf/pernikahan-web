import { NextRequest, NextResponse } from "next/server";
import { createAdminClient, SESSION_COOKIE_NAME } from "@/lib/appwrite";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/login?error=invalid_callback`);
  }

  try {
    const { account, users } = createAdminClient();
    const session = await account.createSession(userId, secret);

    // Initialize user preferences for new OAuth users
    const user = await users.get(userId);
    if (!user.prefs || Object.keys(user.prefs).length === 0) {
      await users.updatePrefs(userId, { tier: "free" });
    }

    const response = NextResponse.redirect(`${request.nextUrl.origin}/dashboard`);

    response.cookies.set(SESSION_COOKIE_NAME, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/login?error=oauth_callback_failed`);
  }
}
