"use client";

import { useEffect, useState } from "react";

type PaymentStatus = "pending" | "paid" | "failed" | "expired" | "refunded";

interface PaymentItem {
  id: string;
  amount: number;
  status: PaymentStatus;
  created_at: string;
  xendit_invoice_url: string | null;
}

interface PaymentsPayload {
  payments?: PaymentItem[];
}

function getStatusMeta(status: PaymentStatus) {
  switch (status) {
    case "paid":
      return {
        label: "Paid",
        classes: "bg-green-100 text-green-700",
        hint: "Premium aktif",
      };
    case "pending":
      return {
        label: "Pending",
        classes: "bg-amber-100 text-amber-700",
        hint: "Menunggu pembayaran",
      };
    case "failed":
      return {
        label: "Failed",
        classes: "bg-red-100 text-red-700",
        hint: "Pembayaran gagal",
      };
    case "expired":
      return {
        label: "Expired",
        classes: "bg-gray-200 text-gray-700",
        hint: "Invoice kadaluarsa",
      };
    default:
      return {
        label: "Refunded",
        classes: "bg-slate-100 text-slate-700",
        hint: "Dana dikembalikan",
      };
  }
}

export function PaymentStatusCard() {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<PaymentItem[]>([]);

  useEffect(() => {
    let active = true;

    async function loadPayments() {
      setLoading(true);

      try {
        const response = await fetch("/api/payments?limit=5", {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!response.ok) {
          if (active) {
            setPayments([]);
          }
          return;
        }

        const payload = (await response.json().catch(() => null)) as PaymentsPayload | null;

        if (active) {
          setPayments(payload?.payments ?? []);
        }
      } catch {
        if (active) {
          setPayments([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadPayments();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Status Pembayaran</h2>
        <p className="text-sm text-gray-500">Pantau status pending / paid / failed dari transaksi premium Anda.</p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Memuat riwayat pembayaran...</p>
      ) : payments.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada transaksi premium.</p>
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => {
            const meta = getStatusMeta(payment.status);

            return (
              <div key={payment.id} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Rp {new Intl.NumberFormat("id-ID").format(payment.amount)}</p>
                    <p className="text-xs text-gray-500">{new Date(payment.created_at).toLocaleString("id-ID")}</p>
                  </div>
                  <span className={["rounded-full px-2.5 py-1 text-xs font-medium", meta.classes].join(" ")}>
                    {meta.label}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">{meta.hint}</p>
                {payment.status === "pending" && payment.xendit_invoice_url ? (
                  <a
                    href={payment.xendit_invoice_url}
                    className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-medium text-white"
                  >
                    Lanjutkan Pembayaran
                  </a>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
