"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PricingCardsProps {
  invitationId?: string;
}

const PREMIUM_PRICE = "Rp 99.000";

export function PricingCards({ invitationId }: PricingCardsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (!invitationId) {
      router.push("/dashboard/invitations");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal membuat checkout.");
        return;
      }

      window.location.href = data.invoiceUrl;
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Gratis</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">Rp 0</p>
        <ul className="mt-6 space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>1 template dasar</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>RSVP management</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-300">✗</span>
            <span className="text-gray-400">Watermark tetap ada</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gray-300">✗</span>
            <span className="text-gray-400">Template premium terkunci</span>
          </li>
        </ul>
      </div>

      <div className="relative rounded-2xl border-2 border-primary bg-white p-6">
        <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
          Populer
        </span>
        <h3 className="text-lg font-semibold text-gray-900">Premium</h3>
        <p className="mt-2 text-3xl font-bold text-gray-900">{PREMIUM_PRICE}</p>
        <p className="text-sm text-gray-500">per undangan</p>
        <ul className="mt-6 space-y-3 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Semua template premium</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>RSVP management</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Tanpa watermark</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Custom warna & foto</span>
          </li>
        </ul>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Upgrade ke Premium"}
        </button>
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        <p className="mt-3 text-center text-xs text-gray-400">
          Bayar via Bank Transfer, E-Wallet, QRIS
        </p>
      </div>
    </div>
  );
}
