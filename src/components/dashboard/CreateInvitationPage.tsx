"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InvitationForm,
  type InvitationFormValues,
} from "@/components/dashboard/InvitationForm";
import {
  TemplatePicker,
  type TemplatePickerItem,
} from "@/components/dashboard/TemplatePicker";

interface CreateInvitationPayload {
  invitation?: {
    $id: string;
  };
  error?: string;
}

export function CreateInvitationPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplatePickerItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(values: InvitationFormValues) {
    if (!selectedTemplate) {
      setError("Silakan pilih template terlebih dahulu.");
      return;
    }

    setError(null);

    try {
      const response = await fetch("/api/invitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          ...values,
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | CreateInvitationPayload
        | null;

      if (response.status === 503) {
        setError("Database belum dikonfigurasi.");
        return;
      }

      if (!response.ok || !payload?.invitation?.$id) {
        setError(payload?.error ?? "Gagal menyimpan undangan.");
        return;
      }

      router.push(`/dashboard/invitations/${payload.invitation.$id}`);
      router.refresh();
    } catch {
      setError("Gagal menyimpan undangan.");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Buat Undangan Baru</h1>
        <p className="mt-1 text-sm text-gray-500">
          Pilih template terlebih dahulu, lalu lengkapi detail acara untuk menyimpan draf undangan Anda.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Step 1
          </p>
          <h2 className="mt-1 text-lg font-semibold text-gray-900">Template undangan</h2>
        </div>
        <TemplatePicker
          selectedTemplateId={selectedTemplate?.id}
          onSelect={(template) => {
            setSelectedTemplate(template);
            setError(null);
          }}
        />
      </section>

      {selectedTemplate ? (
        <section className="space-y-4">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">
            Template terpilih: <span className="font-semibold">{selectedTemplate.name}</span>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Step 2
            </p>
            <h2 className="mt-1 text-lg font-semibold text-gray-900">Detail undangan</h2>
          </div>
          <InvitationForm
            onSubmit={handleCreate}
            submitLabel="Simpan sebagai Draft"
            submittingLabel="Menyimpan draft..."
            error={error}
          />
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
          Pilih salah satu template untuk membuka form pembuatan undangan.
        </div>
      )}
    </div>
  );
}
