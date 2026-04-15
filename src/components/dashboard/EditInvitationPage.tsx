"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { templates } from "@/lib/data";
import { EmptyInvitations } from "@/components/dashboard/EmptyInvitations";
import {
  InvitationForm,
  type InvitationFormValues,
} from "@/components/dashboard/InvitationForm";

type InvitationStatus = "draft" | "published" | "archived";

interface InvitationDetail {
  $id: string;
  title: string;
  bride: string;
  groom: string;
  brideParents: string;
  groomParents: string;
  akadDate: string;
  akadTime: string;
  akadLocation: string;
  resepsiDate: string;
  resepsiTime: string;
  resepsiLocation: string;
  mapUrl?: string;
  story?: string;
  slug: string;
  status: InvitationStatus;
  templateId: string;
}

interface InvitationPayload {
  invitation?: InvitationDetail;
  error?: string;
}

function getStatusClasses(status: InvitationStatus) {
  if (status === "published") {
    return "bg-green-100 text-green-700";
  }

  if (status === "archived") {
    return "bg-red-100 text-red-700";
  }

  return "bg-gray-100 text-gray-700";
}

function getStatusLabel(status: InvitationStatus) {
  if (status === "published") {
    return "Published";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

export function EditInvitationPage({ invitationId }: { invitationId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [disconnected, setDisconnected] = useState(false);
  const [invitation, setInvitation] = useState<InvitationDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadInvitation() {
      setLoading(true);
      setDisconnected(false);
      setError(null);

      try {
        const response = await fetch(
          `/api/invitations/${encodeURIComponent(invitationId)}`,
          {
            cache: "no-store",
            credentials: "same-origin",
          }
        );
        const payload = (await response.json().catch(() => null)) as
          | InvitationPayload
          | null;

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

  const selectedTemplate = useMemo(() => {
    if (!invitation) {
      return null;
    }

    const template = templates.find((item) => item.id === invitation.templateId);

    return {
      name: template?.name ?? invitation.templateId,
      description: template?.description ?? "",
    };
  }, [invitation]);

  async function updateInvitation(body: InvitationFormValues | { status: InvitationStatus }) {
    const response = await fetch(`/api/invitations/${encodeURIComponent(invitationId)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const payload = (await response.json().catch(() => null)) as
      | InvitationPayload
      | null;

    if (response.status === 503) {
      setError("Database belum dikonfigurasi.");
      return null;
    }

    if (!response.ok || !payload?.invitation) {
      setError(payload?.error ?? "Gagal memperbarui undangan.");
      return null;
    }

    setInvitation(payload.invitation);
    setError(null);
    return payload.invitation;
  }

  async function handleSave(values: InvitationFormValues) {
    setSaving(true);
    try {
      await updateInvitation(values);
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    setPublishing(true);
    try {
      await updateInvitation({ status: "published" });
    } finally {
      setPublishing(false);
    }
  }

  async function handleArchive() {
    setArchiving(true);
    try {
      await updateInvitation({ status: "archived" });
    } finally {
      setArchiving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Hapus undangan ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/invitations/${encodeURIComponent(invitationId)}`, {
        method: "DELETE",
      });
      const payload = (await response.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;

      if (response.status === 503) {
        setError("Database belum dikonfigurasi.");
        return;
      }

      if (!response.ok || !payload?.success) {
        setError(payload?.error ?? "Gagal menghapus undangan.");
        return;
      }

      router.push("/dashboard/invitations");
      router.refresh();
    } catch {
      setError("Gagal menghapus undangan.");
    } finally {
      setDeleting(false);
    }
  }

  async function handleCopyPublicUrl() {
    if (!invitation?.slug) {
      return;
    }

    const publicUrl = `${window.location.origin}/u/${invitation.slug}`;

    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopyMessage("Tautan publik berhasil disalin.");
      window.setTimeout(() => setCopyMessage(null), 2000);
    } catch {
      setError("Gagal menyalin tautan publik.");
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-56 animate-pulse rounded bg-gray-100" />
        <div className="h-32 animate-pulse rounded-2xl border border-gray-100 bg-white" />
        <div className="h-[560px] animate-pulse rounded-2xl border border-gray-100 bg-white" />
      </div>
    );
  }

  if (disconnected) {
    return (
      <EmptyInvitations
        title="Hubungkan database Appwrite Anda"
        description="Hubungkan database Appwrite Anda untuk mulai membuat undangan. Halaman edit tetap dapat diakses dalam mode navigasi tanpa koneksi database."
        ctaHref="/dashboard/invitations"
        ctaLabel="Kembali ke daftar undangan"
      />
    );
  }

  if (!invitation) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900">Undangan tidak ditemukan</h1>
        <p className="mt-2 text-sm text-gray-500">{error ?? "Data undangan tidak tersedia."}</p>
        <Link
          href="/dashboard/invitations"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Kembali ke daftar undangan
        </Link>
      </div>
    );
  }

  const publicPath = `/u/${invitation.slug}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Edit Undangan</h1>
            <span
              className={[
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                getStatusClasses(invitation.status),
              ].join(" ")}
            >
              {getStatusLabel(invitation.status)}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {invitation.title}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/dashboard/rsvp/${invitation.$id}`}
            className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Lihat RSVP
          </Link>
          {invitation.status === "draft" ? (
            <button
              type="button"
              onClick={() => void handlePublish()}
              disabled={publishing || saving || archiving || deleting}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {publishing ? "Mempublikasikan..." : "Publikasikan"}
            </button>
          ) : null}
          {invitation.status === "published" ? (
            <button
              type="button"
              onClick={() => void handleArchive()}
              disabled={publishing || saving || archiving || deleting}
              className="inline-flex items-center justify-center rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {archiving ? "Mengarsipkan..." : "Arsipkan"}
            </button>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <p className="text-sm font-medium text-gray-500">Template digunakan</p>
        <h2 className="mt-1 text-lg font-semibold text-gray-900">
          {selectedTemplate?.name ?? invitation.templateId}
        </h2>
        {selectedTemplate?.description ? (
          <p className="mt-2 text-sm text-gray-500">{selectedTemplate.description}</p>
        ) : null}
      </div>

      {invitation.status === "published" ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">URL publik</p>
              <p className="mt-1 text-sm text-green-900">{publicPath}</p>
              {copyMessage ? (
                <p className="mt-2 text-xs font-medium text-green-700">{copyMessage}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => void handleCopyPublicUrl()}
              className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
            >
              Salin Link
            </button>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <InvitationForm
        defaultValues={{
          title: invitation.title,
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
        }}
        onSubmit={handleSave}
        submitLabel="Simpan Perubahan"
        submittingLabel="Menyimpan perubahan..."
        disabled={publishing || archiving || deleting}
      />

      <div className="rounded-2xl border border-red-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Hapus undangan</h2>
        <p className="mt-1 text-sm text-gray-500">
          Gunakan tindakan ini jika Anda tidak lagi membutuhkan undangan ini.
        </p>
        <button
          type="button"
          onClick={() => void handleDelete()}
          disabled={saving || publishing || archiving || deleting}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {deleting ? "Menghapus undangan..." : "Hapus Undangan"}
        </button>
      </div>
    </div>
  );
}
