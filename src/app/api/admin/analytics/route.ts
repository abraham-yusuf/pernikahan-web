import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { adminGetRevenueAnalytics, adminGetUserGrowth } from "@/lib/admin-db";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const url = new URL(request.url);
    const rawDays = Number(url.searchParams.get("days") ?? 30);
    const days = Number.isFinite(rawDays)
      ? Math.min(Math.max(Math.trunc(rawDays), 1), 365)
      : 30;

    const [revenue, userGrowth] = await Promise.all([
      adminGetRevenueAnalytics(days),
      adminGetUserGrowth(days),
    ]);

    return NextResponse.json({ revenue, userGrowth });
  } catch (error) {
    console.error("Admin analytics error:", error);
    return NextResponse.json(
      { error: "Failed to load analytics." },
      { status: 500 }
    );
  }
}
