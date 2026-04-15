import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInvitationBySlug } from "@/lib/db";
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

function mapInvitationToWeddingEvent(
  invitation: NonNullable<Awaited<ReturnType<typeof getInvitationBySlug>>>
): WeddingEvent {
  return {
    bride: invitation.bride,
    groom: invitation.groom,
    brideParents: invitation.bride_parents,
    groomParents: invitation.groom_parents,
    akadDate: invitation.akad_date,
    akadTime: invitation.akad_time,
    akadLocation: invitation.akad_location,
    resepsiDate: invitation.resepsi_date,
    resepsiTime: invitation.resepsi_time,
    resepsiLocation: invitation.resepsi_location,
    mapUrl: invitation.map_url ?? "",
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
  const description = `Anda diundang ke pernikahan ${invitation.bride} & ${invitation.groom}. ${invitation.akad_date} di ${invitation.akad_location}.`;

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

  const TemplateComponent = templateComponents[invitation.template_id];

  if (!TemplateComponent) {
    notFound();
  }

  const event = mapInvitationToWeddingEvent(invitation);

  return <TemplateComponent event={event} invitationId={invitation.id} />;
}
