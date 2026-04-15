"use client";

import { useState, type ReactNode } from "react";

export interface EditorState {
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

interface EditorFormProps {
  values: EditorState;
  onChange: (key: keyof EditorState, value: string) => void;
  disabled?: boolean;
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

function inputClassName() {
  return "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500";
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={[
        "h-5 w-5 text-gray-400 transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
      ].join(" ")}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({
  title,
  description,
  defaultOpen = true,
  children,
}: {
  title: string;
  description: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <ChevronIcon open={open} />
      </button>
      {open ? <div className="border-t border-gray-100 px-5 py-5">{children}</div> : null}
    </section>
  );
}

export function EditorForm({ values, onChange, disabled = false }: EditorFormProps) {
  return (
    <div className="space-y-4">
      <Section title="Mempelai" description="Informasi utama kedua mempelai dan keluarga.">
        <div className="grid gap-5">
          <div>
            <FieldLabel htmlFor="bride">Nama mempelai wanita</FieldLabel>
            <input
              id="bride"
              value={values.bride}
              onChange={(event) => onChange("bride", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="Anisa Rahma"
            />
          </div>
          <div>
            <FieldLabel htmlFor="groom">Nama mempelai pria</FieldLabel>
            <input
              id="groom"
              value={values.groom}
              onChange={(event) => onChange("groom", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="Budi Santoso"
            />
          </div>
          <div>
            <FieldLabel htmlFor="brideParents">Orang tua mempelai wanita</FieldLabel>
            <input
              id="brideParents"
              value={values.brideParents}
              onChange={(event) => onChange("brideParents", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="Bapak Ahmad & Ibu Siti"
            />
          </div>
          <div>
            <FieldLabel htmlFor="groomParents">Orang tua mempelai pria</FieldLabel>
            <input
              id="groomParents"
              value={values.groomParents}
              onChange={(event) => onChange("groomParents", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="Bapak Hendra & Ibu Dewi"
            />
          </div>
        </div>
      </Section>

      <Section title="Akad Nikah" description="Waktu dan lokasi prosesi akad.">
        <div className="grid gap-5">
          <div>
            <FieldLabel htmlFor="akadDate">Tanggal akad</FieldLabel>
            <input
              id="akadDate"
              value={values.akadDate}
              onChange={(event) => onChange("akadDate", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="Sabtu, 15 Juni 2026"
            />
          </div>
          <div>
            <FieldLabel htmlFor="akadTime">Waktu akad</FieldLabel>
            <input
              id="akadTime"
              value={values.akadTime}
              onChange={(event) => onChange("akadTime", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="08:00 - 10:00 WIB"
            />
          </div>
          <div>
            <FieldLabel htmlFor="akadLocation">Lokasi akad</FieldLabel>
            <input
              id="akadLocation"
              value={values.akadLocation}
              onChange={(event) => onChange("akadLocation", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="Masjid Al-Ikhlas, Jakarta Selatan"
            />
          </div>
        </div>
      </Section>

      <Section title="Resepsi" description="Detail waktu dan tempat resepsi.">
        <div className="grid gap-5">
          <div>
            <FieldLabel htmlFor="resepsiDate">Tanggal resepsi</FieldLabel>
            <input
              id="resepsiDate"
              value={values.resepsiDate}
              onChange={(event) => onChange("resepsiDate", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="Sabtu, 15 Juni 2026"
            />
          </div>
          <div>
            <FieldLabel htmlFor="resepsiTime">Waktu resepsi</FieldLabel>
            <input
              id="resepsiTime"
              value={values.resepsiTime}
              onChange={(event) => onChange("resepsiTime", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="11:00 - 14:00 WIB"
            />
          </div>
          <div>
            <FieldLabel htmlFor="resepsiLocation">Lokasi resepsi</FieldLabel>
            <input
              id="resepsiLocation"
              value={values.resepsiLocation}
              onChange={(event) => onChange("resepsiLocation", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="Ballroom Hotel Grand Sahid, Jakarta"
            />
          </div>
        </div>
      </Section>

      <Section title="Informasi Lainnya" description="Tambahkan peta dan kisah singkat pasangan.">
        <div className="grid gap-5">
          <div>
            <FieldLabel htmlFor="mapUrl">URL Google Maps</FieldLabel>
            <input
              id="mapUrl"
              type="url"
              value={values.mapUrl}
              onChange={(event) => onChange("mapUrl", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="https://maps.google.com/..."
            />
          </div>
          <div>
            <FieldLabel htmlFor="story">Love story</FieldLabel>
            <textarea
              id="story"
              rows={6}
              value={values.story}
              onChange={(event) => onChange("story", event.target.value)}
              disabled={disabled}
              className={inputClassName()}
              placeholder="Ceritakan perjalanan cinta Anda secara singkat"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
