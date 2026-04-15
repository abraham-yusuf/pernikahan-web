import type { MetadataRoute } from "next";
import { createSupabaseAdminClient } from "@/lib/supabase";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://nikah-digital.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/auth/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  let invitationPages: MetadataRoute.Sitemap = [];

  try {
    const supabase = createSupabaseAdminClient();
    const { data } = await supabase
      .from("invitations")
      .select("slug, updated_at")
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .limit(1000);

    if (data) {
      invitationPages = data.map((invitation) => ({
        url: `${BASE_URL}/u/${invitation.slug}`,
        lastModified: new Date(invitation.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {}

  return [...staticPages, ...invitationPages];
}
