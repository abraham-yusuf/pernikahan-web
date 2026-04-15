"use client";

import Link from "next/link";

type InvitationStatus = "draft" | "published" | "archived";

interface EditorToolbarProps {
  title: string;
  status: InvitationStatus;
  saving: boolean;
  onSave: () => void;
  onPublish: () => void;
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

export function EditorToolbar({
  title,
  status,
  saving,
  onSave,
  onPublish,
}: EditorToolbarProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:px-8">
        <div className="flex items-center gap-3 lg:justify-self-start">
          <Link
            href="/dashboard/invitations"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <span aria-hidden="true">←</span>
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>

        <div className="min-w-0 lg:text-center">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Visual Editor
          </p>
          <p className="mt-1 truncate text-base font-semibold text-gray-900 sm:text-lg">
            {title}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-self-end">
          <span
            className={[
              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
              getStatusClasses(status),
            ].join(" ")}
          >
            {getStatusLabel(status)}
          </span>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
          {status === "draft" ? (
            <button
              type="button"
              onClick={onPublish}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              Publikasikan
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
