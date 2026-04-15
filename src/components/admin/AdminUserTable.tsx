"use client";

import { useEffect, useMemo, useState } from "react";
import type { SubscriptionStatus, UserRole, UserTier } from "@/lib/supabase/types";

interface AdminUserItem {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  tier: UserTier;
  subscription_status: SubscriptionStatus;
  created_at: string;
}

interface AdminUsersResponse {
  users?: AdminUserItem[];
  total?: number;
  limit?: number;
  offset?: number;
  error?: string;
}

const dateFormatter = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

function formatDate(value: string) {
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? value : dateFormatter.format(timestamp);
}

function getRoleBadge(role: UserRole) {
  if (role === "admin") {
    return "bg-red-100 text-red-700";
  }

  return "bg-gray-100 text-gray-700";
}

function getTierBadge(tier: UserTier) {
  if (tier === "premium") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-gray-100 text-gray-700";
}

function getSubscriptionBadge(status: SubscriptionStatus) {
  if (status === "active") {
    return "bg-green-100 text-green-700";
  }

  return "bg-gray-100 text-gray-700";
}

function getSubscriptionLabel(status: SubscriptionStatus) {
  if (status === "past_due") {
    return "Past Due";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead className="bg-gray-50 text-left text-gray-500">
          <tr>
            {[
              "Nama",
              "Email",
              "Role",
              "Tier",
              "Status",
              "Bergabung",
              "Aksi",
            ].map((label) => (
              <th key={label} className="px-4 py-3 font-medium">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {Array.from({ length: 5 }, (_, index) => (
            <tr key={index} className="animate-pulse">
              {Array.from({ length: 7 }, (_, cellIndex) => (
                <td key={cellIndex} className="px-4 py-4">
                  <div className="h-4 rounded bg-gray-100" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminUserTable() {
  const limit = 20;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disconnected, setDisconnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [total, setTotal] = useState(0);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setDisconnected(false);
      setError(null);

      try {
        const params = new URLSearchParams({
          limit: String(limit),
          offset: String(offset),
          search: debouncedSearch,
        });
        const res = await fetch(`/api/admin/users?${params.toString()}`, {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!active) {
          return;
        }

        if (res.status === 503) {
          setDisconnected(true);
          setUsers([]);
          setTotal(0);
          return;
        }

        if (!res.ok) {
          const payload = (await res.json().catch(() => null)) as AdminUsersResponse | null;
          setError(payload?.error ?? "Gagal memuat pengguna.");
          setUsers([]);
          setTotal(0);
          return;
        }

        const data = (await res.json()) as AdminUsersResponse;
        setUsers(data.users ?? []);
        setTotal(data.total ?? 0);
      } catch {
        if (active) {
          setError("Gagal memuat pengguna.");
          setUsers([]);
          setTotal(0);
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
  }, [debouncedSearch, limit, offset, reloadKey]);

  async function handleUpdateUser(id: string, updates: Record<string, string>) {
    setPendingUserId(id);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        setReloadKey((value) => value + 1);
        return;
      }

      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error ?? "Gagal memperbarui pengguna.");
    } catch {
      setError("Gagal memperbarui pengguna.");
    } finally {
      setPendingUserId(null);
    }
  }

  const rangeLabel = useMemo(() => {
    if (total === 0) {
      return "Menampilkan 0 dari 0 pengguna";
    }

    return `Menampilkan ${offset + 1}–${Math.min(offset + limit, total)} dari ${total} pengguna`;
  }, [limit, offset, total]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola pengguna, ubah role, dan atur tier akses.
          </p>
        </div>
      </div>

      <input
        type="text"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setOffset(0);
        }}
        placeholder="Cari nama atau email..."
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:max-w-xs"
      />

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
        <TableSkeleton />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Nama</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Tier</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Bergabung</th>
                  <th className="px-4 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                      Tidak ada pengguna yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const isPending = pendingUserId === user.id;

                    return (
                      <tr key={user.id}>
                        <td className="px-4 py-4 font-medium text-gray-900">{user.full_name}</td>
                        <td className="px-4 py-4 text-gray-600">{user.email}</td>
                        <td className="px-4 py-4">
                          <span
                            className={[
                              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                              getRoleBadge(user.role),
                            ].join(" ")}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={[
                              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                              getTierBadge(user.tier),
                            ].join(" ")}
                          >
                            {user.tier}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={[
                              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                              getSubscriptionBadge(user.subscription_status),
                            ].join(" ")}
                          >
                            {getSubscriptionLabel(user.subscription_status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{formatDate(user.created_at)}</td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() =>
                                void handleUpdateUser(user.id, {
                                  role: user.role === "admin" ? "user" : "admin",
                                })
                              }
                              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              {user.role === "admin" ? "Hapus Admin" : "Jadikan Admin"}
                            </button>
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() =>
                                void handleUpdateUser(user.id, {
                                  tier: user.tier === "premium" ? "free" : "premium",
                                })
                              }
                              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              {user.tier === "premium" ? "Set Free" : "Set Premium"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <p className="text-sm text-gray-500">{rangeLabel}</p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={offset === 0}
                onClick={() => setOffset((value) => Math.max(0, value - limit))}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Sebelumnya
              </button>
              <button
                type="button"
                disabled={offset + limit >= total}
                onClick={() => setOffset((value) => value + limit)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
