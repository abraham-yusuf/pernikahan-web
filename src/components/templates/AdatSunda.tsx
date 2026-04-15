import { demoEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

export function AdatSundaTemplate() {
  const couples = [
    {
      icon: "👰",
      name: demoEvent.bride,
      parents: demoEvent.brideParents,
      label: "Putri dari",
    },
    {
      icon: "🤵",
      name: demoEvent.groom,
      parents: demoEvent.groomParents,
      label: "Putra dari",
    },
  ];

  const events = [
    {
      icon: "🕌",
      title: "Akad Nikah",
      date: demoEvent.akadDate,
      time: demoEvent.akadTime,
      location: demoEvent.akadLocation,
    },
    {
      icon: "🎉",
      title: "Resepsi",
      date: demoEvent.resepsiDate,
      time: demoEvent.resepsiTime,
      location: demoEvent.resepsiLocation,
    },
  ];

  return (
    <div className="min-h-screen bg-[#DCEEF8] text-[#1a3a5c] bg-mega-mendung">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute left-8 top-16 text-6xl text-[#7CB7D9]/40">☁</div>
        <div className="absolute bottom-16 right-8 text-7xl text-[#7CB7D9]/30">☁</div>
        <div className="absolute inset-x-0 top-10 mx-auto h-px w-56 bg-[#F4C95D]/50" />
        <div className="absolute inset-x-0 bottom-10 mx-auto h-px w-56 bg-[#F4C95D]/50" />
        <div className="relative z-10 max-w-3xl rounded-[2rem] border border-[#7CB7D9]/40 bg-white/55 px-8 py-12 shadow-[0_24px_80px_rgba(26,58,92,0.12)] backdrop-blur-sm animate-fade-in sm:px-14">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F4C95D]/60 bg-[#7CB7D9]/20 text-4xl text-[#1a3a5c]">
            ☁
          </div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#1a3a5c]/65">
            Pangéling Poé Bagja
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl">{demoEvent.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#F4C95D]">
            <div className="h-px w-16 bg-[#F4C95D]" />
            <span className="text-2xl">❊</span>
            <div className="h-px w-16 bg-[#F4C95D]" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl">{demoEvent.groom}</h1>
          <p className="mt-5 text-lg text-[#1a3a5c]/70">{demoEvent.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#7CB7D9]/35 bg-white/65 p-8 shadow-sm">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#7CB7D9]">
            Piwuruk Sunda
          </p>
          <p className="font-serif text-3xl text-[#1a3a5c]">
            “Silih Asah, Silih Asih, Silih Asuh”
          </p>
          <p className="mt-4 leading-relaxed text-[#1a3a5c]/70">
            Saling mencerdaskan, menyayangi, dan mengasuh menjadi doa yang
            kami bawa untuk memulai rumah tangga penuh kelembutan.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#7CB7D9]">
          Menghitung Nu Cinta
        </p>
        <div className="mx-auto max-w-xl rounded-full border border-[#7CB7D9]/35 bg-white/60 px-6 py-6 text-[#1a3a5c] shadow-sm">
          <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#7CB7D9]">
          Mempelai
        </p>
        <div className="grid gap-8 sm:grid-cols-2">
          {couples.map((person) => (
            <div
              key={person.name}
              className="rounded-[2rem] bg-gradient-to-br from-[#7CB7D9] via-[#DCEEF8] to-[#F4C95D] p-[1.5px] shadow-[0_20px_50px_rgba(124,183,217,0.22)]"
            >
              <div className="h-full rounded-[calc(2rem-1.5px)] bg-white/90 p-7">
                <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#7CB7D9]/40 bg-[#DCEEF8] text-4xl">
                  {person.icon}
                </div>
                <h3 className="font-serif text-3xl text-[#1a3a5c]">{person.name}</h3>
                <p className="mt-2 text-sm text-[#1a3a5c]/65">
                  {person.label} {person.parents}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#7CB7D9]">
          Lalampahan Asih
        </p>
        <div className="mb-5 text-3xl text-[#F4C95D]">☁</div>
        <p className="leading-relaxed italic text-[#1a3a5c]/75">
          &ldquo;{demoEvent.story}&rdquo;
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#7CB7D9]">
          Waktu &amp; Tempat
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((event) => (
            <div
              key={event.title}
              className="rounded-[2rem] border border-[#7CB7D9]/30 bg-white/75 p-6 text-center shadow-sm"
            >
              <div className="mb-4 text-3xl text-[#F4C95D]">{event.icon}</div>
              <h3 className="font-serif text-2xl text-[#1a3a5c]">{event.title}</h3>
              <p className="mt-3 text-sm text-[#1a3a5c]/65">{event.date}</p>
              <p className="text-sm text-[#1a3a5c]/65">{event.time}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#1a3a5c]">
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
            className="inline-flex items-center gap-2 rounded-full border border-[#7CB7D9]/45 bg-white/80 px-6 py-2.5 text-sm text-[#1a3a5c] transition-colors hover:bg-[#7CB7D9]/10"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#7CB7D9]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 font-serif text-3xl text-[#1a3a5c]">RSVP</h2>
        <RSVPForm templateId="adat-sunda" />
      </section>

      <section className="border-t border-[#7CB7D9]/20 px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#F4C95D]">☁</div>
        <p className="mx-auto max-w-md text-sm text-[#1a3a5c]/60">
          Hatur nuhun atas doa, kasih, dan restu yang mengiringi langkah kami
          menuju rumah tangga yang teduh.
        </p>
        <p className="mt-6 text-xs text-[#1a3a5c]/35">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
