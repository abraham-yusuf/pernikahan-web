import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { adminGetUser, adminUpdateUser } from "@/lib/admin-db";
import type {
  SubscriptionStatus,
  UserRole,
  UserTier,
} from "@/lib/supabase/types";

type Params = Promise<{ id: string }>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function validateUserUpdate(body: unknown): {
  data?: {
    role?: UserRole;
    tier?: UserTier;
    subscription_status?: SubscriptionStatus;
  };
  error?: string;
} {
  if (!isRecord(body)) {
    return { error: "Request body is required." };
  }

  const data: {
    role?: UserRole;
    tier?: UserTier;
    subscription_status?: SubscriptionStatus;
  } = {};

  if ("role" in body) {
    if (body.role !== "user" && body.role !== "admin") {
      return { error: "role must be 'user' or 'admin'." };
    }

    data.role = body.role;
  }

  if ("tier" in body) {
    if (body.tier !== "free" && body.tier !== "premium") {
      return { error: "tier must be 'free' or 'premium'." };
    }

    data.tier = body.tier;
  }

  if ("subscription_status" in body) {
    if (
      body.subscription_status !== "none" &&
      body.subscription_status !== "pending" &&
      body.subscription_status !== "active" &&
      body.subscription_status !== "past_due" &&
      body.subscription_status !== "cancelled"
    ) {
      return {
        error:
          "subscription_status must be 'none', 'pending', 'active', 'past_due', or 'cancelled'.",
      };
    }

    data.subscription_status = body.subscription_status;
  }

  if (Object.keys(data).length === 0) {
    return { error: "At least one field must be provided." };
  }

  return { data };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Params }
) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const user = await adminGetUser(id);

    if (!user) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Admin user fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load user." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const existingUser = await adminGetUser(id);

    if (!existingUser) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const body = await request.json();
    const { data, error } = validateUserUpdate(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const user = await adminUpdateUser(id, data);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Admin user update error:", error);
    return NextResponse.json(
      { error: "Failed to update user." },
      { status: 500 }
    );
  }
}
