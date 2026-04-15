import { demoEvent, type WeddingEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

interface TemplateProps {
  event?: WeddingEvent;
  invitationId?: string;
}

export function IslamicElegantTemplate({ event, invitationId }: TemplateProps) {
  const data = event ?? demoEvent;
  return (
    <div className="min-h-screen overflow-hidden bg-[#F8F5EE] text-[#1a2a2a] bg-mashrabiya">
      <section className="relative flex min-h-screen items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F5EE]/95 via-[#F8F5EE]/82 to-[#ebe4d5]/95" />
        <div className="absolute inset-x-8 top-8 h-px bg-[#D4AF37]/35" />
        <div className="absolute inset-x-8 bottom-8 h-px bg-[#D4AF37]/35" />
        <div className="absolute left-12 top-16 text-4xl text-[#0F766E]/20">✦</div>
        <div className="absolute right-12 bottom-16 text-5xl text-[#0F766E]/20">✦</div>
        <div className="relative z-10 max-w-3xl animate-fade-in rounded-[2rem] border border-[#D4AF37]/30 bg-white/65 px-8 py-10 shadow-[0_24px_60px_rgba(26,42,42,0.1)] backdrop-blur-sm sm:px-14 sm:py-14">
          <div className="mb-4 text-6xl text-[#0F766E]">☪</div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#D4AF37]">
            Undangan Pernikahan
          </p>
          <h1 className="text-4xl font-serif sm:text-6xl">{data.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#0F766E]">
            <span className="h-px w-16 bg-current" />
            <span className="text-2xl text-[#D4AF37]">✦</span>
            <span className="h-px w-16 bg-current" />
          </div>
          <h1 className="text-4xl font-serif sm:text-6xl">{data.groom}</h1>
          <p className="mt-5 text-lg text-[#1a2a2a]/70">{data.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D4AF37]/25 bg-white/70 p-8 text-center shadow-[0_16px_38px_rgba(26,42,42,0.08)]">
          <p className="text-2xl font-serif text-[#0F766E]">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className="mt-4 text-sm italic leading-relaxed text-[#1a2a2a]/80">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa
            tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan
            sayang.&rdquo;
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
            QS. Ar-Rum: 21
          </p>
        </div>
      </section>

      <section className="bg-[#0F766E] px-6 py-14 text-center text-white">
        <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
          Menghitung Hari Bahagia
        </p>
        <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#0F766E]">
            Mempelai
          </p>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-[#D4AF37]/25 bg-white/70 p-7 shadow-[0_16px_38px_rgba(26,42,42,0.08)]">
              <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#D4AF37]/40 bg-[#0F766E]/10 text-4xl text-[#0F766E]">
                👰
              </div>
              <h3 className="text-2xl font-serif">{data.bride}</h3>
              <p className="mt-2 text-sm text-[#1a2a2a]/70">
                Putri dari {data.brideParents}
              </p>
            </div>
            <div className="rounded-[2rem] border border-[#D4AF37]/25 bg-white/70 p-7 shadow-[0_16px_38px_rgba(26,42,42,0.08)]">
              <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#D4AF37]/40 bg-[#0F766E]/10 text-4xl text-[#0F766E]">
                🤵
              </div>
              <h3 className="text-2xl font-serif">{data.groom}</h3>
              <p className="mt-2 text-sm text-[#1a2a2a]/70">
                Putra dari {data.groomParents}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#D4AF37]/25 bg-white/65 p-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#0F766E]">
            Kisah Cinta Kami
          </p>
          <div className="mb-5 flex items-center justify-center gap-4 text-[#0F766E]">
            <span className="h-px w-16 bg-current" />
            <span className="text-2xl text-[#D4AF37]">☪</span>
            <span className="h-px w-16 bg-current" />
          </div>
          <p className="leading-relaxed italic text-[#1a2a2a]/80">
            &ldquo;{data.story}&rdquo;
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#0F766E]">
            Waktu &amp; Tempat
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-[#D4AF37]/25 bg-white/75 p-7 text-center shadow-[0_16px_38px_rgba(26,42,42,0.08)]">
              <div className="mb-3 text-3xl text-[#0F766E]">🕌</div>
              <h3 className="text-xl font-serif text-[#0F766E]">Akad Nikah</h3>
              <p className="mt-3 text-sm text-[#1a2a2a]/65">{data.akadDate}</p>
              <p className="text-sm text-[#1a2a2a]/65">{data.akadTime}</p>
              <p className="mt-3 text-sm">{data.akadLocation}</p>
            </div>
            <div className="rounded-[2rem] border border-[#D4AF37]/25 bg-[#0F766E] p-7 text-center text-white shadow-[0_16px_38px_rgba(15,118,110,0.14)]">
              <div className="mb-3 text-3xl text-[#D4AF37]">🎊</div>
              <h3 className="text-xl font-serif text-[#D4AF37]">Resepsi</h3>
              <p className="mt-3 text-sm text-white/75">{data.resepsiDate}</p>
              <p className="text-sm text-white/75">{data.resepsiTime}</p>
              <p className="mt-3 text-sm text-white/90">{data.resepsiLocation}</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <a
              href={data.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-white/75 px-6 py-2.5 text-sm text-[#0F766E] transition-colors hover:bg-white"
            >
              📍 Lihat Lokasi di Maps
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#0F766E]">
          Konfirmasi Kehadiran
        </p>
        <h2 className="mb-8 text-3xl font-serif">RSVP</h2>
        <RSVPForm templateId="islamic-elegant" invitationId={invitationId} />
      </section>

      <section className="border-t border-[#D4AF37]/25 px-6 py-16 text-center">
        <div className="mb-4 text-3xl text-[#0F766E]">☪</div>
        <p className="mx-auto max-w-md text-sm text-[#1a2a2a]/70">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <p className="mt-6 text-xs text-[#1a2a2a]/40">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
