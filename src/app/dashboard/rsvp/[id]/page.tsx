import { RSVPViewer } from "@/components/dashboard/RSVPViewer";

type Params = Promise<{ id: string }>;

export default async function DashboardRsvpPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  return <RSVPViewer invitationId={id} />;
}
