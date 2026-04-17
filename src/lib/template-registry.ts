import type { ComponentType } from "react";
import type { WeddingEvent } from "@/lib/data";
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
import { AdatTorajaTemplate } from "@/components/templates/AdatToraja";

export type TemplateComponentProps = {
  event?: WeddingEvent;
  invitationId?: string;
};
export type TemplateComponent = ComponentType<TemplateComponentProps>;

export const templateComponents: Record<string, TemplateComponent> = {
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
  "adat-toraja": AdatTorajaTemplate,
};

export function getTemplateComponent(
  templateId: string
): TemplateComponent | undefined {
  return templateComponents[templateId];
}
