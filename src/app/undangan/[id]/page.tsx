import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import type { Metadata } from "next";
import { templates } from "@/lib/data";
import { ModernElegantTemplate } from "@/components/templates/ModernElegant";
import { AdatJawaTemplate } from "@/components/templates/AdatJawa";
import { FloralGardenTemplate } from "@/components/templates/FloralGarden";
import { AdatSundaTemplate } from "@/components/templates/AdatSunda";
import { AdatMinangTemplate } from "@/components/templates/AdatMinang";
import { AdatBaliTemplate } from "@/components/templates/AdatBali";
import { AdatBatakTemplate } from "@/components/templates/AdatBatak";
import { AdatBugisMakassarTemplate } from "@/components/templates/AdatBugisMakassar";
import { AdatBetawiTemplate } from "@/components/templates/AdatBetawi";
import { AdatDayakTemplate } from "@/components/templates/AdatDayak";
import { AdatAcehTemplate } from "@/components/templates/AdatAceh";
import { IslamicElegantTemplate } from "@/components/templates/IslamicElegant";
import { RusticNusantaraTemplate } from "@/components/templates/RusticNusantara";

type Params = Promise<{ id: string }>;

const templateComponents: Record<string, ComponentType> = {
  "modern-elegant": ModernElegantTemplate,
  "adat-jawa": AdatJawaTemplate,
  "floral-garden": FloralGardenTemplate,
  "adat-sunda": AdatSundaTemplate,
  "adat-minang": AdatMinangTemplate,
  "adat-bali": AdatBaliTemplate,
  "adat-batak": AdatBatakTemplate,
  "adat-bugis-makassar": AdatBugisMakassarTemplate,
  "adat-betawi": AdatBetawiTemplate,
  "adat-dayak": AdatDayakTemplate,
  "adat-aceh": AdatAcehTemplate,
  "islamic-elegant": IslamicElegantTemplate,
  "rustic-nusantara": RusticNusantaraTemplate,
};

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
