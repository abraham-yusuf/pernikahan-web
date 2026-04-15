"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface AdminStats {
  totalUsers: number;
  totalInvitations: number;
  totalRsvps: number;
  totalPayments: number;
  totalRevenue: number;
  totalTemplates: number;
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const initialState = {
  loading: true,
  disconnected: false,
  error: false,
  stats: null as AdminStats | null,
};

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-gray-100" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-20 rounded bg-gray-100" />
          <div className="h-4 w-32 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

export function AdminOverview() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let active = true;

    async function load() {
      setState(initialState);

      try {
        const res = await fetch("/api/admin/stats", {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!active) {
          return;
        }

        if (res.status === 503) {
          setState({
            loading: false,
            disconnected: true,
            error: false,
            stats: null,
          });
          return;
        }

        if (!res.ok) {
          setState({
            loading: false,
            disconnected: false,
            error: true,
            stats: null,
          });
          return;
        }

        const data = (await res.json()) as AdminStats;
        setState({
          loading: false,
          disconnected: false,
          error: false,
          stats: data,
        });
      } catch {
        if (active) {
          setState({
            loading: false,
            disconnected: false,
            error: true,
            stats: null,
          });
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  if (state.loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
              <div className="h-5 w-1/3 rounded bg-gray-100" />
              <div className="mt-4 h-8 w-24 rounded bg-gray-100" />
              <div className="mt-4 h-4 w-28 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    { icon: "👥", label: "Total Pengguna", value: state.stats?.totalUsers ?? null },
    { icon: "💌", label: "Total Undangan", value: state.stats?.totalInvitations ?? null },
    { icon: "✅", label: "Total RSVP", value: state.stats?.totalRsvps ?? null },
    {
      icon: "💰",
      label: "Total Pendapatan",
      value:
        state.stats?.totalRevenue === undefined || state.stats.totalRevenue === null
          ? null
          : currencyFormatter.format(state.stats.totalRevenue),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview Platform</h1>
        <p className="mt-1 text-sm text-gray-500">
          Pantau metrik utama NikahDigital dalam satu dashboard admin.
        </p>
      </div>

      {state.disconnected ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Koneksi database belum tersedia.
        </div>
      ) : null}

      {state.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Gagal memuat statistik admin.
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5"
          >
            <span className="text-3xl">{card.icon}</span>
            <div>
              <p className="text-2xl font-bold text-gray-900">{card.value ?? "—"}</p>
              <p className="text-sm text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <p className="text-sm font-medium text-gray-500">Template Terdaftar</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{state.stats?.totalTemplates ?? "—"}</p>
          <Link
            href="/admin/templates"
            className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
          >
            Lihat manajemen template
          </Link>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <p className="text-sm font-medium text-gray-500">Pembayaran Berhasil</p>
          <p className="mt-3 text-3xl font-bold text-gray-900">{state.stats?.totalPayments ?? "—"}</p>
          <Link
            href="/admin/analytics"
            className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark"
          >
            Lihat analitik pendapatan
          </Link>
        </div>
      </div>
    </div>
  );
}
