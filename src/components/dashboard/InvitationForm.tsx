"use client";

import { useEffect, useState, type FormEvent } from "react";

export interface InvitationFormValues {
  title: string;
  bride: string;
  groom: string;
  brideParents: string;
  groomParents: string;
  akadDate: string;
  akadTime: string;
  akadLocation: string;
  resepsiDate: string;
  resepsiTime: string;
  resepsiLocation: string;
  mapUrl: string;
  story: string;
}

interface InvitationFormProps {
  defaultValues?: Partial<InvitationFormValues>;
  onSubmit: (values: InvitationFormValues) => Promise<void> | void;
  submitLabel?: string;
  submittingLabel?: string;
  error?: string | null;
  disabled?: boolean;
}

const emptyValues: InvitationFormValues = {
  title: "",
  bride: "",
  groom: "",
  brideParents: "",
  groomParents: "",
  akadDate: "",
  akadTime: "",
  akadLocation: "",
  resepsiDate: "",
  resepsiTime: "",
  resepsiLocation: "",
  mapUrl: "",
  story: "",
};

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

function inputClassName() {
  return "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50";
}

export function InvitationForm({
  defaultValues,
  onSubmit,
  submitLabel = "Simpan",
  submittingLabel = "Menyimpan...",
  error,
  disabled = false,
}: InvitationFormProps) {
  const [formValues, setFormValues] = useState<InvitationFormValues>({
    ...emptyValues,
    ...defaultValues,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setFormValues({
      ...emptyValues,
      ...defaultValues,
    });
  }, [defaultValues]);

  function updateValue<K extends keyof InvitationFormValues>(
    key: K,
    value: InvitationFormValues[K]
  ) {
    setFormValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await onSubmit(formValues);
    } finally {
      setSubmitting(false);
    }
  }

  const isDisabled = disabled || submitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Detail undangan</h2>
        <p className="mt-1 text-sm text-gray-500">
          Lengkapi informasi utama untuk halaman undangan Anda.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <FieldLabel htmlFor="title">Judul undangan</FieldLabel>
            <input
              id="title"
              required
              value={formValues.title}
              onChange={(event) => updateValue("title", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Undangan Pernikahan Anisa & Budi"
            />
          </div>
          <div>
            <FieldLabel htmlFor="bride">Nama mempelai wanita</FieldLabel>
            <input
              id="bride"
              required
              value={formValues.bride}
              onChange={(event) => updateValue("bride", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Anisa Rahma"
            />
          </div>
          <div>
            <FieldLabel htmlFor="groom">Nama mempelai pria</FieldLabel>
            <input
              id="groom"
              required
              value={formValues.groom}
              onChange={(event) => updateValue("groom", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Budi Santoso"
            />
          </div>
          <div>
            <FieldLabel htmlFor="brideParents">Orang tua mempelai wanita</FieldLabel>
            <input
              id="brideParents"
              required
              value={formValues.brideParents}
              onChange={(event) => updateValue("brideParents", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Bapak Ahmad & Ibu Siti"
            />
          </div>
          <div>
            <FieldLabel htmlFor="groomParents">Orang tua mempelai pria</FieldLabel>
            <input
              id="groomParents"
              required
              value={formValues.groomParents}
              onChange={(event) => updateValue("groomParents", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Bapak Hendra & Ibu Dewi"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Akad</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="akadDate">Tanggal akad</FieldLabel>
            <input
              id="akadDate"
              required
              value={formValues.akadDate}
              onChange={(event) => updateValue("akadDate", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Sabtu, 15 Juni 2026"
            />
          </div>
          <div>
            <FieldLabel htmlFor="akadTime">Waktu akad</FieldLabel>
            <input
              id="akadTime"
              required
              value={formValues.akadTime}
              onChange={(event) => updateValue("akadTime", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="08:00 - 10:00 WIB"
            />
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="akadLocation">Lokasi akad</FieldLabel>
            <input
              id="akadLocation"
              required
              value={formValues.akadLocation}
              onChange={(event) => updateValue("akadLocation", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Masjid Al-Ikhlas, Jakarta Selatan"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Resepsi</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel htmlFor="resepsiDate">Tanggal resepsi</FieldLabel>
            <input
              id="resepsiDate"
              required
              value={formValues.resepsiDate}
              onChange={(event) => updateValue("resepsiDate", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Sabtu, 15 Juni 2026"
            />
          </div>
          <div>
            <FieldLabel htmlFor="resepsiTime">Waktu resepsi</FieldLabel>
            <input
              id="resepsiTime"
              required
              value={formValues.resepsiTime}
              onChange={(event) => updateValue("resepsiTime", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="11:00 - 14:00 WIB"
            />
          </div>
          <div className="md:col-span-2">
            <FieldLabel htmlFor="resepsiLocation">Lokasi resepsi</FieldLabel>
            <input
              id="resepsiLocation"
              required
              value={formValues.resepsiLocation}
              onChange={(event) => updateValue("resepsiLocation", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Ballroom Hotel Grand Sahid, Jakarta"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Informasi tambahan</h2>
        <div className="mt-6 grid gap-5">
          <div>
            <FieldLabel htmlFor="mapUrl">URL Google Maps</FieldLabel>
            <input
              id="mapUrl"
              type="url"
              value={formValues.mapUrl}
              onChange={(event) => updateValue("mapUrl", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="https://maps.google.com/..."
            />
          </div>
          <div>
            <FieldLabel htmlFor="story">Love story</FieldLabel>
            <textarea
              id="story"
              rows={6}
              value={formValues.story}
              onChange={(event) => updateValue("story", event.target.value)}
              disabled={isDisabled}
              className={inputClassName()}
              placeholder="Ceritakan perjalanan cinta Anda secara singkat"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="submit"
          disabled={isDisabled}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}
