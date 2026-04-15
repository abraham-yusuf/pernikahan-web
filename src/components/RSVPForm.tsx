"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { RSVPEntry } from "@/lib/data";

interface RSVPFormProps {
  templateId: string;
  invitationId?: string;
}

interface RSVPResponsePayload {
  $id: string;
  guestName: string;
  attendance: "hadir" | "tidak_hadir";
  guestCount: number;
  message?: string;
  submittedAt: string;
  createdAt: string;
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
    id: document.$id,
    name: document.guestName,
    attendance: document.attendance,
    jumlahTamu: document.guestCount,
    ucapan: document.message ?? "",
    createdAt: document.submittedAt || document.createdAt,
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

    const optimisticId =
      Date.now().toString(36) + Math.random().toString(36).slice(2);
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
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1 opacity-80"
          >
            Nama Lengkap
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            placeholder="Masukkan nama Anda"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 opacity-80">
            Kehadiran
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="attendance"
                value="hadir"
                checked={formData.attendance === "hadir"}
                onChange={() =>
                  setFormData((prev) => ({ ...prev, attendance: "hadir" }))
                }
                className="accent-primary"
              />
              <span className="text-sm">Hadir</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
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
              className="block text-sm font-medium mb-1 opacity-80"
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
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50"
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
            className="block text-sm font-medium mb-1 opacity-80"
          >
            Ucapan &amp; Doa
          </label>
          <textarea
            id="ucapan"
            rows={3}
            value={formData.ucapan}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, ucapan: e.target.value }))
            }
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white/80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder="Tulis ucapan dan doa untuk kedua mempelai..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Mengirim..." : "Kirim RSVP"}
        </button>

        {submitted && (
          <div className="text-center text-green-600 text-sm font-medium animate-fade-in">
            ✓ Terima kasih! RSVP Anda telah terkirim.
          </div>
        )}

        {submitError && (
          <div className="text-center text-red-600 text-sm font-medium animate-fade-in">
            {submitError}
          </div>
        )}
      </form>

      {entries.length > 0 && (
        <div className="mt-8 max-w-md mx-auto">
          <h4 className="text-sm font-semibold mb-3 opacity-70">
            Ucapan Tamu ({entries.length})
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white/60 rounded-lg p-3 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-gray-900">
                    {entry.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      entry.attendance === "hadir"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {entry.attendance === "hadir" ? "Hadir" : "Tidak Hadir"}
                  </span>
                </div>
                {entry.ucapan && (
                  <p className="text-sm text-gray-600 italic">
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
