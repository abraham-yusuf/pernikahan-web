"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EmptyInvitations } from "@/components/dashboard/EmptyInvitations";

type Attendance = "hadir" | "tidak_hadir";

interface InvitationPayload {
  invitation?: {
    title: string;
  };
  error?: string;
}

interface RSVPResponseItem {
  id: string;
  guest_name: string;
  attendance: Attendance;
  guest_count: number;
  message?: string | null;
  submitted_at?: string;
  created_at?: string;
}

interface RSVPPayload {
  responses?: RSVPResponseItem[];
  summary?: {
    total: number;
    attending: number;
    notAttending: number;
  };
  error?: string;
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
});

function getAttendanceClasses(attendance: Attendance) {
  return attendance === "hadir"
    ? "bg-green-100 text-green-700"
    : "bg-red-100 text-red-700";
}

function getAttendanceLabel(attendance: Attendance) {
  return attendance === "hadir" ? "Hadir" : "Tidak Hadir";
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? value : dateFormatter.format(timestamp);
}

export function RSVPViewer({ invitationId }: { invitationId: string }) {
  const [loading, setLoading] = useState(true);
  const [disconnected, setDisconnected] = useState(false);
  const [title, setTitle] = useState<string>("RSVP Viewer");
  const [responses, setResponses] = useState<RSVPResponseItem[]>([]);
  const [summary, setSummary] = useState({
    total: 0,
    attending: 0,
    notAttending: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      setDisconnected(false);
      setError(null);

      try {
        const [invitationResponse, rsvpResponse] = await Promise.all([
          fetch(`/api/invitations/${encodeURIComponent(invitationId)}`, {
            cache: "no-store",
            credentials: "same-origin",
          }),
          fetch(`/api/rsvp/${encodeURIComponent(invitationId)}?limit=100`, {
            cache: "no-store",
            credentials: "same-origin",
          }),
        ]);

        const invitationPayload = (await invitationResponse.json().catch(() => null)) as
          | InvitationPayload
          | null;
        const rsvpPayload = (await rsvpResponse.json().catch(() => null)) as
          | RSVPPayload
          | null;

        if (!active) {
          return;
        }

        if (invitationResponse.status === 503 || rsvpResponse.status === 503) {
          setDisconnected(true);
          setResponses([]);
          setSummary({ total: 0, attending: 0, notAttending: 0 });
          return;
        }

        if (invitationResponse.status === 404) {
          setError("Undangan tidak ditemukan.");
          return;
        }

        if (!invitationResponse.ok || !rsvpResponse.ok) {
          setError(invitationPayload?.error ?? rsvpPayload?.error ?? "Gagal memuat RSVP.");
          return;
        }

        setTitle(invitationPayload?.invitation?.title ?? "RSVP Viewer");
        setResponses(rsvpPayload?.responses ?? []);
        setSummary(rsvpPayload?.summary ?? { total: 0, attending: 0, notAttending: 0 });
      } catch {
        if (active) {
          setError("Gagal memuat RSVP.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      active = false;
    };
  }, [invitationId]);

  const totalGuests = useMemo(
    () => responses.reduce((total, response) => total + response.guest_count, 0),
    [responses]
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-100" />
        <div className="grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-2xl border border-gray-100 bg-white"
            />
          ))}
        </div>
        <div className="h-80 animate-pulse rounded-2xl border border-gray-100 bg-white" />
      </div>
    );
  }

  if (disconnected) {
    return (
      <EmptyInvitations
        title="Koneksi database belum tersedia"
        description="Sambungkan database untuk melihat RSVP secara real-time. Dashboard tetap dapat dinavigasi penuh tanpa koneksi database aktif."
        ctaHref="/dashboard/invitations"
        ctaLabel="Kembali ke undangan"
      />
    );
  }

  if (error && responses.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <h1 className="text-xl font-semibold text-gray-900">RSVP tidak tersedia</h1>
        <p className="mt-2 text-sm text-gray-500">{error}</p>
        <Link
          href="/dashboard/invitations"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Kembali ke undangan
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RSVP Viewer</h1>
          <p className="mt-1 text-sm text-gray-500">{title}</p>
        </div>
        <Link
          href={`/dashboard/invitations/${invitationId}`}
          className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          Kembali ke Undangan
        </Link>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total RSVP", value: summary.total, icon: "📨" },
          { label: "Hadir", value: summary.attending, icon: "✅" },
          { label: "Tidak Hadir", value: summary.notAttending, icon: "❌" },
          { label: "Total tamu", value: totalGuests, icon: "👥" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {responses.length === 0 ? (
        <EmptyInvitations
          title="Belum ada tamu yang mengkonfirmasi"
          description="Bagikan link undangan Anda agar tamu bisa mengirimkan konfirmasi kehadiran dan ucapan secara online."
          ctaHref={`/dashboard/invitations/${invitationId}`}
          ctaLabel="Kembali ke undangan"
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Nama tamu</th>
                  <th className="px-5 py-3 font-medium">Kehadiran</th>
                  <th className="px-5 py-3 font-medium">Jumlah tamu</th>
                  <th className="px-5 py-3 font-medium">Ucapan</th>
                  <th className="px-5 py-3 font-medium">Dikirim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {responses.map((response) => (
                  <tr key={response.id}>
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {response.guest_name}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                          getAttendanceClasses(response.attendance),
                        ].join(" ")}
                      >
                        {getAttendanceLabel(response.attendance)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-700">{response.guest_count}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {response.message?.trim() ? response.message : "-"}
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {formatDate(response.submitted_at ?? response.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
