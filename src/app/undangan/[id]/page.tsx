import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { templateComponents } from "@/lib/template-registry";
import { createSupabaseAdminClient } from "@/lib/supabase";

type Params = Promise<{ id: string }>;

/**
 * Fetch a single template metadata record by canonical template key.
 * Returns null when lookup fails or no matching row exists.
 */
async function getTemplateByKey(templateKey: string) {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("templates")
      .select("template_key, name, description, status")
      .eq("template_key", templateKey)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(
      "Failed to fetch template metadata from database. Template will be unavailable; verify Supabase connectivity and template_key data:",
      error
    );
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const template = await getTemplateByKey(id);

  if (!template || template.status !== "active") {
    return { title: "Template Tidak Ditemukan" };
  }

  return {
    title: `${template.name} - Undangan Pernikahan Digital | NikahDigital`,
    description: template.description,
  };
}

export default async function UndanganPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const template = await getTemplateByKey(id);

  if (!template || template.status !== "active") {
    notFound();
  }

  const TemplateComponent = templateComponents[id];

  if (!TemplateComponent) notFound();

  return <TemplateComponent />;
}
