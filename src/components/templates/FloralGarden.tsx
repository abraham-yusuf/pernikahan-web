import { demoEvent, type WeddingEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

interface TemplateProps {
  event?: WeddingEvent;
  invitationId?: string;
}

export function FloralGardenTemplate({ event, invitationId }: TemplateProps) {
  const data = event ?? demoEvent;
  return (
    <div className="min-h-screen bg-[#fdf6f0] text-[#2d4a3e]">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 text-8xl opacity-20 -rotate-12">
          🌸
        </div>
        <div className="absolute top-10 right-0 text-6xl opacity-15 rotate-12">
          🌺
        </div>
        <div className="absolute bottom-20 left-10 text-7xl opacity-15">
          🌷
        </div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-20 -rotate-45">
          🌹
        </div>

        <div className="relative z-10 animate-fade-in">
          <p className="text-[#e8a0bf] text-sm tracking-[0.2em] uppercase mb-6">
            We are getting married
          </p>
          <h1 className="text-5xl sm:text-7xl font-serif mb-3 text-[#2d4a3e]">
            {data.bride}
          </h1>
          <div className="text-[#e8a0bf] text-3xl my-3">🌸</div>
          <h1 className="text-5xl sm:text-7xl font-serif mb-8 text-[#2d4a3e]">
            {data.groom}
          </h1>
          <p className="text-[#2d4a3e]/50 text-lg">{data.akadDate}</p>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 px-6 text-center bg-[#2d4a3e] text-white">
        <p className="text-[#e8a0bf] text-sm tracking-[0.2em] uppercase mb-6">
          Menghitung Hari
        </p>
        <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
      </section>

      {/* Couple */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <p className="text-[#e8a0bf] text-sm tracking-[0.2em] uppercase mb-8">
          The Happy Couple
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="animate-slide-up">
            <div className="w-32 h-32 mx-auto rounded-full bg-[#e8a0bf]/20 flex items-center justify-center text-4xl mb-4 border-2 border-[#e8a0bf]/30">
              👰
            </div>
            <h3 className="text-2xl font-serif mb-1">{data.bride}</h3>
            <p className="text-[#2d4a3e]/50 text-sm">
              Putri dari {data.brideParents}
            </p>
          </div>
          <div className="animate-slide-up">
            <div className="w-32 h-32 mx-auto rounded-full bg-[#e8a0bf]/20 flex items-center justify-center text-4xl mb-4 border-2 border-[#e8a0bf]/30">
              🤵
            </div>
            <h3 className="text-2xl font-serif mb-1">{data.groom}</h3>
            <p className="text-[#2d4a3e]/50 text-sm">
              Putra dari {data.groomParents}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <p className="text-[#e8a0bf] text-sm tracking-[0.2em] uppercase mb-4">
          Our Love Story
        </p>
        <div className="text-3xl mb-4">💕</div>
        <p className="text-[#2d4a3e]/70 leading-relaxed italic">
          &ldquo;{data.story}&rdquo;
        </p>
      </section>

      {/* Events */}
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <p className="text-[#e8a0bf] text-sm tracking-[0.2em] uppercase mb-8 text-center">
          Wedding Events
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#e8a0bf]/20">
            <div className="text-3xl mb-3">🕌</div>
            <h3 className="text-xl font-serif mb-2 text-[#e8a0bf]">
              Akad Nikah
            </h3>
            <p className="text-[#2d4a3e]/60 text-sm mb-1">
              {data.akadDate}
            </p>
            <p className="text-[#2d4a3e]/60 text-sm mb-3">
              {data.akadTime}
            </p>
            <p className="text-sm">{data.akadLocation}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-[#e8a0bf]/20">
            <div className="text-3xl mb-3">🎊</div>
            <h3 className="text-xl font-serif mb-2 text-[#e8a0bf]">Resepsi</h3>
            <p className="text-[#2d4a3e]/60 text-sm mb-1">
              {data.resepsiDate}
            </p>
            <p className="text-[#2d4a3e]/60 text-sm mb-3">
              {data.resepsiTime}
            </p>
            <p className="text-sm">{data.resepsiLocation}</p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a
            href={data.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2d4a3e] text-white hover:bg-[#1d3a2e] transition-colors text-sm"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <p className="text-[#e8a0bf] text-sm tracking-[0.2em] uppercase mb-2">
          Konfirmasi Kehadiran
        </p>
        <h2 className="text-3xl font-serif mb-8">RSVP</h2>
        <RSVPForm templateId="floral-garden" invitationId={invitationId} />
      </section>

      {/* Footer */}
      <section className="py-16 px-6 text-center bg-[#2d4a3e] text-white">
        <div className="text-3xl mb-4">🌸</div>
        <p className="text-white/60 text-sm max-w-md mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <p className="text-white/30 text-xs mt-6">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
