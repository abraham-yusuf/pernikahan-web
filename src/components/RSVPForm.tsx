"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RSVPEntry } from "@/lib/data";

interface RSVPFormProps {
  templateId: string;
  invitationId?: string;
}

interface RSVPResponsePayload {
  id: string;
  guest_name: string;
  attendance: "hadir" | "tidak_hadir";
  guest_count: number;
  message?: string | null;
  submitted_at: string;
  created_at: string;
}

interface RSVPListPayload {
  responses?: RSVPResponsePayload[];
}

interface RSVPSubmitPayload {
  error?: string;
  document?: RSVPResponsePayload;
}

function mapDocumentToEntry(document: RSVPResponsePayload): RSVPEntry {
  return {
    id: document.id,
    name: document.guest_name,
    attendance: document.attendance,
    jumlahTamu: document.guest_count,
    ucapan: document.message ?? "",
    createdAt: document.submitted_at || document.created_at,
  };
}

function buildEntryKey(entry: RSVPEntry) {
  return entry.id;
}

export function RSVPForm({ templateId, invitationId }: RSVPFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "hadir" as "hadir" | "tidak_hadir",
    jumlahTamu: 1,
    ucapan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [remoteEntries, setRemoteEntries] = useState<RSVPEntry[]>([]);
  const [localEntries, setLocalEntries] = useState<RSVPEntry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submitTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        window.clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const currentInvitationId = invitationId?.trim();

    if (!currentInvitationId) {
      setRemoteEntries([]);
      return;
    }

    const resolvedInvitationId = currentInvitationId;
    let active = true;

    async function loadResponses() {
      try {
        const response = await fetch(
          `/api/rsvp/${encodeURIComponent(resolvedInvitationId)}?limit=50`,
          {
            cache: "no-store",
            credentials: "same-origin",
          }
        );

        if (!response.ok) {
          if (active) {
            setRemoteEntries([]);
          }
          return;
        }

        const payload = (await response.json()) as RSVPListPayload;
        if (!active) {
          return;
        }

        setRemoteEntries((payload.responses ?? []).map(mapDocumentToEntry));
      } catch {
        if (active) {
          setRemoteEntries([]);
        }
      }
    }

    void loadResponses();

    return () => {
      active = false;
    };
  }, [invitationId]);

  const entries = useMemo(() => {
    const deduped = new Map<string, RSVPEntry>();

    for (const entry of remoteEntries) {
      deduped.set(buildEntryKey(entry), entry);
    }

    for (const entry of localEntries) {
      deduped.set(buildEntryKey(entry), entry);
    }

    return Array.from(deduped.values()).sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
  }, [localEntries, remoteEntries]);

  function resetForm() {
    setFormData({ name: "", attendance: "hadir", jumlahTamu: 1, ucapan: "" });
  }

  function showSubmittedState() {
    setSubmitted(true);
    if (submitTimeoutRef.current) {
      window.clearTimeout(submitTimeoutRef.current);
    }
    submitTimeoutRef.current = window.setTimeout(() => setSubmitted(false), 3000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const optimisticId = Date.now().toString(36) + Math.random().toString(36).slice(2);
    const optimisticEntry: RSVPEntry = {
      id: optimisticId,
      name: formData.name,
      attendance: formData.attendance,
      jumlahTamu: formData.jumlahTamu,
      ucapan: formData.ucapan,
      createdAt: new Date().toISOString(),
    };

    setLocalEntries((prev) => [optimisticEntry, ...prev]);

    const currentInvitationId = invitationId?.trim() ?? "";
    if (!currentInvitationId) {
      showSubmittedState();
      resetForm();
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invitationId: currentInvitationId,
          guestName: formData.name,
          attendance: formData.attendance,
          guestCount: formData.jumlahTamu,
          message: formData.ucapan,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | RSVPSubmitPayload
        | null;

      if (response.status === 503) {
        showSubmittedState();
        resetForm();
        return;
      }

      if (!response.ok) {
        setLocalEntries((prev) => prev.filter((entry) => entry.id !== optimisticId));
        setSubmitError(payload?.error ?? "Gagal mengirim RSVP.");
        return;
      }

      if (payload?.document) {
        const persistedEntry = mapDocumentToEntry(payload.document);
        setLocalEntries((prev) =>
          prev.map((entry) => (entry.id === optimisticId ? persistedEntry : entry))
        );
      }

      showSubmittedState();
      resetForm();
    } catch {
      setLocalEntries((prev) => prev.filter((entry) => entry.id !== optimisticId));
      setSubmitError("Gagal mengirim RSVP.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div id={`rsvp-${templateId}`}>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium opacity-80"
          >
            Nama Lengkap
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2.5 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Masukkan nama Anda"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium opacity-80">
            Kehadiran
          </label>
          <div className="flex gap-4">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="attendance"
                value="hadir"
                checked={formData.attendance === "hadir"}
                onChange={() => setFormData((prev) => ({ ...prev, attendance: "hadir" }))}
                className="accent-primary"
              />
              <span className="text-sm">Hadir</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="attendance"
                value="tidak_hadir"
                checked={formData.attendance === "tidak_hadir"}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    attendance: "tidak_hadir",
                  }))
                }
                className="accent-primary"
              />
              <span className="text-sm">Tidak Hadir</span>
            </label>
          </div>
        </div>

        {formData.attendance === "hadir" && (
          <div>
            <label
              htmlFor="jumlahTamu"
              className="mb-1 block text-sm font-medium opacity-80"
            >
              Jumlah Tamu
            </label>
            <select
              id="jumlahTamu"
              value={formData.jumlahTamu}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  jumlahTamu: Number(e.target.value),
                }))
              }
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} orang
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label
            htmlFor="ucapan"
            className="mb-1 block text-sm font-medium opacity-80"
          >
            Ucapan &amp; Doa
          </label>
          <textarea
            id="ucapan"
            rows={3}
            value={formData.ucapan}
            onChange={(e) => setFormData((prev) => ({ ...prev, ucapan: e.target.value }))}
            className="w-full resize-none rounded-lg border border-gray-300 bg-white/80 px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-primary py-3 font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Mengirim..." : "Kirim RSVP"}
        </button>

        {submitted && (
          <div className="animate-fade-in text-center text-sm font-medium text-green-600">
            ✓ Terima kasih! RSVP Anda telah terkirim.
          </div>
        )}

        {submitError && (
          <div className="animate-fade-in text-center text-sm font-medium text-red-600">
            {submitError}
          </div>
        )}
      </form>

      {entries.length > 0 && (
        <div className="mx-auto mt-8 max-w-md">
          <h4 className="mb-3 text-sm font-semibold opacity-70">
            Ucapan Tamu ({entries.length})
          </h4>
          <div className="max-h-60 space-y-3 overflow-y-auto">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-lg border border-gray-200 bg-white/60 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{entry.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      entry.attendance === "hadir"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {entry.attendance === "hadir" ? "Hadir" : "Tidak Hadir"}
                  </span>
                </div>
                {entry.ucapan && (
                  <p className="text-sm italic text-gray-600">
                    &ldquo;{entry.ucapan}&rdquo;
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
