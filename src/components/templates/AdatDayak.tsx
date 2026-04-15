import { demoEvent, type WeddingEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

interface TemplateProps {
  event?: WeddingEvent;
  invitationId?: string;
}

export function AdatDayakTemplate({ event, invitationId }: TemplateProps) {
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
      icon: "🛡",
      title: "Akad Nikah",
      date: data.akadDate,
      time: data.akadTime,
      location: data.akadLocation,
    },
    {
      icon: "🔥",
      title: "Resepsi",
      date: data.resepsiDate,
      time: data.resepsiTime,
      location: data.resepsiLocation,
    },
  ];

  return (
    <div className="min-h-screen bg-[#E7D7B6] text-[#3a2a1a] bg-dayak-shield">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-x-0 top-0 flex justify-center gap-3 py-5 text-[#5A3E2B]/35">
          <span>◆</span>
          <span>✦</span>
          <span>◆</span>
          <span>✦</span>
          <span>◆</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-3 py-5 text-[#5A3E2B]/35">
          <span>◆</span>
          <span>✦</span>
          <span>◆</span>
          <span>✦</span>
          <span>◆</span>
        </div>
        <div className="relative z-10 max-w-3xl rounded-[2rem] border border-[#C46B2D]/35 bg-[#E7D7B6]/80 px-8 py-12 shadow-[0_24px_80px_rgba(58,42,26,0.15)] backdrop-blur-sm animate-fade-in sm:px-14">
          <div className="mb-5 text-5xl text-[#C46B2D]">🛡</div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#5A3E2B]/70">
            Undangan Adat Dayak
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#C46B2D]">
            <div className="h-px w-16 bg-[#C46B2D]" />
            <span className="text-2xl">◆</span>
            <div className="h-px w-16 bg-[#C46B2D]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.groom}</h1>
          <p className="mt-5 text-lg text-[#3a2a1a]/70">{data.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#5A3E2B]/20 bg-white/40 p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#C46B2D]">
            Pesan Tanah Kalimantan
          </p>
          <p className="font-serif text-3xl text-[#3a2a1a]">
            Restu alam, keluarga, dan kebersamaan menjadi penjaga langkah kami.
          </p>
          <p className="mt-4 leading-relaxed text-[#3a2a1a]/70">
            Dengan nuansa bumi dan semangat leluhur, kami menanti kebahagiaan
            untuk dirayakan bersama orang-orang tercinta.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#5A3E2B]">
          Menghitung Hari Bahagia
        </p>
        <div className="mx-auto max-w-xl rounded-[2rem] border border-[#C46B2D]/30 bg-white/45 px-6 py-6 text-[#3a2a1a] shadow-sm">
          <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#5A3E2B]">
          Mempelai
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {couples.map((person) => (
            <div
              key={person.name}
              className="rounded-[2rem] border border-[#5A3E2B]/20 bg-white/55 p-7 shadow-[0_18px_50px_rgba(90,62,43,0.12)]"
            >
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#C46B2D]/40 bg-[#5A3E2B]/10 text-4xl">
                {person.icon}
              </div>
              <h3 className="font-serif text-3xl text-[#3a2a1a]">{person.name}</h3>
              <p className="mt-2 text-sm text-[#3a2a1a]/65">
                {person.label} {person.parents}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#5A3E2B]">
          Kisah Cinta Kami
        </p>
        <div className="mb-5 text-3xl text-[#C46B2D]">✦</div>
        <p className="leading-relaxed italic text-[#3a2a1a]/75">
          &ldquo;{data.story}&rdquo;
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#5A3E2B]">
          Waktu &amp; Tempat
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={`rounded-[2rem] border p-6 text-center ${
                index === 0
                  ? "border-[#C46B2D]/30 bg-white/55"
                  : "border-[#5A3E2B]/30 bg-[#5A3E2B] text-[#E7D7B6]"
              }`}
            >
              <div className="mb-4 text-3xl text-[#C46B2D]">{event.icon}</div>
              <h3
                className={`font-serif text-2xl ${
                  index === 0 ? "text-[#3a2a1a]" : "text-[#E7D7B6]"
                }`}
              >
                {event.title}
              </h3>
              <p
                className={`mt-3 text-sm ${
                  index === 0 ? "text-[#3a2a1a]/65" : "text-[#E7D7B6]/75"
                }`}
              >
                {event.date}
              </p>
              <p
                className={`text-sm ${
                  index === 0 ? "text-[#3a2a1a]/65" : "text-[#E7D7B6]/75"
                }`}
              >
                {event.time}
              </p>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  index === 0 ? "text-[#3a2a1a]" : "text-[#E7D7B6]"
                }`}
              >
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
            className="inline-flex items-center gap-2 rounded-full border border-[#5A3E2B]/35 bg-white/55 px-6 py-2.5 text-sm text-[#3a2a1a] transition-colors hover:bg-[#C46B2D]/10"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#5A3E2B]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 font-serif text-3xl text-[#3a2a1a]">RSVP</h2>
        <RSVPForm templateId="adat-dayak" invitationId={invitationId} />
      </section>

      <section className="border-t border-[#5A3E2B]/20 px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#C46B2D]">🛡</div>
        <p className="mx-auto max-w-md text-sm text-[#3a2a1a]/60">
          Kehadiran dan doa restu Anda akan menjadi jejak hangat yang menuntun
          perjalanan kami menuju rumah tangga penuh keteguhan.
        </p>
        <p className="mt-6 text-xs text-[#3a2a1a]/35">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
