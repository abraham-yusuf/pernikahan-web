import { NextRequest, NextResponse } from "next/server";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/middleware";

const PROTECTED_PATHS = ["/dashboard", "/editor", "/payment", "/admin"];
const AUTH_PATHS = ["/auth/login", "/auth/signup"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  const supabase = createSupabaseMiddlewareClient(request, response);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if (isProtected && !user) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const proxyConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
