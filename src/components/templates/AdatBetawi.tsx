import { demoEvent, type WeddingEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

interface TemplateProps {
  event?: WeddingEvent;
  invitationId?: string;
}

export function AdatBetawiTemplate({ event, invitationId }: TemplateProps) {
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
      icon: "🕌",
      title: "Akad Nikah",
      date: data.akadDate,
      time: data.akadTime,
      location: data.akadLocation,
    },
    {
      icon: "🎭",
      title: "Resepsi",
      date: data.resepsiDate,
      time: data.resepsiTime,
      location: data.resepsiLocation,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF1D6] text-[#2a1f0a] bg-gigi-balang">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-x-0 top-0 h-7 bg-[#F28C28]" />
        <div className="absolute inset-x-0 bottom-0 h-7 bg-[#2E8B57]" />
        <div className="absolute left-8 top-20 text-6xl text-[#F28C28]/35">🎭</div>
        <div className="absolute right-8 bottom-20 text-7xl text-[#2E8B57]/30">🎉</div>
        <div className="relative z-10 max-w-3xl rounded-[2rem] border border-[#F28C28]/35 bg-white/65 px-8 py-12 shadow-[0_24px_80px_rgba(42,31,10,0.12)] backdrop-blur-sm animate-fade-in sm:px-14">
          <div className="mb-5 text-5xl text-[#F28C28]">🎭</div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#2E8B57]">
            Pesta Betawi Ceria
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#F28C28]">
            <div className="h-px w-16 bg-[#F28C28]" />
            <span className="text-2xl">✿</span>
            <div className="h-px w-16 bg-[#F28C28]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.groom}</h1>
          <p className="mt-5 text-lg text-[#2a1f0a]/70">{data.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#2E8B57]/25 bg-white/70 p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F28C28]">
            Salam Betawi
          </p>
          <p className="font-serif text-3xl text-[#2a1f0a]">
            “Assalamualaikum, Nyak dan Abang”
          </p>
          <p className="mt-4 leading-relaxed text-[#2a1f0a]/70">
            Dengan hati riang kami mengundang keluarga dan sahabat untuk ikut
            meramaikan hari bahagia dalam suasana Betawi yang hangat.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#2E8B57]">
          Menghitung Hari Gembira
        </p>
        <div className="mx-auto max-w-xl rounded-[2rem] border border-[#F28C28]/30 bg-white/75 px-6 py-6 text-[#2a1f0a] shadow-sm">
          <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#2E8B57]">
          Mempelai
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {couples.map((person) => (
            <div
              key={person.name}
              className="rounded-[2rem] border border-[#F28C28]/30 bg-white/80 p-7 shadow-[0_18px_50px_rgba(242,140,40,0.12)]"
            >
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#2E8B57]/35 bg-[#F28C28]/10 text-4xl">
                {person.icon}
              </div>
              <h3 className="font-serif text-3xl text-[#2a1f0a]">{person.name}</h3>
              <p className="mt-2 text-sm text-[#2a1f0a]/65">
                {person.label} {person.parents}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#2E8B57]">
          Kisah Cinta Kami
        </p>
        <div className="mb-5 text-3xl text-[#F28C28]">✿</div>
        <p className="leading-relaxed italic text-[#2a1f0a]/75">
          &ldquo;{data.story}&rdquo;
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#2E8B57]">
          Acara Pernikahan
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((event, index) => (
            <div
              key={event.title}
              className={`rounded-[2rem] p-6 text-center text-white ${
                index === 0 ? "bg-[#F28C28]" : "bg-[#2E8B57]"
              }`}
            >
              <div className="mb-4 text-3xl text-white">{event.icon}</div>
              <h3 className="font-serif text-2xl">{event.title}</h3>
              <p className="mt-3 text-sm text-white/75">{event.date}</p>
              <p className="text-sm text-white/75">{event.time}</p>
              <p className="mt-3 text-sm leading-relaxed text-white">
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
            className="inline-flex items-center gap-2 rounded-full bg-[#2a1f0a] px-6 py-2.5 text-sm text-white transition-colors hover:bg-black"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#2E8B57]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 font-serif text-3xl text-[#2a1f0a]">RSVP</h2>
        <RSVPForm templateId="adat-betawi" invitationId={invitationId} />
      </section>

      <section className="border-t border-[#F28C28]/20 px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#F28C28]">🎭</div>
        <p className="mx-auto max-w-md text-sm text-[#2a1f0a]/60">
          Kehadiran Nyak dan Abang akan menambah semarak dan kebahagiaan di
          hari istimewa kami.
        </p>
        <p className="mt-6 text-xs text-[#2a1f0a]/35">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
