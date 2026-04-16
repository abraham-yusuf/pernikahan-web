import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TemplateCard } from "@/components/TemplateCard";
import { templates } from "@/lib/data";
import { StartPremiumCheckoutButton } from "@/components/payment/StartPremiumCheckoutButton";

export default function Home() {
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#templates"
              className="px-8 py-3.5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors text-lg"
            >
              Lihat Template
            </Link>
            <Link
              href="/undangan/modern-elegant"
              className="px-8 py-3.5 border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:border-primary hover:text-primary transition-colors text-lg"
            >
              Demo Undangan
            </Link>
          </div>
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
