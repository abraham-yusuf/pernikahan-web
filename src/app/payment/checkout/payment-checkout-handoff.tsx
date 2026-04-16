"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CheckoutResponse = {
  invoiceUrl?: string;
  error?: string;
};

export function PaymentCheckoutHandoff({
  invitationId,
}: {
  invitationId?: string;
}) {
  const [phase, setPhase] = useState<"loading" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const normalizedInvitationId = useMemo(() => {
    if (!invitationId) {
      return "";
    }

    return invitationId.trim();
  }, [invitationId]);

  useEffect(() => {
    let isCancelled = false;

    async function startCheckout() {
      if (!normalizedInvitationId) {
        setPhase("error");
        setErrorMessage(
          "Invitation ID tidak ditemukan. Silakan pilih undangan dari dashboard terlebih dahulu."
        );
        return;
      }

      try {
        const response = await fetch("/api/payments/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify({ invitationId: normalizedInvitationId }),
        });

        const payload = (await response.json().catch(() => null)) as
          | CheckoutResponse
          | null;

        if (isCancelled) {
          return;
        }

        if (response.status === 401) {
          window.location.href = "/auth/login";
          return;
        }

        if (!response.ok || !payload?.invoiceUrl) {
          setPhase("error");
          setErrorMessage(payload?.error ?? "Gagal membuat checkout pembayaran.");
          return;
        }

        window.location.href = payload.invoiceUrl;
      } catch {
        if (!isCancelled) {
          setPhase("error");
          setErrorMessage("Terjadi gangguan saat membuat checkout pembayaran.");
        }
      }
    }

    void startCheckout();

    return () => {
      isCancelled = true;
    };
  }, [normalizedInvitationId]);

  if (phase === "error") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Checkout Premium Gagal</h1>
        <p className="mt-3 text-sm text-gray-600">
          {errorMessage ?? "Silakan coba kembali beberapa saat lagi."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white"
          >
            Kembali ke Dashboard
          </Link>
          <Link
            href="/dashboard/settings"
            className="rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700"
          >
            Buka Pengaturan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Menyiapkan Checkout</h1>
      <p className="mt-3 text-sm text-gray-600">
        Mohon tunggu, Anda akan diarahkan otomatis ke halaman pembayaran Xendit.
      </p>
      <div className="mt-6 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
    </div>
  );
}
