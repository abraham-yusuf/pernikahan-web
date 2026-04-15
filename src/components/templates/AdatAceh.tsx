import { demoEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

export function AdatAcehTemplate() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#FAF3E0] text-[#1a2e1a] bg-aceh-arabesque">
      <section className="relative flex min-h-screen items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF3E0]/95 via-[#FAF3E0]/80 to-[#f2e6c7]/95" />
        <div className="absolute left-6 top-12 hidden h-[72%] w-5 rounded-t-[4rem] rounded-b-xl border border-[#D4AF37]/35 bg-white/35 sm:block" />
        <div className="absolute right-6 top-12 hidden h-[72%] w-5 rounded-t-[4rem] rounded-b-xl border border-[#D4AF37]/35 bg-white/35 sm:block" />
        <div className="absolute inset-x-10 top-10 h-px bg-[#D4AF37]/40" />
        <div className="absolute inset-x-10 bottom-10 h-px bg-[#D4AF37]/40" />
        <div className="relative z-10 max-w-3xl animate-fade-in rounded-[2rem] border border-[#D4AF37]/30 bg-white/60 px-8 py-10 shadow-[0_24px_60px_rgba(26,46,26,0.12)] backdrop-blur-sm sm:px-14 sm:py-14">
          <div className="mb-4 text-6xl text-[#0B6E4F]">🕌</div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
            Undangan Pernikahan
          </p>
          <h1 className="text-4xl font-serif sm:text-6xl">{demoEvent.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#0B6E4F]">
            <span className="h-px w-16 bg-current" />
            <span className="text-2xl text-[#D4AF37]">✦</span>
            <span className="h-px w-16 bg-current" />
          </div>
          <h1 className="text-4xl font-serif sm:text-6xl">{demoEvent.groom}</h1>
          <p className="mt-5 text-lg text-[#1a2e1a]/70">{demoEvent.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D4AF37]/25 bg-white/70 p-8 text-center shadow-[0_16px_38px_rgba(26,46,26,0.08)]">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#0B6E4F]">
            Ayat Cinta
          </p>
          <p className="text-sm italic leading-relaxed text-[#1a2e1a]/80">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa
            tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan
            sayang.&rdquo;
          </p>
          <p className="mt-3 text-xs text-[#D4AF37]">— QS. Ar-Rum: 21</p>
        </div>
      </section>

      <section className="bg-[#0B6E4F] px-6 py-14 text-center text-white">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          Menghitung Hari Bahagia
        </p>
        <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#0B6E4F]">
            Mempelai
          </p>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-[#D4AF37]/25 bg-white/70 p-7 shadow-[0_16px_38px_rgba(26,46,26,0.08)]">
              <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#D4AF37]/40 bg-[#0B6E4F]/10 text-4xl text-[#0B6E4F]">
                👰
              </div>
              <h3 className="text-2xl font-serif">{demoEvent.bride}</h3>
              <p className="mt-2 text-sm text-[#1a2e1a]/70">
                Putri dari {demoEvent.brideParents}
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#D4AF37]/25 bg-white/70 p-7 shadow-[0_16px_38px_rgba(26,46,26,0.08)]">
              <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#D4AF37]/40 bg-[#0B6E4F]/10 text-4xl text-[#0B6E4F]">
                🤵
              </div>
              <h3 className="text-2xl font-serif">{demoEvent.groom}</h3>
              <p className="mt-2 text-sm text-[#1a2e1a]/70">
                Putra dari {demoEvent.groomParents}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D4AF37]/25 bg-white/60 p-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#0B6E4F]">
            Kisah Cinta Kami
          </p>
          <div className="mb-5 flex items-center justify-center gap-4 text-[#0B6E4F]">
            <span className="h-px w-16 bg-current" />
            <span className="text-2xl text-[#D4AF37]">🕌</span>
            <span className="h-px w-16 bg-current" />
          </div>
          <p className="leading-relaxed italic text-[#1a2e1a]/80">
            &ldquo;{demoEvent.story}&rdquo;
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#0B6E4F]">
            Waktu &amp; Tempat
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-[#D4AF37]/25 bg-white/75 p-7 text-center shadow-[0_16px_38px_rgba(26,46,26,0.08)]">
              <div className="mb-3 text-3xl text-[#0B6E4F]">🕌</div>
              <h3 className="text-xl font-serif text-[#0B6E4F]">Akad Nikah</h3>
              <p className="mt-3 text-sm text-[#1a2e1a]/65">{demoEvent.akadDate}</p>
              <p className="text-sm text-[#1a2e1a]/65">{demoEvent.akadTime}</p>
              <p className="mt-3 text-sm">{demoEvent.akadLocation}</p>
            </div>
            <div className="rounded-[2rem] border border-[#D4AF37]/25 bg-[#0B6E4F] p-7 text-center text-white shadow-[0_16px_38px_rgba(11,110,79,0.14)]">
              <div className="mb-3 text-3xl text-[#D4AF37]">🎊</div>
              <h3 className="text-xl font-serif text-[#D4AF37]">Resepsi</h3>
              <p className="mt-3 text-sm text-white/75">{demoEvent.resepsiDate}</p>
              <p className="text-sm text-white/75">{demoEvent.resepsiTime}</p>
              <p className="mt-3 text-sm text-white/90">{demoEvent.resepsiLocation}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href={demoEvent.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-2.5 text-sm text-[#1a2e1a] transition-colors hover:bg-[#c59d26]"
            >
              📍 Lihat Lokasi di Maps
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#0B6E4F]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 text-3xl font-serif">RSVP</h2>
        <RSVPForm templateId="adat-aceh" />
      </section>

      <section className="border-t border-[#D4AF37]/25 px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#0B6E4F]">🕌</div>
        <p className="mx-auto max-w-md text-sm text-[#1a2e1a]/70">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <p className="mt-6 text-xs text-[#1a2e1a]/40">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
