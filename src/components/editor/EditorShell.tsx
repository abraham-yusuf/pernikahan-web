"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { WeddingEvent } from "@/lib/data";
import { EmptyInvitations } from "@/components/dashboard/EmptyInvitations";
import { EditorForm, type EditorState } from "@/components/editor/EditorForm";
import { EditorPreview } from "@/components/editor/EditorPreview";
import { EditorToolbar } from "@/components/editor/EditorToolbar";

type InvitationStatus = "draft" | "published" | "archived";
type MobileTab = "edit" | "preview";

interface InvitationDetail {
  id: string;
  title: string;
  slug: string;
  status: InvitationStatus;
  template_id: string;
  bride: string;
  groom: string;
  bride_parents: string;
  groom_parents: string;
  akad_date: string;
  akad_time: string;
  akad_location: string;
  resepsi_date: string;
  resepsi_time: string;
  resepsi_location: string;
  map_url?: string | null;
  story?: string | null;
}

interface InvitationPayload {
  invitation?: InvitationDetail;
  error?: string;
}

const emptyEditorState: EditorState = {
  bride: "",
  groom: "",
  brideParents: "",
  groomParents: "",
  akadDate: "",
  akadTime: "",
  akadLocation: "",
  resepsiDate: "",
  resepsiTime: "",
  resepsiLocation: "",
  mapUrl: "",
  story: "",
};

function getEditorState(invitation: InvitationDetail): EditorState {
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

function LoadingSkeleton() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
          <div className="h-10 w-48 animate-pulse rounded-xl bg-gray-100" />
          <div className="space-y-2 lg:justify-self-center">
            <div className="mx-auto h-3 w-24 animate-pulse rounded bg-gray-100" />
            <div className="mx-auto h-5 w-56 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="flex justify-start gap-2 lg:justify-end">
            <div className="h-9 w-16 animate-pulse rounded-full bg-gray-100" />
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" />
            <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
      <div className="flex-1 lg:grid lg:min-h-0 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="space-y-4 border-r border-gray-200 bg-white p-4 sm:p-6 lg:overflow-y-auto lg:p-6">
          <div className="h-16 animate-pulse rounded-2xl bg-gray-100" />
          <div className="h-44 animate-pulse rounded-2xl bg-gray-100" />
          <div className="h-44 animate-pulse rounded-2xl bg-gray-100" />
          <div className="h-44 animate-pulse rounded-2xl bg-gray-100" />
        </div>
        <div className="bg-gray-50 p-4 sm:p-6 lg:min-h-0 lg:overflow-hidden lg:p-8">
          <div className="mx-auto h-[640px] max-w-lg animate-pulse rounded-[2rem] border border-gray-200 bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export function EditorShell({ invitationId }: { invitationId: string }) {
  const [loading, setLoading] = useState(true);
  const [disconnected, setDisconnected] = useState(false);
  const [invitation, setInvitation] = useState<InvitationDetail | null>(null);
  const [editorState, setEditorState] = useState<EditorState>(emptyEditorState);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>("edit");

  useEffect(() => {
    let active = true;

    async function loadInvitation() {
      setLoading(true);
      setDisconnected(false);
      setError(null);
      setSaveError(null);

      try {
        const response = await fetch(`/api/invitations/${encodeURIComponent(invitationId)}`, {
          cache: "no-store",
          credentials: "same-origin",
        });
        const payload = (await response.json().catch(() => null)) as InvitationPayload | null;

        if (!active) {
          return;
        }

        if (response.status === 503) {
          setDisconnected(true);
          setInvitation(null);
          return;
        }

        if (response.status === 404) {
          setError("Undangan tidak ditemukan.");
          setInvitation(null);
          return;
        }

        if (!response.ok || !payload?.invitation) {
          setError(payload?.error ?? "Gagal memuat undangan.");
          setInvitation(null);
          return;
        }

        setInvitation(payload.invitation);
        setEditorState(getEditorState(payload.invitation));
      } catch {
        if (active) {
          setInvitation(null);
          setError("Gagal memuat undangan.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadInvitation();

    return () => {
      active = false;
    };
  }, [invitationId]);

  const previewEvent = useMemo<WeddingEvent>(() => ({ ...editorState }), [editorState]);

  function updateField(key: keyof EditorState, value: string) {
    setEditorState((current) => ({ ...current, [key]: value }));
  }

  async function patchInvitation(body: EditorState & { status?: InvitationStatus }) {
    const response = await fetch(`/api/invitations/${encodeURIComponent(invitationId)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const payload = (await response.json().catch(() => null)) as InvitationPayload | null;

    if (response.status === 503) {
      setDisconnected(true);
      setSaveError(null);
      return null;
    }

    if (response.status === 404) {
      setSaveError("Undangan tidak ditemukan.");
      return null;
    }

    if (!response.ok || !payload?.invitation) {
      setSaveError(payload?.error ?? "Gagal menyimpan perubahan.");
      return null;
    }

    setInvitation(payload.invitation);
    setEditorState(getEditorState(payload.invitation));
    setSaveError(null);
    setError(null);
    return payload.invitation;
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);

    try {
      await patchInvitation(editorState);
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    setSaving(true);
    setSaveError(null);

    try {
      await patchInvitation({
        ...editorState,
        status: "published",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (disconnected) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <EmptyInvitations
            title="Koneksi database belum tersedia"
            description="Sambungkan database untuk mulai mengedit undangan secara visual. Halaman editor tetap tersedia sebagai navigasi saat database belum tersedia."
            ctaHref="/dashboard/invitations"
            ctaLabel="Kembali ke daftar undangan"
          />
        </div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold text-gray-900">Undangan tidak ditemukan</h1>
          <p className="mt-2 text-sm text-gray-500">{error ?? "Data undangan tidak tersedia."}</p>
          <Link
            href="/dashboard/invitations"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Kembali ke daftar undangan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <EditorToolbar
        title={invitation.title}
        status={invitation.status}
        saving={saving}
        onSave={() => void handleSave()}
        onPublish={() => void handlePublish()}
      />

      <div className="border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
        <div className="grid grid-cols-2 rounded-xl bg-gray-100 p-1">
          {(["edit", "preview"] as const).map((tab) => {
            const active = mobileTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setMobileTab(tab)}
                className={[
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  active ? "bg-white text-gray-900 shadow-sm" : "text-gray-500",
                ].join(" ")}
              >
                {tab === "edit" ? "Edit" : "Preview"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 lg:grid lg:min-h-0 lg:grid-cols-[420px_minmax(0,1fr)]">
        <aside
          className={[
            "border-gray-200 bg-white lg:overflow-y-auto",
            mobileTab === "preview" ? "hidden lg:block" : "block",
            "lg:border-r",
          ].join(" ")}
        >
          <div className="space-y-4 p-4 sm:p-6">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <p className="text-sm font-medium text-gray-900">Edit konten undangan</p>
              <p className="mt-1 text-sm text-gray-500">
                Perubahan pada form akan langsung tampil di preview template.
              </p>
            </div>

            {saveError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {saveError}
              </div>
            ) : null}

            <EditorForm values={editorState} onChange={updateField} disabled={saving} />
          </div>
        </aside>

        <section
          className={[
            "min-h-[calc(100vh-9.5rem)] bg-gray-50 lg:min-h-0",
            mobileTab === "edit" ? "hidden lg:block" : "block",
          ].join(" ")}
        >
          <EditorPreview templateId={invitation.template_id} event={previewEvent} />
        </section>
      </div>
    </div>
  );
}
