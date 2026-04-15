import { demoEvent, type WeddingEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

interface TemplateProps {
  event?: WeddingEvent;
  invitationId?: string;
}

export function AdatMinangTemplate({ event, invitationId }: TemplateProps) {
  const data = event ?? demoEvent;
  const couples = [
    {
      icon: "👰",
      name: data.bride,
      parents: data.brideParents,
      label: "Anak daro dari",
    },
    {
      icon: "🤵",
      name: data.groom,
      parents: data.groomParents,
      label: "Marapulai dari",
    },
  ];

  const events = [
    {
      icon: "🕌",
      title: "Akad Nikah",
      date: data.akadDate,
      time: data.akadTime,
      location: data.akadLocation,
    },
    {
      icon: "🎊",
      title: "Baralek",
      date: data.resepsiDate,
      time: data.resepsiTime,
      location: data.resepsiLocation,
    },
  ];

  return (
    <div className="min-h-screen bg-[#2C1B12] text-[#f5e6d0] bg-minang-ukir">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-x-0 top-0 h-10 bg-[#D4AF37]" />
        <div className="absolute left-1/2 top-10 flex -translate-x-1/2 gap-4">
          <div className="h-0 w-0 border-b-[44px] border-l-[32px] border-r-[32px] border-b-[#D4AF37] border-l-transparent border-r-transparent" />
          <div className="h-0 w-0 border-b-[58px] border-l-[38px] border-r-[38px] border-b-[#9B1D20] border-l-transparent border-r-transparent" />
          <div className="h-0 w-0 border-b-[44px] border-l-[32px] border-r-[32px] border-b-[#D4AF37] border-l-transparent border-r-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-[#9B1D20]/80" />
        <div className="relative z-10 max-w-3xl rounded-[2rem] border border-[#D4AF37]/30 bg-[#2C1B12]/70 px-8 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm animate-fade-in sm:px-14">
          <div className="mb-5 text-5xl text-[#D4AF37]">🏠</div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#D4AF37]/90">
            Pesta Baralek
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#D4AF37]">
            <div className="h-px w-16 bg-[#D4AF37]" />
            <span className="text-2xl">✦</span>
            <div className="h-px w-16 bg-[#D4AF37]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.groom}</h1>
          <p className="mt-5 text-lg text-[#f5e6d0]/70">{data.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D4AF37]/25 bg-[#3A2418]/80 p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
            Petatah Minang
          </p>
          <p className="font-serif text-3xl leading-snug text-[#f5e6d0]">
            “Adat basandi syarak, syarak basandi Kitabullah”
          </p>
          <p className="mt-4 leading-relaxed text-[#f5e6d0]/70">
            Nilai adat dan tuntunan agama menjadi suluh yang menerangi niat
            kami untuk membangun keluarga yang kokoh dan beradat.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          Hituang Hari Bahagia
        </p>
        <div className="mx-auto max-w-xl rounded-[2rem] border border-[#D4AF37]/25 bg-[#3A2418]/75 px-6 py-6 text-[#f5e6d0]">
          <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          Anak Daro &amp; Marapulai
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {couples.map((person) => (
            <div
              key={person.name}
              className="rounded-[2rem] border border-[#D4AF37]/25 bg-[#3A2418]/80 p-7 shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
            >
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#D4AF37]/40 bg-[#9B1D20]/20 text-4xl text-[#D4AF37]">
                {person.icon}
              </div>
              <h3 className="font-serif text-3xl text-[#f5e6d0]">{person.name}</h3>
              <p className="mt-2 text-sm text-[#f5e6d0]/65">
                {person.label} {person.parents}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          Carito Cinto Kami
        </p>
        <div className="mb-5 text-3xl text-[#D4AF37]">❖</div>
        <p className="leading-relaxed italic text-[#f5e6d0]/75">
          &ldquo;{data.story}&rdquo;
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          Rangkaian Acara
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.title}
              className="rounded-[2rem] border border-[#D4AF37]/25 bg-[#3A2418]/85 p-6 text-center"
            >
              <div className="mb-4 text-3xl text-[#D4AF37]">{event.icon}</div>
              <h3 className="font-serif text-2xl text-[#D4AF37]">{event.title}</h3>
              <p className="mt-3 text-sm text-[#f5e6d0]/65">{event.date}</p>
              <p className="text-sm text-[#f5e6d0]/65">{event.time}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#f5e6d0]">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 px-6 py-2.5 text-sm text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 font-serif text-3xl text-[#f5e6d0]">RSVP</h2>
        <RSVPForm templateId="adat-minang" invitationId={invitationId} />
      </section>

      <section className="border-t border-[#D4AF37]/15 px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#D4AF37]">🏠</div>
        <p className="mx-auto max-w-md text-sm text-[#f5e6d0]/60">
          Kehadiran dan doa restu dunsanak semua akan menjadi kebahagiaan
          yang menyempurnakan pesta baralek kami.
        </p>
        <p className="mt-6 text-xs text-[#f5e6d0]/35">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
