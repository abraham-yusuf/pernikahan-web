"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PaymentStatus } from "@/lib/supabase/types";

type PaymentStatusPayload = {
  payment?: {
    status: PaymentStatus;
    invitation_id: string | null;
  };
  error?: string;
};

function getStatusLabel(status?: PaymentStatus): string {
  switch (status) {
    case "paid":
      return "Pembayaran terkonfirmasi";
    case "failed":
      return "Pembayaran gagal";
    case "expired":
      return "Pembayaran kedaluwarsa";
    case "refunded":
      return "Pembayaran direfund";
    case "pending":
    default:
      return "Pembayaran sedang diproses";
  }
}

export function PaymentSuccessStatus({ externalId }: { externalId?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [invitationId, setInvitationId] = useState<string | null>(null);
  const pollingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const normalizedExternalId = useMemo(() => {
    if (!externalId) {
      return "";
    }

    return externalId.trim();
  }, [externalId]);

  useEffect(() => {
    if (!normalizedExternalId) {
      return;
    }

    let cancelled = false;

    async function fetchStatus() {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/payments?external_id=${encodeURIComponent(normalizedExternalId)}`,
          {
            cache: "no-store",
            credentials: "same-origin",
          }
        );

        const payload = (await response.json().catch(() => null)) as
          | PaymentStatusPayload
          | null;

        if (cancelled) {
          return;
        }

        if (response.status === 401) {
          setError("Sesi login berakhir. Silakan login ulang untuk melihat status pembayaran.");
          return;
        }

        if (!response.ok || !payload?.payment) {
          setError(payload?.error ?? "Status pembayaran belum tersedia.");
          return;
        }

        setError(null);
        setStatus(payload.payment.status);
        setInvitationId(payload.payment.invitation_id);

        if (payload.payment.status !== "pending" && pollingTimerRef.current) {
          window.clearInterval(pollingTimerRef.current);
          pollingTimerRef.current = null;
        }
      } catch {
        if (!cancelled) {
          setError("Gagal memuat status pembayaran.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchStatus();
    pollingTimerRef.current = window.setInterval(() => {
      void fetchStatus();
    }, 6000);

    return () => {
      cancelled = true;
      if (pollingTimerRef.current) {
        window.clearInterval(pollingTimerRef.current);
        pollingTimerRef.current = null;
      }
    };
  }, [normalizedExternalId]);

  const currentStatus = status ?? "pending";
  const invitationEditorHref = invitationId ? `/editor/${invitationId}` : "/dashboard/invitations";

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-green-700">Pembayaran Berhasil</h1>
      <p className="mt-3 text-sm text-gray-600">
        Terima kasih! Kami sedang memastikan status pembayaran Anda sinkron dengan sistem.
      </p>

      {normalizedExternalId ? (
        <p className="mt-2 text-xs text-gray-500">External ID: {normalizedExternalId}</p>
      ) : (
        <p className="mt-2 text-xs text-amber-600">
          External ID tidak ditemukan di URL, status hanya ditampilkan sebagai perkiraan.
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 text-left">
        <p className="text-xs uppercase tracking-wide text-gray-500">Status Pembayaran</p>
        <p className="mt-1 text-lg font-semibold text-gray-900">{getStatusLabel(currentStatus)}</p>
        {loading ? (
          <p className="mt-2 text-xs text-gray-500">Mengecek status terbaru...</p>
        ) : null}
        {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white"
        >
          Kembali ke Dashboard
        </Link>
        <Link
          href={invitationEditorHref}
          className="rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700"
        >
          Ke Invitation Editor
        </Link>
      </div>
    </div>
  );
}
