"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { templates } from "@/lib/data";
import { EmptyInvitations } from "@/components/dashboard/EmptyInvitations";

interface InvitationItem {
  id: string;
  title: string;
  template_id: string;
  status: "draft" | "published" | "archived";
  created_at?: string;
}

interface InvitationsPayload {
  invitations?: InvitationItem[];
}

const templateNameMap = new Map(templates.map((template) => [template.id, template.name]));
const dateFormatter = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

function getStatusClasses(status: InvitationItem["status"]) {
  if (status === "published") {
    return "bg-green-100 text-green-700";
  }

  if (status === "archived") {
    return "bg-red-100 text-red-700";
  }

  return "bg-gray-100 text-gray-700";
}

function getStatusLabel(status: InvitationItem["status"]) {
  if (status === "published") {
    return "Published";
  }

  if (status === "archived") {
    return "Archived";
  }

  return "Draft";
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? value : dateFormatter.format(timestamp);
}

export function DashboardRecentInvitations() {
  const [loading, setLoading] = useState(true);
  const [disconnected, setDisconnected] = useState(false);
  const [invitations, setInvitations] = useState<InvitationItem[]>([]);

  useEffect(() => {
    let active = true;

    async function loadInvitations() {
      setLoading(true);
      setDisconnected(false);

      try {
        const response = await fetch("/api/invitations?limit=5", {
          cache: "no-store",
          credentials: "same-origin",
        });
        const payload = (await response.json().catch(() => null)) as
          | InvitationsPayload
          | null;

        if (!active) {
          return;
        }

        if (response.status === 503) {
          setDisconnected(true);
          setInvitations([]);
          return;
        }

        if (!response.ok) {
          setInvitations([]);
          return;
        }

        setInvitations(payload?.invitations ?? []);
      } catch {
        if (active) {
          setInvitations([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadInvitations();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-40 rounded bg-gray-100" />
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="rounded-xl border border-gray-100 p-4">
              <div className="h-4 w-1/3 rounded bg-gray-100" />
              <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (disconnected || invitations.length === 0) {
    return (
      <EmptyInvitations
        title="Buat Undangan Pertama Anda"
        description={
          disconnected
            ? "Koneksi database belum tersedia. Anda tetap bisa menelusuri template dan alur dashboard saat ini."
            : "Pilih template, sesuaikan detail acara, lalu bagikan undangan digital Anda ke seluruh tamu."
        }
        ctaHref="/#templates"
        ctaLabel="Pilih Template"
        compact
      />
    );
  }

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Undangan terbaru</h2>
          <p className="mt-1 text-sm text-gray-500">
            Lihat draft dan undangan yang baru saja Anda perbarui.
          </p>
        </div>
        <Link
          href="/dashboard/invitations"
          className="text-sm font-medium text-primary transition-colors hover:text-primary-dark"
        >
          Lihat semua
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {invitations.map((invitation) => (
          <div
            key={invitation.id}
            className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-gray-900">{invitation.title}</p>
              <p className="mt-1 text-sm text-gray-500">
                {templateNameMap.get(invitation.template_id) ?? invitation.template_id} · {formatDate(invitation.created_at)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={[
                  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                  getStatusClasses(invitation.status),
                ].join(" ")}
              >
                {getStatusLabel(invitation.status)}
              </span>
              <Link
                href={`/dashboard/invitations/${invitation.id}`}
                className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
