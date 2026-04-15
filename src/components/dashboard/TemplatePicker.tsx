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
}

interface TemplatesPayload {
  templates?: TemplatePickerItem[];
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
      } catch {
        if (active) {
          setError("Gagal memuat template.");
          setTemplates([]);
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

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => onSelect(template)}
                  className={[
                    "group text-left rounded-2xl border bg-white p-4 transition-all",
                    isSelected
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-gray-100 hover:border-primary/40 hover:shadow-lg",
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
                </button>
              );
            })}
      </div>
    </div>
  );
}
