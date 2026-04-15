import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInvitationBySlug } from "@/lib/appwrite-db";
import type { WeddingEvent } from "@/lib/data";
import { templateComponents } from "@/lib/template-registry";

type Params = Promise<{ slug: string }>;

async function getPublishedInvitation(slug: string) {
  try {
    const invitation = await getInvitationBySlug(slug);

    if (!invitation || invitation.status !== "published") {
      return null;
    }

    return invitation;
  } catch {
    return null;
  }
}

function mapInvitationToWeddingEvent(invitation: NonNullable<Awaited<ReturnType<typeof getInvitationBySlug>>>): WeddingEvent {
  return {
    bride: invitation.bride,
    groom: invitation.groom,
    brideParents: invitation.brideParents,
    groomParents: invitation.groomParents,
    akadDate: invitation.akadDate,
    akadTime: invitation.akadTime,
    akadLocation: invitation.akadLocation,
    resepsiDate: invitation.resepsiDate,
    resepsiTime: invitation.resepsiTime,
    resepsiLocation: invitation.resepsiLocation,
    mapUrl: invitation.mapUrl ?? "",
    story: invitation.story ?? "",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const invitation = await getPublishedInvitation(slug);

  if (!invitation) {
    return { title: "Undangan Tidak Ditemukan" };
  }

  const title = `${invitation.bride} & ${invitation.groom} - Undangan Pernikahan`;
  const description = `Anda diundang ke pernikahan ${invitation.bride} & ${invitation.groom}. ${invitation.akadDate} di ${invitation.akadLocation}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function PublicInvitationPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const invitation = await getPublishedInvitation(slug);

  if (!invitation) {
    notFound();
  }

  const TemplateComponent = templateComponents[invitation.templateId];

  if (!TemplateComponent) {
    notFound();
  }

  const event = mapInvitationToWeddingEvent(invitation);

  return <TemplateComponent event={event} invitationId={invitation.$id} />;
}
