"use client";

import { useEffect, useMemo, useState } from "react";
import type { TemplateStatus, TemplateTierAccess } from "@/lib/supabase/types";

interface AdminTemplateItem {
  id: string;
  name: string;
  region: string;
  category: string;
  status: TemplateStatus;
  tier_access: TemplateTierAccess;
  sort_order: number;
  is_featured: boolean;
}

interface AdminTemplatesResponse {
  templates?: AdminTemplateItem[];
  total?: number;
  error?: string;
}

function getStatusBadge(status: TemplateStatus) {
  if (status === "active") {
    return "bg-green-100 text-green-700";
  }

  if (status === "archived") {
    return "bg-red-100 text-red-700";
  }

  return "bg-gray-100 text-gray-700";
}

function getTierBadge(tier: TemplateTierAccess) {
  if (tier === "premium") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-gray-100 text-gray-700";
}

function TableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        <thead className="bg-gray-50 text-left text-gray-500">
          <tr>
            {[
              "Nama",
              "Kategori",
              "Status",
              "Tier",
              "Urutan",
              "Featured",
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

export function AdminTemplateTable() {
  const limit = 20;
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [disconnected, setDisconnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [templates, setTemplates] = useState<AdminTemplateItem[]>([]);
  const [total, setTotal] = useState(0);
  const [pendingTemplateId, setPendingTemplateId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

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
        });
        const res = await fetch(`/api/admin/templates?${params.toString()}`, {
          cache: "no-store",
          credentials: "same-origin",
        });

        if (!active) {
          return;
        }

        if (res.status === 503) {
          setDisconnected(true);
          setTemplates([]);
          setTotal(0);
          return;
        }

        if (!res.ok) {
          const payload = (await res.json().catch(() => null)) as AdminTemplatesResponse | null;
          setError(payload?.error ?? "Gagal memuat template.");
          setTemplates([]);
          setTotal(0);
          return;
        }

        const data = (await res.json()) as AdminTemplatesResponse;
        setTemplates(data.templates ?? []);
        setTotal(data.total ?? 0);
      } catch {
        if (active) {
          setError("Gagal memuat template.");
          setTemplates([]);
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
  }, [limit, offset, reloadKey]);

  async function handleUpdateTemplate(
    id: string,
    updates: {
      status?: TemplateStatus;
      tier_access?: TemplateTierAccess;
      sort_order?: number;
      is_featured?: boolean;
    }
  ) {
    setPendingTemplateId(id);

    try {
      const res = await fetch(`/api/admin/templates/${id}`, {
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
      setError(payload?.error ?? "Gagal memperbarui template.");
    } catch {
      setError("Gagal memperbarui template.");
    } finally {
      setPendingTemplateId(null);
    }
  }

  const rangeLabel = useMemo(() => {
    if (total === 0) {
      return "Menampilkan 0 dari 0 template";
    }

    return `Menampilkan ${offset + 1}–${Math.min(offset + limit, total)} dari ${total} template`;
  }, [limit, offset, total]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Template</h1>
          <p className="mt-1 text-sm text-gray-500">
            Atur status, tier, urutan, dan template unggulan untuk katalog publik.
          </p>
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
        <TableSkeleton />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-sm">
              <thead className="bg-gray-50 text-left text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Nama</th>
                  <th className="px-4 py-3 font-medium">Kategori</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Tier</th>
                  <th className="px-4 py-3 font-medium">Urutan</th>
                  <th className="px-4 py-3 font-medium">Featured</th>
                  <th className="px-4 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {templates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
                      Belum ada template yang tersedia.
                    </td>
                  </tr>
                ) : (
                  templates.map((template) => {
                    const isPending = pendingTemplateId === template.id;

                    return (
                      <tr key={template.id}>
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900">{template.name}</div>
                          <div className="mt-1 text-xs text-gray-500">{template.region}</div>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{template.category}</td>
                        <td className="px-4 py-4">
                          <span
                            className={[
                              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                              getStatusBadge(template.status),
                            ].join(" ")}
                          >
                            {template.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={[
                              "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                              getTierBadge(template.tier_access),
                            ].join(" ")}
                          >
                            {template.tier_access}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <input
                            key={`${template.id}-${template.sort_order}`}
                            type="number"
                            defaultValue={template.sort_order}
                            min={0}
                            disabled={isPending}
                            onBlur={(event) => {
                              const nextValue = Number(event.currentTarget.value);

                              if (!Number.isFinite(nextValue) || nextValue === template.sort_order) {
                                event.currentTarget.value = String(template.sort_order);
                                return;
                              }

                              void handleUpdateTemplate(template.id, {
                                sort_order: Math.trunc(nextValue),
                              });
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.currentTarget.blur();
                              }
                            }}
                            className="w-20 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              checked={template.is_featured}
                              disabled={isPending}
                              onChange={(event) =>
                                void handleUpdateTemplate(template.id, {
                                  is_featured: event.target.checked,
                                })
                              }
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                            />
                            <span>{template.is_featured ? "Ya" : "Tidak"}</span>
                          </label>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() =>
                                void handleUpdateTemplate(template.id, {
                                  status:
                                    template.status === "active"
                                      ? "draft"
                                      : "active",
                                })
                              }
                              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              {template.status === "active" ? "Set Draft" : "Aktifkan"}
                            </button>
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() =>
                                void handleUpdateTemplate(template.id, {
                                  status:
                                    template.status === "archived"
                                      ? "draft"
                                      : "archived",
                                })
                              }
                              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              {template.status === "archived" ? "Set Draft" : "Arsipkan"}
                            </button>
                            <button
                              type="button"
                              disabled={isPending}
                              onClick={() =>
                                void handleUpdateTemplate(template.id, {
                                  tier_access:
                                    template.tier_access === "premium"
                                      ? "free"
                                      : "premium",
                                })
                              }
                              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            >
                              {template.tier_access === "premium" ? "Set Free" : "Set Premium"}
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
