import { demoEvent, type WeddingEvent } from "@/lib/data";
import { CountdownTimer } from "../CountdownTimer";
import { RSVPForm } from "../RSVPForm";

interface TemplateProps {
  event?: WeddingEvent;
}

export function AdatJawaTemplate({ event }: TemplateProps) {
  const data = event ?? demoEvent;
  return (
    <div className="min-h-screen bg-[#f8f0e3] text-[#4a1a0a] bg-batik">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f0e3]/80 via-transparent to-[#f8f0e3]/80" />
        <div className="relative z-10 animate-fade-in">
          <div className="text-6xl mb-4">🏵️</div>
          <p className="text-[#8b6914] text-sm tracking-[0.2em] uppercase mb-4">
            Undangan Pernikahan
          </p>
          <div className="border-2 border-[#d4a574]/40 rounded-lg p-8 sm:p-12 bg-white/40 backdrop-blur-sm">
            <h1 className="text-4xl sm:text-6xl font-serif mb-2">
              {data.bride}
            </h1>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-px w-16 bg-[#d4a574]" />
              <span className="text-[#d4a574] text-2xl">☘</span>
              <div className="h-px w-16 bg-[#d4a574]" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif mb-4">
              {data.groom}
            </h1>
            <p className="text-[#4a1a0a]/60">{data.akadDate}</p>
          </div>
        </div>
      </section>

      {/* Ayat */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-white/50 rounded-2xl p-8 border border-[#d4a574]/30">
          <p className="text-sm italic text-[#4a1a0a]/70 leading-relaxed">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan
            merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih
            dan sayang.&rdquo;
          </p>
          <p className="text-xs text-[#8b6914] mt-3">— QS. Ar-Rum: 21</p>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-12 px-6 text-center">
        <p className="text-[#8b6914] text-sm tracking-[0.2em] uppercase mb-6">
          Menghitung Hari Bahagia
        </p>
        <div className="text-[#4a1a0a]">
          <CountdownTimer targetDate="2026-06-15T08:00:00+07:00" />
        </div>
      </section>

      {/* Couple */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <p className="text-[#8b6914] text-sm tracking-[0.2em] uppercase mb-8">
          Mempelai
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white/50 rounded-2xl p-6 border border-[#d4a574]/30">
            <div className="w-28 h-28 mx-auto rounded-full bg-[#d4a574]/20 flex items-center justify-center text-4xl mb-4 border-2 border-[#d4a574]/40">
              👰
            </div>
            <h3 className="text-2xl font-serif mb-1">{data.bride}</h3>
            <p className="text-[#4a1a0a]/50 text-sm">
              Putri dari {data.brideParents}
            </p>
          </div>
          <div className="bg-white/50 rounded-2xl p-6 border border-[#d4a574]/30">
            <div className="w-28 h-28 mx-auto rounded-full bg-[#d4a574]/20 flex items-center justify-center text-4xl mb-4 border-2 border-[#d4a574]/40">
              🤵
            </div>
            <h3 className="text-2xl font-serif mb-1">{data.groom}</h3>
            <p className="text-[#4a1a0a]/50 text-sm">
              Putra dari {data.groomParents}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <p className="text-[#8b6914] text-sm tracking-[0.2em] uppercase mb-6">
          Kisah Cinta Kami
        </p>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-[#d4a574]" />
          <span className="text-[#d4a574] text-xl">☘</span>
          <div className="h-px w-16 bg-[#d4a574]" />
        </div>
        <p className="text-[#4a1a0a]/70 leading-relaxed italic">
          &ldquo;{data.story}&rdquo;
        </p>
      </section>

      {/* Events */}
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <p className="text-[#8b6914] text-sm tracking-[0.2em] uppercase mb-8 text-center">
          Waktu &amp; Tempat
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/60 rounded-2xl p-6 text-center border border-[#d4a574]/30">
            <div className="text-3xl mb-3">🕌</div>
            <h3 className="text-xl font-serif mb-2 text-[#8b6914]">
              Akad Nikah
            </h3>
            <p className="text-[#4a1a0a]/60 text-sm mb-1">
              {data.akadDate}
            </p>
            <p className="text-[#4a1a0a]/60 text-sm mb-3">
              {data.akadTime}
            </p>
            <p className="text-sm">{data.akadLocation}</p>
          </div>
          <div className="bg-white/60 rounded-2xl p-6 text-center border border-[#d4a574]/30">
            <div className="text-3xl mb-3">🎊</div>
            <h3 className="text-xl font-serif mb-2 text-[#8b6914]">Resepsi</h3>
            <p className="text-[#4a1a0a]/60 text-sm mb-1">
              {data.resepsiDate}
            </p>
            <p className="text-[#4a1a0a]/60 text-sm mb-3">
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
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#d4a574]/60 text-[#8b6914] hover:bg-[#d4a574]/10 transition-colors text-sm"
          >
            📍 Lihat Lokasi di Maps
          </a>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <p className="text-[#8b6914] text-sm tracking-[0.2em] uppercase mb-2">
          Konfirmasi Kehadiran
        </p>
        <h2 className="text-3xl font-serif mb-8">RSVP</h2>
        <RSVPForm templateId="adat-jawa" />
      </section>

      {/* Footer */}
      <section className="py-16 px-6 text-center border-t border-[#d4a574]/20">
        <div className="text-[#d4a574] text-3xl mb-4">🏵️</div>
        <p className="text-[#4a1a0a]/50 text-sm max-w-md mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <p className="text-[#4a1a0a]/30 text-xs mt-6">
          Dibuat dengan ❤️ menggunakan NikahDigital
        </p>
      </section>
    </div>
  );
}
