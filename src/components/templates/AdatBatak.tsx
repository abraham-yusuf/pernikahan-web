import { demoEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

export function AdatBatakTemplate() {
  const couples = [
    {
      icon: "👰",
      name: demoEvent.bride,
      parents: demoEvent.brideParents,
      label: "Boruni dari",
    },
    {
      icon: "🤵",
      name: demoEvent.groom,
      parents: demoEvent.groomParents,
      label: "Doli dari",
    },
  ];

  const events = [
    {
      icon: "⚜",
      title: "Pamasumasuon",
      date: demoEvent.akadDate,
      time: demoEvent.akadTime,
      location: demoEvent.akadLocation,
    },
    {
      icon: "🎊",
      title: "Resepsi",
      date: demoEvent.resepsiDate,
      time: demoEvent.resepsiTime,
      location: demoEvent.resepsiLocation,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#111111] bg-gorga">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-x-0 top-0 h-4 bg-[#8B1E1E]" />
        <div className="absolute inset-x-0 top-6 h-2 bg-black" />
        <div className="absolute inset-x-0 bottom-6 h-2 bg-black" />
        <div className="absolute inset-x-0 bottom-0 h-4 bg-[#8B1E1E]" />
        <div className="relative z-10 max-w-3xl rounded-[2rem] border-4 border-[#8B1E1E] bg-white/80 px-8 py-12 shadow-[0_24px_80px_rgba(17,17,17,0.14)] animate-fade-in sm:px-14">
          <div className="mb-5 text-5xl text-[#8B1E1E]">⚜</div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-black/60">
            Horas, Undangan Adat Batak
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl">{demoEvent.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#8B1E1E]">
            <div className="h-px w-16 bg-[#8B1E1E]" />
            <span className="text-2xl">◆</span>
            <div className="h-px w-16 bg-[#8B1E1E]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl">{demoEvent.groom}</h1>
          <p className="mt-5 text-lg text-black/65">{demoEvent.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl border-x-8 border-[#8B1E1E] bg-white/85 p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#8B1E1E]">
            Salam Batak
          </p>
          <p className="font-serif text-4xl text-[#111111]">Horas!</p>
          <p className="mt-4 leading-relaxed text-black/70">
            Dengan sukacita kami mengundang keluarga dan sahabat untuk hadir
            menyaksikan ikatan kasih yang kuat, tegas, dan penuh martabat.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#8B1E1E]">
          Menghitung Hari Sukacita
        </p>
        <div className="mx-auto max-w-xl border-2 border-black bg-white/90 px-6 py-6 text-[#111111] shadow-sm">
          <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#8B1E1E]">
          Mempelai
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {couples.map((person) => (
            <div
              key={person.name}
              className="border-2 border-black bg-white/90 p-7 shadow-[12px_12px_0_rgba(139,30,30,0.12)]"
            >
              <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center border-2 border-[#8B1E1E] bg-[#8B1E1E]/10 text-4xl text-[#8B1E1E]">
                {person.icon}
              </div>
              <h3 className="font-serif text-3xl text-[#111111]">{person.name}</h3>
              <p className="mt-2 text-sm text-black/65">
                {person.label} {person.parents}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#8B1E1E]">
          Kisah Cinta Kami
        </p>
        <div className="mb-5 text-3xl text-[#8B1E1E]">◆</div>
        <p className="leading-relaxed italic text-black/75">
          &ldquo;{demoEvent.story}&rdquo;
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#8B1E1E]">
          Waktu &amp; Tempat
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.title}
              className="border-2 border-black bg-white/95 p-6 text-center"
            >
              <div className="mb-4 text-3xl text-[#8B1E1E]">{event.icon}</div>
              <h3 className="font-serif text-2xl text-[#8B1E1E]">{event.title}</h3>
              <p className="mt-3 text-sm text-black/65">{event.date}</p>
              <p className="text-sm text-black/65">{event.time}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#111111]">
                {event.location}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={demoEvent.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-black bg-[#8B1E1E] px-6 py-2.5 text-sm text-white transition-colors hover:bg-[#6E1717]"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#8B1E1E]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 font-serif text-3xl text-[#111111]">RSVP</h2>
        <RSVPForm templateId="adat-batak" />
      </section>

      <section className="border-t-4 border-[#8B1E1E] px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#8B1E1E]">⚜</div>
        <p className="mx-auto max-w-md text-sm text-black/60">
          Kehadiran dan doa restu akan menjadi ulos kehangatan yang membalut
          langkah baru kami.
        </p>
        <p className="mt-6 text-xs text-black/35">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
