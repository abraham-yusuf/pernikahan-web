import { EditInvitationPage } from "@/components/dashboard/EditInvitationPage";

type Params = Promise<{ id: string }>;

export default async function InvitationEditRoute({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  return <EditInvitationPage invitationId={id} />;
}
