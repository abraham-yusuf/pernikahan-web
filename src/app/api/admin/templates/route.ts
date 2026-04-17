import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { adminCreateTemplate, adminListTemplates } from "@/lib/admin-db";
import type { TemplateStatus, TemplateTierAccess } from "@/lib/supabase/types";
import { parseOptionalString } from "@/lib/template-admin-validation";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function validateTemplateCreate(body: unknown): {
  data?: {
    template_key: string;
    name: string;
    description: string;
    region: string;
    category: string;
    preview_color: string;
    accent_color: string;
    bg_pattern: string;
    component_name: string;
    tier_access: TemplateTierAccess;
    status: TemplateStatus;
    sort_order: number;
    is_featured: boolean;
    thumbnail_url?: string | null;
    preview_url?: string | null;
  };
  error?: string;
} {
  if (!isRecord(body)) {
    return { error: "Request body is required." };
  }

  const requiredStringFields = [
    "template_key",
    "name",
    "description",
    "region",
    "category",
    "preview_color",
    "accent_color",
    "bg_pattern",
    "component_name",
  ] as const;

  const requiredValues = {} as Record<(typeof requiredStringFields)[number], string>;

  for (const field of requiredStringFields) {
    const value = body[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      return { error: `${field} must be a non-empty string.` };
    }

    requiredValues[field] = value.trim();
  }

  if (body.tier_access !== "free" && body.tier_access !== "premium") {
    return { error: "tier_access must be 'free' or 'premium'." };
  }

  if (
    body.status !== "active" &&
    body.status !== "draft" &&
    body.status !== "archived"
  ) {
    return { error: "status must be 'active', 'draft', or 'archived'." };
  }

  if (
    typeof body.sort_order !== "number" ||
    !Number.isInteger(body.sort_order)
  ) {
    return { error: "sort_order must be an integer number." };
  }

  if (body.sort_order < 0) {
    return { error: "sort_order must be greater than or equal to 0." };
  }

  if (typeof body.is_featured !== "boolean") {
    return { error: "is_featured must be a boolean." };
  }

  const thumbnailUrl = parseOptionalString(body.thumbnail_url);
  if ("thumbnail_url" in body && thumbnailUrl === undefined) {
    return { error: "thumbnail_url must be a string, null, or omitted." };
  }

  const previewUrl = parseOptionalString(body.preview_url);
  if ("preview_url" in body && previewUrl === undefined) {
    return { error: "preview_url must be a string, null, or omitted." };
  }

  return {
    data: {
      template_key: requiredValues.template_key,
      name: requiredValues.name,
      description: requiredValues.description,
      region: requiredValues.region,
      category: requiredValues.category,
      preview_color: requiredValues.preview_color,
      accent_color: requiredValues.accent_color,
      bg_pattern: requiredValues.bg_pattern,
      component_name: requiredValues.component_name,
      tier_access: body.tier_access,
      status: body.status,
      sort_order: body.sort_order,
      is_featured: body.is_featured,
      ...(thumbnailUrl !== undefined ? { thumbnail_url: thumbnailUrl } : {}),
      ...(previewUrl !== undefined ? { preview_url: previewUrl } : {}),
    },
  };
}

export async function GET(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const url = new URL(request.url);
    const rawLimit = Number(url.searchParams.get("limit") ?? 50);
    const rawOffset = Number(url.searchParams.get("offset") ?? 0);
    const limit = Number.isFinite(rawLimit)
      ? Math.min(Math.max(Math.trunc(rawLimit), 1), 100)
      : 50;
    const offset = Number.isFinite(rawOffset)
      ? Math.max(Math.trunc(rawOffset), 0)
      : 0;

    const { templates, total } = await adminListTemplates(limit, offset);

    return NextResponse.json({
      templates,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Admin templates list error:", error);
    return NextResponse.json(
      { error: "Failed to load templates." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { data, error } = validateTemplateCreate(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const template = await adminCreateTemplate({
      ...data,
      created_by_user_id: admin.id,
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error("Admin template create error:", error);
    return NextResponse.json(
      { error: "Failed to create template." },
      { status: 500 }
    );
  }
}
