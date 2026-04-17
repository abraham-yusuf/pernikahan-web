"use client";

import { useEffect, useMemo, useState } from "react";
import type { TemplateStatus, TemplateTierAccess } from "@/lib/supabase/types";
import { parseOptionalUrl } from "@/lib/template-admin-validation";

interface AdminTemplateItem {
  id: string;
  template_key: string;
  name: string;
  description: string;
  region: string;
  category: string;
  preview_color: string;
  accent_color: string;
  bg_pattern: string;
  component_name: string;
  status: TemplateStatus;
  tier_access: TemplateTierAccess;
  sort_order: number;
  thumbnail_url: string | null;
  preview_url: string | null;
  is_featured: boolean;
}

interface AdminTemplatesResponse {
  templates?: AdminTemplateItem[];
  total?: number;
  error?: string;
}

function getApiErrorMessage(
  payload: unknown,
  fallback: string
): string {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    typeof payload.error === "string" &&
    payload.error.trim().length > 0
  ) {
    return payload.error;
  }

  return fallback;
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
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    template_key: "",
    name: "",
    description: "",
    region: "",
    category: "",
    preview_color: "#1a1a2e",
    accent_color: "#c9a84c",
    bg_pattern: "",
    component_name: "",
    tier_access: "premium" as TemplateTierAccess,
    status: "draft" as TemplateStatus,
    sort_order: 100,
    thumbnail_url: "",
    preview_url: "",
    is_featured: false,
  });

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
          const payload = await res.json().catch(() => null);
          setError(getApiErrorMessage(payload, "Gagal memuat template."));
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
      name?: string;
      template_key?: string;
      thumbnail_url?: string | null;
      preview_url?: string | null;
      component_name?: string;
      category?: string;
      region?: string;
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

      const payload = await res.json().catch(() => null);
      setError(getApiErrorMessage(payload, "Gagal memperbarui template."));
    } catch {
      setError("Gagal memperbarui template.");
    } finally {
      setPendingTemplateId(null);
    }
  }

  async function handleCreateTemplate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreating(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          ...createForm,
          sort_order: Number(createForm.sort_order),
          thumbnail_url: parseOptionalUrl(createForm.thumbnail_url) ?? null,
          preview_url: parseOptionalUrl(createForm.preview_url) ?? null,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        setError(getApiErrorMessage(payload, "Gagal menambah template."));
        return;
      }

      setCreateForm({
        template_key: "",
        name: "",
        description: "",
        region: "",
        category: "",
        preview_color: "#1a1a2e",
        accent_color: "#c9a84c",
        bg_pattern: "",
        component_name: "",
        tier_access: "premium",
        status: "draft",
        sort_order: 100,
        thumbnail_url: "",
        preview_url: "",
        is_featured: false,
      });
      setOffset(0);
      setReloadKey((value) => value + 1);
    } catch {
      setError("Gagal menambah template.");
    } finally {
      setCreating(false);
    }
  }

  const rangeLabel = useMemo(() => {
    if (total === 0) {
      return "Menampilkan 0 dari 0 template";
    }

    return `Menampilkan ${offset + 1}–${Math.min(offset + limit, total)} dari ${total} template`;
  }, [limit, offset, total]);

  function handleOptionalUrlBlur(
    template: AdminTemplateItem,
    field: "thumbnail_url" | "preview_url",
    fallbackValue: string | null
  ) {
    return (event: React.FocusEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value.trim() || null;
      if (fallbackValue === nextValue) {
        event.currentTarget.value = fallbackValue ?? "";
        return;
      }

      void handleUpdateTemplate(template.id, {
        [field]: nextValue,
      });
    };
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Template</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola metadata template sesuai tabel database, termasuk thumbnail dan preview URL.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleCreateTemplate}
        className="space-y-4 rounded-2xl border border-gray-100 bg-white p-4"
      >
        <h2 className="text-base font-semibold text-gray-900">Tambah Template</h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <input
            value={createForm.template_key}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, template_key: event.target.value }))
            }
            placeholder="template_key"
            required
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            value={createForm.name}
            onChange={(event) => setCreateForm((value) => ({ ...value, name: event.target.value }))}
            placeholder="Nama template"
            required
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            value={createForm.component_name}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, component_name: event.target.value }))
            }
            placeholder="component_name"
            required
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            value={createForm.region}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, region: event.target.value }))
            }
            placeholder="Region"
            required
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            value={createForm.category}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, category: event.target.value }))
            }
            placeholder="Kategori"
            required
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            value={createForm.bg_pattern}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, bg_pattern: event.target.value }))
            }
            placeholder="bg_pattern"
            required
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            value={createForm.preview_color}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, preview_color: event.target.value }))
            }
            placeholder="preview_color"
            required
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            value={createForm.accent_color}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, accent_color: event.target.value }))
            }
            placeholder="accent_color"
            required
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            value={createForm.thumbnail_url}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, thumbnail_url: event.target.value }))
            }
            placeholder="thumbnail_url (opsional)"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            value={createForm.preview_url}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, preview_url: event.target.value }))
            }
            placeholder="preview_url (opsional)"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            type="number"
            min={0}
            value={createForm.sort_order}
            onChange={(event) =>
              setCreateForm((value) => ({
                ...value,
                sort_order: Number(event.target.value),
              }))
            }
            placeholder="sort_order"
            required
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
          <select
            value={createForm.tier_access}
            onChange={(event) =>
              setCreateForm((value) => ({
                ...value,
                tier_access: event.target.value as TemplateTierAccess,
              }))
            }
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="free">free</option>
            <option value="premium">premium</option>
          </select>
          <select
            value={createForm.status}
            onChange={(event) =>
              setCreateForm((value) => ({
                ...value,
                status: event.target.value as TemplateStatus,
              }))
            }
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
          >
            <option value="draft">draft</option>
            <option value="active">active</option>
            <option value="archived">archived</option>
          </select>
        </div>
        <textarea
          value={createForm.description}
          onChange={(event) =>
            setCreateForm((value) => ({ ...value, description: event.target.value }))
          }
          placeholder="Deskripsi"
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          rows={3}
        />
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={createForm.is_featured}
            onChange={(event) =>
              setCreateForm((value) => ({ ...value, is_featured: event.target.checked }))
            }
            className="h-4 w-4 rounded border-gray-300 text-primary"
          />
          Featured
        </label>
        <div>
          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {creating ? "Menyimpan..." : "Tambah Template"}
          </button>
        </div>
      </form>

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
                          <div className="mt-3 grid gap-2">
                            <input
                              key={`${template.id}-thumb-${template.thumbnail_url ?? ""}`}
                              type="text"
                              defaultValue={template.thumbnail_url ?? ""}
                              placeholder="thumbnail_url"
                              disabled={isPending}
                              onBlur={handleOptionalUrlBlur(
                                template,
                                "thumbnail_url",
                                template.thumbnail_url
                              )}
                              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs"
                            />
                            <input
                              key={`${template.id}-preview-${template.preview_url ?? ""}`}
                              type="text"
                              defaultValue={template.preview_url ?? ""}
                              placeholder="preview_url"
                              disabled={isPending}
                              onBlur={handleOptionalUrlBlur(
                                template,
                                "preview_url",
                                template.preview_url
                              )}
                              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs"
                            />
                            <input
                              key={`${template.id}-key-${template.template_key}`}
                              type="text"
                              defaultValue={template.template_key}
                              placeholder="template_key"
                              disabled={isPending}
                              onBlur={(event) => {
                                const nextValue = event.currentTarget.value.trim();
                                if (!nextValue || template.template_key === nextValue) {
                                  event.currentTarget.value = template.template_key;
                                  return;
                                }
                                void handleUpdateTemplate(template.id, {
                                  template_key: nextValue,
                                });
                              }}
                              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs"
                            />
                            <input
                              key={`${template.id}-component-${template.component_name}`}
                              type="text"
                              defaultValue={template.component_name}
                              placeholder="component_name"
                              disabled={isPending}
                              onBlur={(event) => {
                                const nextValue = event.currentTarget.value.trim();
                                if (!nextValue || template.component_name === nextValue) {
                                  event.currentTarget.value = template.component_name;
                                  return;
                                }
                                void handleUpdateTemplate(template.id, {
                                  component_name: nextValue,
                                });
                              }}
                              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs"
                            />
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
