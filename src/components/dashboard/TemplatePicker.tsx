"use client";

import { useEffect, useMemo, useState } from "react";

export interface TemplatePickerItem {
  id: string;
  name: string;
  description: string;
  category: string;
  region: string;
  previewColor: string;
  accentColor: string;
  bgPattern: string;
  tierAccess: "free" | "premium";
  locked: boolean;
}

interface TemplatesPayload {
  templates?: TemplatePickerItem[];
  userTier?: "free" | "premium";
  error?: string;
}

interface TemplatePickerProps {
  selectedTemplateId?: string;
  onSelect: (template: TemplatePickerItem) => void;
}

function TemplateCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4">
      <div className="h-32 rounded-xl bg-gray-100" />
      <div className="mt-4 h-4 w-2/3 rounded bg-gray-100" />
      <div className="mt-2 h-3 w-full rounded bg-gray-100" />
      <div className="mt-2 h-3 w-4/5 rounded bg-gray-100" />
    </div>
  );
}

export function TemplatePicker({
  selectedTemplateId,
  onSelect,
}: TemplatePickerProps) {
  const [templates, setTemplates] = useState<TemplatePickerItem[]>([]);
  const [userTier, setUserTier] = useState<"free" | "premium">("free");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadTemplates() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/templates", {
          cache: "no-store",
          credentials: "same-origin",
        });
        const payload = (await response.json().catch(() => null)) as
          | TemplatesPayload
          | null;

        if (!active) {
          return;
        }

        if (!response.ok) {
          setError(payload?.error ?? "Gagal memuat template.");
          setTemplates([]);
          return;
        }

        setTemplates(payload?.templates ?? []);
        setUserTier(payload?.userTier === "premium" ? "premium" : "free");
      } catch {
        if (active) {
          setError("Gagal memuat template.");
          setTemplates([]);
          setUserTier("free");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadTemplates();

    return () => {
      active = false;
    };
  }, []);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? null,
    [selectedTemplateId, templates]
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Pilih template</h2>
          <p className="text-sm text-gray-500">
            Pilih desain yang paling sesuai sebelum melengkapi detail undangan.
          </p>
        </div>
        {selectedTemplate ? (
          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Template terpilih: {selectedTemplate.name}
          </div>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }, (_, index) => <TemplateCardSkeleton key={index} />)
          : templates.map((template) => {
              const isSelected = template.id === selectedTemplateId;
              const isLocked = template.locked;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => {
                    if (!isLocked) {
                      onSelect(template);
                    }
                  }}
                  disabled={isLocked}
                  className={[
                    "group text-left rounded-2xl border bg-white p-4 transition-all",
                    isSelected
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-gray-100 hover:border-primary/40 hover:shadow-lg",
                    isLocked ? "cursor-not-allowed opacity-70" : "",
                  ].join(" ")}
                >
                  <div
                    className="relative flex h-36 items-center justify-center overflow-hidden rounded-xl"
                    style={{ backgroundColor: template.previewColor }}
                  >
                    <div className="text-center text-white">
                      <div
                        className="text-3xl"
                        style={{ color: template.accentColor }}
                      >
                        ❦
                      </div>
                      <p
                        className="mt-2 font-serif text-lg italic"
                        style={{ color: template.accentColor }}
                      >
                        Anisa &amp; Budi
                      </p>
                    </div>
                    {isSelected ? (
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                        ✓
                      </div>
                    ) : null}
                    {template.tierAccess === "premium" ? (
                      <div className="absolute left-3 top-3 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-700">
                        Premium
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                      {template.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {template.description}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
                    {template.region}
                  </p>
                  {isLocked ? (
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                      Template ini khusus Premium.{" "}
                      <a
                        href="/dashboard/settings"
                        className="font-semibold underline underline-offset-2"
                      >
                        Upgrade sekarang
                      </a>
                      .
                    </div>
                  ) : null}
                </button>
              );
            })}
      </div>
      {userTier === "free" ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Beberapa template Premium terkunci untuk akun gratis.{" "}
          <a
            href="/dashboard/settings"
            className="font-semibold underline underline-offset-2"
          >
            Upgrade ke Premium
          </a>{" "}
          untuk membuka semuanya.
        </div>
      ) : null}
    </div>
  );
}
