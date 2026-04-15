import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { adminListUsers } from "@/lib/admin-db";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const url = new URL(request.url);
    const rawLimit = Number(url.searchParams.get("limit") ?? 20);
    const rawOffset = Number(url.searchParams.get("offset") ?? 0);
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.trunc(rawLimit), 1), 100)
      : 20;
    const offset = Number.isFinite(rawOffset)
      ? Math.max(Math.trunc(rawOffset), 0)
      : 0;
    const search = url.searchParams.get("search")?.trim() || undefined;

    const { users, total } = await adminListUsers(limit, offset, search);

    return NextResponse.json({
      users,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Admin users list error:", error);
    return NextResponse.json(
      { error: "Failed to load users." },
      { status: 500 }
    );
  }
}
