import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { adminGetTemplate, adminUpdateTemplate } from "@/lib/admin-db";
import type { TemplateStatus, TemplateTierAccess } from "@/lib/supabase/types";
import { parseOptionalString } from "@/lib/template-admin-validation";

type Params = Promise<{ id: string }>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function validateTemplateUpdate(body: unknown): {
  data?: {
    status?: TemplateStatus;
    tier_access?: TemplateTierAccess;
    sort_order?: number;
    is_featured?: boolean;
    template_key?: string;
    name?: string;
    description?: string;
    region?: string;
    category?: string;
    preview_color?: string;
    accent_color?: string;
    bg_pattern?: string;
    component_name?: string;
    thumbnail_url?: string | null;
    preview_url?: string | null;
  };
  error?: string;
} {
  if (!isRecord(body)) {
    return { error: "Request body is required." };
  }

  const data: {
    status?: TemplateStatus;
    tier_access?: TemplateTierAccess;
    sort_order?: number;
    is_featured?: boolean;
    template_key?: string;
    name?: string;
    description?: string;
    region?: string;
    category?: string;
    preview_color?: string;
    accent_color?: string;
    bg_pattern?: string;
    component_name?: string;
    thumbnail_url?: string | null;
    preview_url?: string | null;
  } = {};

  if ("status" in body) {
    if (
      body.status !== "active" &&
      body.status !== "draft" &&
      body.status !== "archived"
    ) {
      return { error: "status must be 'active', 'draft', or 'archived'." };
    }

    data.status = body.status;
  }

  if ("tier_access" in body) {
    if (body.tier_access !== "free" && body.tier_access !== "premium") {
      return { error: "tier_access must be 'free' or 'premium'." };
    }

    data.tier_access = body.tier_access;
  }

  if ("sort_order" in body) {
    if (
      typeof body.sort_order !== "number" ||
      !Number.isInteger(body.sort_order)
    ) {
      return { error: "sort_order must be a non-negative integer." };
    }

    if (body.sort_order < 0) {
      return { error: "sort_order must be greater than or equal to 0." };
    }

    data.sort_order = body.sort_order;
  }

  if ("is_featured" in body) {
    if (typeof body.is_featured !== "boolean") {
      return { error: "is_featured must be a boolean." };
    }

    data.is_featured = body.is_featured;
  }

  if ("name" in body) {
    if (typeof body.name !== "string" || body.name.trim().length === 0) {
      return { error: "name must be a non-empty string." };
    }

    data.name = body.name.trim();
  }

  if ("description" in body) {
    if (
      typeof body.description !== "string" ||
      body.description.trim().length === 0
    ) {
      return { error: "description must be a non-empty string." };
    }

    data.description = body.description.trim();
  }

  const requiredStringFields = [
    "template_key",
    "region",
    "category",
    "preview_color",
    "accent_color",
    "bg_pattern",
    "component_name",
  ] as const;

  for (const field of requiredStringFields) {
    if (field in body) {
      const value = body[field];
      if (typeof value !== "string" || value.trim().length === 0) {
        return { error: `${field} must be a non-empty string.` };
      }

      data[field] = value.trim();
    }
  }

  if ("thumbnail_url" in body) {
    const parsed = parseOptionalString(body.thumbnail_url);
    if (parsed === undefined) {
      return { error: "thumbnail_url must be a string, null, or omitted." };
    }
    data.thumbnail_url = parsed;
  }

  if ("preview_url" in body) {
    const parsed = parseOptionalString(body.preview_url);
    if (parsed === undefined) {
      return { error: "preview_url must be a string, null, or omitted." };
    }
    data.preview_url = parsed;
  }

  if (Object.keys(data).length === 0) {
    return { error: "At least one field must be provided." };
  }

  return { data };
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
    const existingTemplate = await adminGetTemplate(id);

    if (!existingTemplate) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const body = await request.json();
    const { data, error } = validateTemplateUpdate(body);

    if (error || !data) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const template = await adminUpdateTemplate(id, data);
    return NextResponse.json({ template });
  } catch (error) {
    console.error("Admin template update error:", error);
    return NextResponse.json(
      { error: "Failed to update template." },
      { status: 500 }
    );
  }
}
