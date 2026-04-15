"use client";

import { useEffect, useMemo, useState } from "react";

interface RevenueItem {
  amount: number;
  status: string;
  paid_at: string | null;
  created_at: string;
  plan: string;
}

interface UserGrowthItem {
  created_at: string;
  tier: string;
}

interface AnalyticsResponse {
  revenue?: RevenueItem[];
  userGrowth?: UserGrowthItem[];
  error?: string;
}

interface DailyMetric {
  date: string;
  amount: number;
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}

function getDateKey(value: Date) {
  return value.toISOString().slice(0, 10);
}

function getDateLabel(dateKey: string) {
  return dateFormatter.format(new Date(`${dateKey}T00:00:00.000Z`));
}

function ChartSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6">
      <div className="h-5 w-1/3 rounded bg-gray-100" />
      <div className="mt-4 h-8 w-40 rounded bg-gray-100" />
      <div className="mt-6 h-[200px] rounded-xl bg-gray-50" />
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [disconnected, setDisconnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsResponse | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setDisconnected(false);
      setError(null);

      try {
        const res = await fetch(`/api/admin/analytics?days=${days}`, {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!active) {
          return;
        }

        if (res.status === 503) {
          setDisconnected(true);
          setData(null);
          return;
        }

        if (!res.ok) {
          const payload = (await res.json().catch(() => null)) as AnalyticsResponse | null;
          setError(payload?.error ?? "Gagal memuat analitik.");
          setData(null);
          return;
        }

        const payload = (await res.json()) as AnalyticsResponse;
        setData(payload);
      } catch {
        if (active) {
          setError("Gagal memuat analitik.");
          setData(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [days]);

  const metrics = useMemo(() => {
    const dateKeys = Array.from({ length: days }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (days - index - 1));
      return getDateKey(date);
    });

    const revenueMap = new Map(dateKeys.map((date) => [date, 0]));
    const signupsMap = new Map(dateKeys.map((date) => [date, 0]));

    const paidPayments = (data?.revenue ?? []).filter((item) => item.status === "paid");
    for (const payment of paidPayments) {
      const sourceDate = payment.paid_at ?? payment.created_at;
      const dateKey = sourceDate.slice(0, 10);
      if (revenueMap.has(dateKey)) {
        revenueMap.set(dateKey, (revenueMap.get(dateKey) ?? 0) + (payment.amount ?? 0));
      }
    }

    for (const user of data?.userGrowth ?? []) {
      const dateKey = user.created_at.slice(0, 10);
      if (signupsMap.has(dateKey)) {
        signupsMap.set(dateKey, (signupsMap.get(dateKey) ?? 0) + 1);
      }
    }

    const dailyRevenue: DailyMetric[] = dateKeys.map((date) => ({
      date,
      amount: revenueMap.get(date) ?? 0,
    }));
    const dailySignups: DailyMetric[] = dateKeys.map((date) => ({
      date,
      amount: signupsMap.get(date) ?? 0,
    }));
    const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.amount, 0);
    const newUsers = dailySignups.reduce((sum, day) => sum + day.amount, 0);
    const totalPayments = paidPayments.length;

    return {
      dailyRevenue,
      dailySignups,
      totalRevenue,
      newUsers,
      totalPayments,
      averageRevenue: totalRevenue / days,
      maxRevenue: Math.max(...dailyRevenue.map((day) => day.amount), 1),
      maxSignups: Math.max(...dailySignups.map((day) => day.amount), 1),
    };
  }, [data, days]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analitik Pendapatan</h1>
          <p className="mt-1 text-sm text-gray-500">
            Pantau performa pembayaran dan pertumbuhan pengguna untuk periode terpilih.
          </p>
        </div>
        <div className="flex gap-2">
          {[7, 14, 30, 90].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setDays(value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                days === value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {value} Hari
            </button>
          ))}
        </div>
      </div>

      {disconnected ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Koneksi database belum tersedia.
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Pendapatan</h2>
                  <p className="mt-1 text-sm text-gray-500">Total pembayaran berhasil dalam {days} hari terakhir.</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(metrics.totalRevenue)}
                </p>
              </div>
              <div className="mt-6 flex items-end gap-1" style={{ height: 200 }}>
                {metrics.dailyRevenue.map((day) => (
                  <div key={day.date} className="group relative flex flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-primary transition-colors group-hover:bg-primary-dark"
                      style={{
                        height: `${(day.amount / metrics.maxRevenue) * 100}%`,
                        minHeight: day.amount > 0 ? 4 : 0,
                      }}
                    />
                    <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                      {formatCurrency(day.amount)}
                      <br />
                      {getDateLabel(day.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Pertumbuhan Pengguna</h2>
                  <p className="mt-1 text-sm text-gray-500">Pengguna baru yang bergabung dalam {days} hari terakhir.</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{metrics.newUsers}</p>
              </div>
              <div className="mt-6 flex items-end gap-1" style={{ height: 200 }}>
                {metrics.dailySignups.map((day) => (
                  <div key={day.date} className="group relative flex flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-green-500 transition-colors group-hover:bg-green-600"
                      style={{
                        height: `${(day.amount / metrics.maxSignups) * 100}%`,
                        minHeight: day.amount > 0 ? 4 : 0,
                      }}
                    />
                    <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white group-hover:block">
                      {day.amount} pengguna
                      <br />
                      {getDateLabel(day.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Total Pendapatan" value={formatCurrency(metrics.totalRevenue)} />
            <SummaryCard
              label="Rata-rata per Hari"
              value={formatCurrency(Math.round(metrics.averageRevenue))}
            />
            <SummaryCard label="Pengguna Baru" value={String(metrics.newUsers)} />
            <SummaryCard label="Pembayaran Berhasil" value={String(metrics.totalPayments)} />
          </div>
        </>
      )}
    </div>
  );
}
