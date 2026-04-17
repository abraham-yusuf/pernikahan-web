import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HomeHeroActions } from "@/components/HomeHeroActions";
import { Footer } from "@/components/Footer";
import { TemplateCard } from "@/components/TemplateCard";
import { StartPremiumCheckoutButton } from "@/components/payment/StartPremiumCheckoutButton";
import { createSupabaseAdminClient } from "@/lib/supabase";

async function getHomeTemplates() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("templates")
      .select(
        "template_key, name, description, category, preview_color, accent_color"
      )
      .eq("status", "active")
      .order("sort_order", { ascending: true });

    if (error) {
      throw error;
    }

    return (data ?? []).map((template) => ({
      id: template.template_key,
      name: template.name,
      description: template.description,
      category: template.category,
      previewColor: template.preview_color,
      accentColor: template.accent_color,
    }));
  } catch (error) {
    console.error("Home templates load error:", error);
    return [];
  }
}

export default async function Home() {
  const templates = await getHomeTemplates();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-amber-50/50 to-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <span className="text-6xl mb-6 block">💍</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Undangan Pernikahan{" "}
            <span className="text-primary">Digital</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Buat undangan pernikahan digital yang cantik dan elegan dalam
            hitungan menit. Pilih template, customize, dan bagikan ke tamu
            undangan Anda.
          </p>
          <HomeHeroActions />
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kenapa NikahDigital?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Platform terlengkap untuk membuat undangan pernikahan digital
              impian Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Template Beragam",
                desc: "Pilih dari berbagai tema: modern, tradisional Jawa, floral, dan lainnya.",
              },
              {
                icon: "✏️",
                title: "Mudah Dikustomisasi",
                desc: "Edit teks, foto, warna, dan detail acara sesuai keinginan Anda.",
              },
              {
                icon: "📋",
                title: "RSVP & Tamu",
                desc: "Kelola daftar tamu dan konfirmasi kehadiran secara online.",
              },
              {
                icon: "📱",
                title: "Mobile Friendly",
                desc: "Tampil sempurna di semua perangkat, dari HP hingga desktop.",
              },
              {
                icon: "🔗",
                title: "Mudah Dibagikan",
                desc: "Bagikan via WhatsApp, Instagram, atau link langsung.",
              },
              {
                icon: "⚡",
                title: "Cepat & Ringan",
                desc: "Loading cepat dan performa optimal untuk pengalaman terbaik.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Gallery */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pilih Template Favorit
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Koleksi template undangan pernikahan digital dengan berbagai tema
              dan gaya desain.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Harga Terjangkau
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Mulai gratis, upgrade kapan saja untuk fitur premium.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gratis
              </h3>
              <div className="text-4xl font-bold text-gray-900 mb-4">
                Rp 0
              </div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 1 template basic
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> RSVP online
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Hitung mundur
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-300">✗</span> Watermark
                  NikahDigital
                </li>
              </ul>
              <Link
                href="/undangan/modern-elegant"
                className="block text-center w-full py-2.5 rounded-full border-2 border-gray-200 text-gray-700 font-medium hover:border-primary hover:text-primary transition-colors"
              >
                Coba Gratis
              </Link>
            </div>
            <div className="bg-gray-900 text-white rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full">
                Populer
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-1">
                Rp 99.000
              </div>
              <p className="text-white/50 text-sm mb-4">per undangan</p>
              <ul className="space-y-3 text-sm text-white/80 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Semua template
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> RSVP &amp; guest
                  management
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Tanpa watermark
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Custom domain
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span> Galeri foto
                </li>
              </ul>
              <StartPremiumCheckoutButton
                label="Pilih Premium"
                className="w-full py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Testimonial Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cerita Pengguna Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ratusan pasangan telah mempercayakan undangan digital mereka bersama
              NikahDigital.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Nadia & Arif",
                quote:
                  "Tampilannya elegan, proses edit sangat cepat, dan RSVP langsung terkumpul rapi.",
              },
              {
                name: "Citra & Bimo",
                quote:
                  "Bisa langsung share ke WhatsApp keluarga. Dalam 1 malam undangan beres semua!",
              },
              {
                name: "Dina & Fajar",
                quote:
                  "Support-nya responsif, pilihannya banyak, dan premium sangat worth it.",
              },
            ].map((testimonial) => (
              <figure
                key={testimonial.name}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6"
              >
                <blockquote className="text-gray-700 leading-relaxed">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-gray-900">
                  {testimonial.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="text-gray-600">
              Jawaban cepat sebelum Anda mulai membuat undangan.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                question: "Apakah bisa mulai gratis?",
                answer:
                  "Bisa. Paket gratis tersedia untuk mencoba fitur inti sebelum upgrade ke premium.",
              },
              {
                question: "Berapa lama proses membuat undangan?",
                answer:
                  "Rata-rata 10-20 menit tergantung kelengkapan konten foto dan detail acara.",
              },
              {
                question: "Apakah undangan bisa dibuka di semua perangkat?",
                answer:
                  "Ya, semua template sudah mobile-friendly dan tetap optimal di desktop.",
              },
              {
                question: "Bisakah saya ganti template setelah memilih?",
                answer:
                  "Bisa. Anda dapat mengganti template kapan saja sebelum undangan dipublikasikan.",
              },
            ].map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-gray-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none font-semibold text-gray-900">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-white to-amber-50/50">
        <div className="max-w-2xl mx-auto">
          <span className="text-5xl mb-4 block">💒</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Siap Buat Undangan Impian?
          </h2>
          <p className="text-gray-600 mb-8">
            Mulai sekarang dan buat undangan pernikahan digital yang berkesan
            untuk hari bahagia Anda.
          </p>
          <Link
            href="#templates"
            className="px-8 py-3.5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors text-lg inline-block"
          >
            Mulai Sekarang - Gratis!
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
