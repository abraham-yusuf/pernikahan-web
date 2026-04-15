import { demoEvent, type WeddingEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

interface TemplateProps {
  event?: WeddingEvent;
  invitationId?: string;
}

export function AdatBaliTemplate({ event, invitationId }: TemplateProps) {
  const data = event ?? demoEvent;
  const couples = [
    {
      icon: "👰",
      name: data.bride,
      parents: data.brideParents,
      label: "Putri dari",
    },
    {
      icon: "🤵",
      name: data.groom,
      parents: data.groomParents,
      label: "Putra dari",
    },
  ];

  const events = [
    {
      icon: "🛕",
      title: "Pawiwahan",
      date: data.akadDate,
      time: data.akadTime,
      location: data.akadLocation,
    },
    {
      icon: "🌺",
      title: "Resepsi",
      date: data.resepsiDate,
      time: data.resepsiTime,
      location: data.resepsiLocation,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5E6C8] text-[#2d1f0e] bg-bali-relief">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute left-6 top-12 text-6xl text-[#0F6B5B]/20">🌿</div>
        <div className="absolute right-8 top-24 text-7xl text-[#0F6B5B]/20">🍃</div>
        <div className="absolute bottom-20 left-12 text-6xl text-[#0F6B5B]/20">🌴</div>
        <div className="absolute bottom-10 right-10 text-7xl text-[#D4AF37]/25">🛕</div>
        <div className="absolute inset-x-10 top-10 border-t-2 border-[#D4AF37]/40" />
        <div className="absolute inset-x-10 bottom-10 border-b-2 border-[#D4AF37]/40" />
        <div className="relative z-10 max-w-3xl rounded-[2rem] border border-[#D4AF37]/35 bg-[#F5E6C8]/80 px-8 py-12 shadow-[0_24px_80px_rgba(45,31,14,0.15)] backdrop-blur-sm animate-fade-in sm:px-14">
          <div className="mb-5 text-5xl text-[#D4AF37]">🛕</div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#0F6B5B]/75">
            Pawiwahan Bali
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#D4AF37]">
            <div className="h-px w-16 bg-[#D4AF37]" />
            <span className="text-2xl">✺</span>
            <div className="h-px w-16 bg-[#D4AF37]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.groom}</h1>
          <p className="mt-5 text-lg text-[#2d1f0e]/70">{data.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D4AF37]/30 bg-white/45 p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#0F6B5B]">
            Doa dan Salam
          </p>
          <p className="font-serif text-3xl text-[#2d1f0e]">Om Swastiastu</p>
          <p className="mt-4 leading-relaxed text-[#2d1f0e]/70">
            Dengan sukacita dan restu semesta, kami mengundang keluarga serta
            sahabat untuk hadir dalam momen sakral penuh kehangatan Bali.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#0F6B5B]">
          Hitung Mundur Upacara
        </p>
        <div className="mx-auto max-w-xl rounded-[2rem] border border-[#D4AF37]/30 bg-white/55 px-6 py-6 text-[#2d1f0e] shadow-sm">
          <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#0F6B5B]">
          Mempelai
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {couples.map((person) => (
            <div
              key={person.name}
              className="rounded-[2rem] border border-[#D4AF37]/30 bg-white/65 p-7 shadow-[0_20px_60px_rgba(212,175,55,0.12)]"
            >
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#D4AF37]/45 bg-[#0F6B5B]/10 text-4xl">
                {person.icon}
              </div>
              <h3 className="font-serif text-3xl text-[#2d1f0e]">{person.name}</h3>
              <p className="mt-2 text-sm text-[#2d1f0e]/65">
                {person.label} {person.parents}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#0F6B5B]">
          Kisah Cinta Kami
        </p>
        <div className="mb-5 text-3xl text-[#D4AF37]">✧</div>
        <p className="leading-relaxed italic text-[#2d1f0e]/75">
          &ldquo;{data.story}&rdquo;
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#0F6B5B]">
          Acara
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.title}
              className="rounded-[2rem] border border-[#0F6B5B]/20 bg-[#0F6B5B] p-6 text-center text-[#F5E6C8] shadow-sm"
            >
              <div className="mb-4 text-3xl text-[#D4AF37]">{event.icon}</div>
              <h3 className="font-serif text-2xl text-[#D4AF37]">{event.title}</h3>
              <p className="mt-3 text-sm text-[#F5E6C8]/75">{event.date}</p>
              <p className="text-sm text-[#F5E6C8]/75">{event.time}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#F5E6C8]">
                {event.location}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={data.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#0F6B5B]/35 bg-white/60 px-6 py-2.5 text-sm text-[#0F6B5B] transition-colors hover:bg-[#0F6B5B]/10"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#0F6B5B]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 font-serif text-3xl text-[#2d1f0e]">RSVP</h2>
        <RSVPForm templateId="adat-bali" invitationId={invitationId} />
      </section>

      <section className="border-t border-[#D4AF37]/20 px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#D4AF37]">🌿</div>
        <p className="mx-auto max-w-md text-sm text-[#2d1f0e]/60">
          Semoga kebahagiaan ini bersemi seperti taman tropis Bali dan membawa
          kedamaian bagi langkah baru kami.
        </p>
        <p className="mt-6 text-xs text-[#2d1f0e]/35">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
