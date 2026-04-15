import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { adminGetPlatformStats } from "@/lib/admin-db";

export async function GET(_request: NextRequest) {
  void _request;

  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const stats = await adminGetPlatformStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Failed to load admin stats." },
      { status: 500 }
    );
  }
}
