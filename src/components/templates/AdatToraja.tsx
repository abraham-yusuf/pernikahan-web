import { demoEvent, type WeddingEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

interface TemplateProps {
  event?: WeddingEvent;
  invitationId?: string;
}

export function AdatTorajaTemplate({ event, invitationId }: TemplateProps) {
  const data = event ?? demoEvent;

  return (
    <div className="min-h-screen bg-[#F4ECE1] text-[#2E221B]">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#D8B36A_0%,#F4ECE1_55%,#EFE2CF_100%)]" />
        <div className="absolute left-6 top-10 text-4xl text-[#7A1F1F]/25">▰▰▰</div>
        <div className="absolute right-6 bottom-12 text-4xl text-[#111111]/20">◈ ◈ ◈</div>
        <div className="relative z-10 max-w-3xl animate-fade-in rounded-[2rem] border border-[#7A1F1F]/30 bg-[#F4ECE1]/85 px-8 py-12 shadow-[0_24px_80px_rgba(46,34,27,0.14)] backdrop-blur-sm sm:px-14">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-[#7A1F1F]">
            Undangan Adat Toraja
          </p>
          <div className="mb-5 text-5xl text-[#D8B36A]">🏛️</div>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.bride}</h1>
          <div className="my-5 flex items-center justify-center gap-4 text-[#7A1F1F]">
            <span className="h-px w-14 bg-current" />
            <span className="text-2xl text-[#D8B36A]">❦</span>
            <span className="h-px w-14 bg-current" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl">{data.groom}</h1>
          <p className="mt-5 text-lg text-[#2E221B]/70">{data.akadDate}</p>
        </div>
      </section>

      <section className="px-6 py-14 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#111111]/15 bg-white/55 p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#7A1F1F]">
            Tongkonan Heritage
          </p>
          <p className="font-serif text-3xl text-[#2E221B]">
            Dalam adat, keluarga, dan doa leluhur, kami melangkah menuju hidup baru.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#2E221B]/75">
            Dengan hangatnya nuansa Toraja, kami mengundang Bapak/Ibu/Saudara/i
            untuk hadir merayakan momen sakral kami.
          </p>
        </div>
      </section>

      <section className="bg-[#7A1F1F] px-6 py-12 text-center text-[#F4ECE1]">
        <p className="mb-5 text-sm uppercase tracking-[0.3em]">Menghitung Hari Bahagia</p>
        <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-[#7A1F1F]">Mempelai</p>
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-[#D8B36A]/40 bg-white/70 p-7">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#D8B36A]/40 bg-[#D8B36A]/10 text-4xl text-[#7A1F1F]">
              👰
            </div>
            <h3 className="font-serif text-3xl">{data.bride}</h3>
            <p className="mt-2 text-sm text-[#2E221B]/70">Putri dari {data.brideParents}</p>
          </div>
          <div className="rounded-[2rem] border border-[#111111]/25 bg-[#111111] p-7 text-[#F4ECE1]">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#D8B36A]/50 bg-[#D8B36A]/15 text-4xl">
              🤵
            </div>
            <h3 className="font-serif text-3xl">{data.groom}</h3>
            <p className="mt-2 text-sm text-[#F4ECE1]/75">Putra dari {data.groomParents}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-[#7A1F1F]">Waktu &amp; Tempat</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[2rem] border border-[#111111]/20 bg-white/70 p-7 text-center">
            <div className="mb-3 text-3xl text-[#7A1F1F]">🕌</div>
            <h3 className="font-serif text-2xl">Akad Nikah</h3>
            <p className="mt-3 text-sm text-[#2E221B]/70">{data.akadDate}</p>
            <p className="text-sm text-[#2E221B]/70">{data.akadTime}</p>
            <p className="mt-3 text-sm">{data.akadLocation}</p>
          </div>
          <div className="rounded-[2rem] border border-[#7A1F1F]/30 bg-[#7A1F1F] p-7 text-center text-[#F4ECE1]">
            <div className="mb-3 text-3xl text-[#D8B36A]">🎉</div>
            <h3 className="font-serif text-2xl">Resepsi</h3>
            <p className="mt-3 text-sm text-[#F4ECE1]/75">{data.resepsiDate}</p>
            <p className="text-sm text-[#F4ECE1]/75">{data.resepsiTime}</p>
            <p className="mt-3 text-sm">{data.resepsiLocation}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href={data.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#7A1F1F]/35 bg-white/75 px-6 py-2.5 text-sm text-[#7A1F1F] transition-colors hover:bg-white"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#7A1F1F]">Konfirmasi Kehadiran</p>
        <h2 className="mb-8 font-serif text-3xl">RSVP</h2>
        <RSVPForm templateId="adat-toraja" invitationId={invitationId} />
      </section>

      <section className="border-t border-[#111111]/15 px-6 py-14 text-center">
        <p className="mx-auto max-w-md text-sm text-[#2E221B]/70">
          Kehadiran dan doa restu Anda menjadi sukacita besar bagi perjalanan rumah tangga kami.
        </p>
        <p className="mt-6 text-xs text-[#2E221B]/40">Dibuat dengan ❤️ menggunakan NikahDigital</p>
      </section>
    </div>
  );
}
