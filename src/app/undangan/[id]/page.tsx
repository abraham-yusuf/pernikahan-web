import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { templates } from "@/lib/data";
import { templateComponents } from "@/lib/template-registry";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);
  if (!template) return { title: "Template Tidak Ditemukan" };
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
  const TemplateComponent = templateComponents[id];
  if (!TemplateComponent) notFound();

  return <TemplateComponent />;
}
