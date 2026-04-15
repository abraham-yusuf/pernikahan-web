import { demoEvent, type WeddingEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

interface TemplateProps {
  event?: WeddingEvent;
  invitationId?: string;
}

export function AdatBugisMakassarTemplate({ event, invitationId }: TemplateProps) {
  const data = event ?? demoEvent;
  const couples = [
    {
      icon: "👰",
      name: data.bride,
      parents: data.brideParents,
      label: "Mempelai perempuan dari",
    },
    {
      icon: "🤵",
      name: data.groom,
      parents: data.groomParents,
      label: "Mempelai laki-laki dari",
    },
  ];

  const events = [
    {
      icon: "⛵",
      title: "Akad Nikah",
      date: data.akadDate,
      time: data.akadTime,
      location: data.akadLocation,
    },
    {
      icon: "👑",
      title: "Resepsi",
      date: data.resepsiDate,
      time: data.resepsiTime,
      location: data.resepsiLocation,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6E7D7] text-[#3a1a10] bg-lontara">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-x-0 top-0 h-6 bg-[#6E1E2A]" />
        <div className="absolute inset-x-0 bottom-0 h-6 bg-[#6E1E2A]" />
        <div className="absolute left-10 top-20 text-6xl text-[#C9A227]/35">⛵</div>
        <div className="absolute right-10 bottom-20 text-7xl text-[#C9A227]/35">✦</div>
        <div className="relative z-10 max-w-3xl rounded-[2rem] border border-[#C9A227]/35 bg-[#F6E7D7]/80 px-8 py-12 shadow-[0_24px_80px_rgba(58,26,16,0.16)] backdrop-blur-sm animate-fade-in sm:px-14">
          <div className="mb-5 text-5xl text-[#6E1E2A]">⛵</div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#6E1E2A]/70">
            Undangan Adat Bugis-Makassar
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#C9A227]">
            <div className="h-px w-16 bg-[#C9A227]" />
            <span className="text-2xl">✦</span>
            <div className="h-px w-16 bg-[#C9A227]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.groom}</h1>
          <p className="mt-5 text-lg text-[#3a1a10]/70">{data.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#C9A227]/30 bg-white/55 p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#6E1E2A]">
            Petuah Bugis
          </p>
          <p className="font-serif text-3xl leading-snug text-[#3a1a10]">
            “Resopa Temmangingi Namalomo Naletei Pammase Dewata”
          </p>
          <p className="mt-4 leading-relaxed text-[#3a1a10]/70">
            Hanya kerja keras yang tiada henti akan mendapat berkah dari Tuhan,
            menjadi harapan kami dalam mengarungi bahtera rumah tangga.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#6E1E2A]">
          Menghitung Hari Bahagia
        </p>
        <div className="mx-auto max-w-xl rounded-[2rem] border border-[#C9A227]/30 bg-white/60 px-6 py-6 text-[#3a1a10] shadow-sm">
          <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#6E1E2A]">
          Mempelai
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {couples.map((person) => (
            <div
              key={person.name}
              className="rounded-[2rem] border border-[#C9A227]/30 bg-white/70 p-7 shadow-[0_18px_50px_rgba(110,30,42,0.1)]"
            >
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#C9A227]/45 bg-[#6E1E2A]/10 text-4xl text-[#6E1E2A]">
                {person.icon}
              </div>
              <h3 className="font-serif text-3xl text-[#3a1a10]">{person.name}</h3>
              <p className="mt-2 text-sm text-[#3a1a10]/65">
                {person.label} {person.parents}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#6E1E2A]">
          Kisah Cinta Kami
        </p>
        <div className="mb-5 text-3xl text-[#C9A227]">✧</div>
        <p className="leading-relaxed italic text-[#3a1a10]/75">
          &ldquo;{data.story}&rdquo;
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#6E1E2A]">
          Waktu &amp; Tempat
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.title}
              className="rounded-[2rem] border border-[#6E1E2A]/15 bg-[#6E1E2A] p-6 text-center text-[#F6E7D7]"
            >
              <div className="mb-4 text-3xl text-[#C9A227]">{event.icon}</div>
              <h3 className="font-serif text-2xl text-[#C9A227]">{event.title}</h3>
              <p className="mt-3 text-sm text-[#F6E7D7]/75">{event.date}</p>
              <p className="text-sm text-[#F6E7D7]/75">{event.time}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#F6E7D7]">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/45 bg-white/70 px-6 py-2.5 text-sm text-[#6E1E2A] transition-colors hover:bg-[#C9A227]/10"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#6E1E2A]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 font-serif text-3xl text-[#3a1a10]">RSVP</h2>
        <RSVPForm templateId="adat-bugis-makassar" invitationId={invitationId} />
      </section>

      <section className="border-t border-[#C9A227]/20 px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#6E1E2A]">⛵</div>
        <p className="mx-auto max-w-md text-sm text-[#3a1a10]/60">
          Doa restu Anda menjadi angin baik yang mengantar bahtera kami menuju
          pelayaran panjang penuh berkah.
        </p>
        <p className="mt-6 text-xs text-[#3a1a10]/35">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
