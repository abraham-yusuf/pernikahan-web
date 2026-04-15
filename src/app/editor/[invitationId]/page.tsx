import type { Metadata } from "next";
import { EditorShell } from "@/components/editor/EditorShell";

type Params = Promise<{ invitationId: string }>;

export const metadata: Metadata = {
  title: "Editor Undangan | NikahDigital",
};

export default async function EditorPage({ params }: { params: Params }) {
  const { invitationId } = await params;

  return <EditorShell invitationId={invitationId} />;
}
