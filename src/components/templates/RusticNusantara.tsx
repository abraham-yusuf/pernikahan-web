import { demoEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

export function RusticNusantaraTemplate() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F7F0E6] text-[#3a2e22] bg-wood-grain">
      <section className="relative flex min-h-screen items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F0E6]/95 via-[#F7F0E6]/82 to-[#eee2cf]/95" />
        <div className="absolute left-8 top-14 text-5xl text-[#8C6A43]/25">🌿</div>
        <div className="absolute right-12 bottom-20 text-6xl text-[#8C6A43]/25">🍂</div>
        <div className="relative z-10 max-w-3xl animate-fade-in rounded-[2rem] border border-[#C9A77D]/30 bg-[#F7F0E6]/85 px-8 py-10 shadow-[0_24px_60px_rgba(58,46,34,0.12)] backdrop-blur-sm sm:px-14 sm:py-14">
          <div className="mb-4 text-6xl text-[#8C6A43]">🌿</div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#C9A77D]">
            Undangan Pernikahan
          </p>
          <h1 className="text-4xl font-serif sm:text-6xl">{demoEvent.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#8C6A43]">
            <span className="h-px w-16 bg-current" />
            <span className="text-2xl text-[#C9A77D]">✦</span>
            <span className="h-px w-16 bg-current" />
          </div>
          <h1 className="text-4xl font-serif sm:text-6xl">{demoEvent.groom}</h1>
          <p className="mt-5 text-lg text-[#3a2e22]/70">{demoEvent.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#C9A77D]/25 bg-white/60 p-8 text-center shadow-[0_16px_38px_rgba(58,46,34,0.08)]">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#8C6A43]">
            Suasana Nusantara
          </p>
          <p className="text-2xl font-serif italic text-[#3a2e22]">
            Kehangatan alam, sentuhan kayu, dan doa yang tumbuh bersama.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#3a2e22]/75">
            Nuansa rustic dengan aksen batik dan dedaunan kering mengiringi hari
            bahagia kami dalam suasana hangat dan akrab.
          </p>
        </div>
      </section>

      <section className="bg-[#8C6A43] px-6 py-14 text-center text-[#f9f3eb]">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#F7F0E6]">
          Menghitung Hari Bahagia
        </p>
        <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto mb-8 flex max-w-4xl items-center justify-center gap-2 text-[#C9A77D]">
          <span className="h-1.5 w-14 rounded-full bg-current" />
          <span className="h-1.5 w-4 rounded-full bg-[#8C6A43]" />
          <span className="h-1.5 w-14 rounded-full bg-current" />
        </div>
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#8C6A43]">
            Mempelai
          </p>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-[#C9A77D]/25 bg-white/65 p-7 shadow-[0_16px_38px_rgba(58,46,34,0.08)]">
              <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#C9A77D]/40 bg-[#C9A77D]/10 text-4xl text-[#8C6A43]">
                👰
              </div>
              <h3 className="text-2xl font-serif">{demoEvent.bride}</h3>
              <p className="mt-2 text-sm text-[#3a2e22]/70">
                Putri dari {demoEvent.brideParents}
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#C9A77D]/25 bg-white/65 p-7 shadow-[0_16px_38px_rgba(58,46,34,0.08)]">
              <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#C9A77D]/40 bg-[#C9A77D]/10 text-4xl text-[#8C6A43]">
                🤵
              </div>
              <h3 className="text-2xl font-serif">{demoEvent.groom}</h3>
              <p className="mt-2 text-sm text-[#3a2e22]/70">
                Putra dari {demoEvent.groomParents}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto mb-5 flex max-w-4xl items-center justify-center gap-2 text-[#C9A77D]">
          <span className="h-1.5 w-14 rounded-full bg-current" />
          <span className="h-1.5 w-4 rounded-full bg-[#8C6A43]" />
          <span className="h-1.5 w-14 rounded-full bg-current" />
        </div>
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#C9A77D]/25 bg-white/55 p-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#8C6A43]">
            Kisah Cinta Kami
          </p>
          <p className="leading-relaxed italic text-[#3a2e22]/80">
            &ldquo;{demoEvent.story}&rdquo;
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#8C6A43]">
            Waktu &amp; Tempat
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-[#C9A77D]/25 bg-white/75 p-7 text-center shadow-[0_16px_38px_rgba(58,46,34,0.08)]">
              <div className="mb-3 text-3xl text-[#8C6A43]">🕌</div>
              <h3 className="text-xl font-serif text-[#8C6A43]">Akad Nikah</h3>
              <p className="mt-3 text-sm text-[#3a2e22]/65">{demoEvent.akadDate}</p>
              <p className="text-sm text-[#3a2e22]/65">{demoEvent.akadTime}</p>
              <p className="mt-3 text-sm">{demoEvent.akadLocation}</p>
            </div>
            <div className="rounded-[2rem] border border-[#C9A77D]/25 bg-[#8C6A43] p-7 text-center text-[#f9f3eb] shadow-[0_16px_38px_rgba(58,46,34,0.14)]">
              <div className="mb-3 text-3xl text-[#F7F0E6]">🎊</div>
              <h3 className="text-xl font-serif text-[#F7F0E6]">Resepsi</h3>
              <p className="mt-3 text-sm text-[#f9f3eb]/75">{demoEvent.resepsiDate}</p>
              <p className="text-sm text-[#f9f3eb]/75">{demoEvent.resepsiTime}</p>
              <p className="mt-3 text-sm text-[#f9f3eb]/90">{demoEvent.resepsiLocation}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href={demoEvent.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#C9A77D]/40 bg-white/75 px-6 py-2.5 text-sm text-[#8C6A43] transition-colors hover:bg-white"
            >
              📍 Lihat Lokasi di Maps
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#8C6A43]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 text-3xl font-serif">RSVP</h2>
        <RSVPForm templateId="rustic-nusantara" />
      </section>

      <section className="border-t border-[#C9A77D]/25 px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#8C6A43]">🌿</div>
        <p className="mx-auto max-w-md text-sm text-[#3a2e22]/70">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <p className="mt-6 text-xs text-[#3a2e22]/40">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
