"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  invitationId?: string;
  className?: string;
  label?: string;
}

interface InvitationListPayload {
  invitations?: { id: string }[];
}

export function StartPremiumCheckoutButton({
  invitationId,
  className,
  label = "Pilih Premium",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function resolveInvitationId(): Promise<string | null> {
    if (invitationId) {
      return invitationId;
    }

    const response = await fetch("/api/invitations?limit=1", {
      cache: "no-store",
      credentials: "same-origin",
    });

    if (response.status === 401) {
      router.push("/auth/login");
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json().catch(() => null)) as
      | InvitationListPayload
      | null;

    const firstInvitationId = payload?.invitations?.[0]?.id;

    if (!firstInvitationId) {
      router.push("/dashboard/invitations/new");
      return null;
    }

    return firstInvitationId;
  }

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const selectedInvitationId = await resolveInvitationId();

      if (!selectedInvitationId) {
        return;
      }

      const response = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ invitationId: selectedInvitationId }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { invoiceUrl?: string; error?: string }
        | null;

      if (response.status === 401) {
        router.push("/auth/login");
        return;
      }

      if (!response.ok || !payload?.invoiceUrl) {
        setError(payload?.error ?? "Gagal membuat checkout.");
        return;
      }

      window.location.href = payload.invoiceUrl;
    } catch {
      setError("Gagal membuat checkout.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => void handleCheckout()}
        disabled={loading}
        className={
          className ??
          "w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {loading ? "Memproses checkout..." : label}
      </button>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
