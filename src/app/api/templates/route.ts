import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { TemplateTierAccess, UserTier } from "@/lib/supabase/types";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let userTier: UserTier = "free";

    if (user) {
      const { data: profile } = await supabase
        .from("users")
        .select("tier")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      userTier = profile?.tier ?? "free";
    }

    const { data: templates, error } = await supabase
      .from("templates")
      .select(
        "id, template_key, name, description, category, region, preview_color, accent_color, bg_pattern, tier_access, status, sort_order, is_featured, thumbnail_url, preview_url"
      )
      .eq("status", "active")
      .in("tier_access", ["free", "premium"] satisfies TemplateTierAccess[])
      .order("sort_order", { ascending: true });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      userTier,
      templates: (templates ?? []).map((template) => ({
        id: template.template_key,
        slug: template.template_key,
        dbId: template.id,
        name: template.name,
        description: template.description,
        category: template.category,
        region: template.region,
        previewColor: template.preview_color,
        accentColor: template.accent_color,
        bgPattern: template.bg_pattern,
        tierAccess: template.tier_access,
        status: template.status,
        sortOrder: template.sort_order,
        isFeatured: template.is_featured,
        thumbnailUrl: template.thumbnail_url,
        previewUrl: template.preview_url,
        locked: userTier === "free" && template.tier_access === "premium",
      })),
    });
  } catch (error) {
    console.error("Templates list error:", error);
    return NextResponse.json(
      { error: "Failed to load templates." },
      { status: 500 }
    );
  }
}
