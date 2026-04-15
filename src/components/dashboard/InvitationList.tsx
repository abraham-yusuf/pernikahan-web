"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { templates } from "@/lib/data";
import { EmptyInvitations } from "@/components/dashboard/EmptyInvitations";

interface InvitationItem {
  $id: string;
  title: string;
  bride: string;
  groom: string;
  templateId: string;
  status: "draft" | "published" | "archived";
  createdAt?: string;
  $createdAt?: string;
}

interface InvitationsPayload {
  invitations?: InvitationItem[];
  error?: string;
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

function InvitationSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6">
      <div className="h-5 w-1/2 rounded bg-gray-100" />
      <div className="mt-3 h-4 w-2/3 rounded bg-gray-100" />
      <div className="mt-6 h-20 rounded-xl bg-gray-50" />
      <div className="mt-6 flex gap-3">
        <div className="h-10 w-28 rounded-lg bg-gray-100" />
        <div className="h-10 w-28 rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}

export function InvitationList() {
  const [loading, setLoading] = useState(true);
  const [disconnected, setDisconnected] = useState(false);
  const [invitations, setInvitations] = useState<InvitationItem[]>([]);

  useEffect(() => {
    let active = true;

    async function loadInvitations() {
      setLoading(true);
      setDisconnected(false);

      try {
        const response = await fetch("/api/invitations", {
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
      <div className="grid gap-4 xl:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <InvitationSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (disconnected) {
    return (
      <EmptyInvitations
        title="Hubungkan database Appwrite Anda"
        description="Hubungkan database Appwrite Anda untuk mulai membuat undangan. Dashboard tetap dapat dinavigasi penuh dalam mode tanpa koneksi ini."
        ctaHref="/#templates"
        ctaLabel="Lihat Template"
      />
    );
  }

  if (invitations.length === 0) {
    return (
      <EmptyInvitations
        title="Belum ada undangan"
        description="Buat undangan pertama Anda untuk mulai mengelola tamu, membagikan link publik, dan memantau RSVP secara real-time."
        ctaHref="/dashboard/invitations/new"
        ctaLabel="Buat Undangan Pertama"
      />
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {invitations.map((invitation) => (
        <article
          key={invitation.$id}
          className="rounded-2xl border border-gray-100 bg-white p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{invitation.title}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {invitation.bride} &amp; {invitation.groom}
              </p>
            </div>
            <span
              className={[
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                getStatusClasses(invitation.status),
              ].join(" ")}
            >
              {getStatusLabel(invitation.status)}
            </span>
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <dl className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-gray-500">Template</dt>
                <dd className="font-medium text-gray-900">
                  {templateNameMap.get(invitation.templateId) ?? invitation.templateId}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-gray-500">Dibuat</dt>
                <dd className="text-gray-700">
                  {formatDate(invitation.createdAt ?? invitation.$createdAt)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/dashboard/invitations/${invitation.$id}`}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Edit
            </Link>
            <Link
              href={`/dashboard/rsvp/${invitation.$id}`}
              className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Lihat RSVP
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
