export interface WeddingTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  region: string;
  previewColor: string;
  accentColor: string;
  bgPattern: string;
}

export interface WeddingEvent {
  bride: string;
  groom: string;
  brideParents: string;
  groomParents: string;
  akadDate: string;
  akadTime: string;
  akadLocation: string;
  resepsiDate: string;
  resepsiTime: string;
  resepsiLocation: string;
  mapUrl: string;
  story: string;
}

export interface RSVPEntry {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir";
  jumlahTamu: number;
  ucapan: string;
  createdAt: string;
}

export const templates: WeddingTemplate[] = [
  {
    id: "modern-elegant",
    name: "Modern Elegant",
    description:
      "Desain modern minimalis dengan sentuhan emas yang elegan. Cocok untuk pasangan yang menyukai kesederhanaan.",
    category: "Modern",
    region: "Indonesia",
    previewColor: "#1a1a2e",
    accentColor: "#c9a84c",
    bgPattern: "geometric",
  },
  {
    id: "adat-jawa",
    name: "Adat Jawa",
    description:
      "Tema tradisional Jawa dengan motif batik dan ornamen wayang. Sempurna untuk pernikahan adat.",
    category: "Tradisional",
    region: "Jawa Tengah",
    previewColor: "#4a1a0a",
    accentColor: "#d4a574",
    bgPattern: "batik",
  },
  {
    id: "floral-garden",
    name: "Floral Garden",
    description:
      "Desain romantis dengan hiasan bunga-bunga cantik. Ideal untuk pernikahan di taman atau outdoor.",
    category: "Romantis",
    region: "Indonesia",
    previewColor: "#2d4a3e",
    accentColor: "#e8a0bf",
    bgPattern: "floral",
  },
  {
    id: "adat-sunda",
    name: "Adat Sunda",
    description:
      "Tema pernikahan adat Sunda dengan motif mega mendung dan nuansa biru pastel yang menenangkan.",
    category: "Tradisional",
    region: "Jawa Barat",
    previewColor: "#1a3a5c",
    accentColor: "#F4C95D",
    bgPattern: "mega-mendung",
  },
  {
    id: "adat-minang",
    name: "Adat Minang",
    description:
      "Tema adat Minangkabau dengan ukiran tradisional dan nuansa emas kerajaan yang megah.",
    category: "Tradisional",
    region: "Sumatera Barat",
    previewColor: "#2C1B12",
    accentColor: "#D4AF37",
    bgPattern: "minang-ukir",
  },
  {
    id: "adat-bali",
    name: "Adat Bali",
    description:
      "Tema pernikahan Bali dengan ornamen candi dan nuansa emas tropis yang sakral.",
    category: "Tradisional",
    region: "Bali",
    previewColor: "#2d1f0e",
    accentColor: "#D4AF37",
    bgPattern: "bali-relief",
  },
  {
    id: "adat-batak",
    name: "Adat Batak",
    description:
      "Tema adat Batak dengan ornamen gorga dan kombinasi merah-hitam yang tegas dan gagah.",
    category: "Tradisional",
    region: "Sumatera Utara",
    previewColor: "#8B1E1E",
    accentColor: "#111111",
    bgPattern: "gorga",
  },
  {
    id: "adat-bugis-makassar",
    name: "Adat Bugis-Makassar",
    description:
      "Tema adat Bugis-Makassar dengan nuansa kerajaan emas dan maroon yang agung.",
    category: "Tradisional",
    region: "Sulawesi Selatan",
    previewColor: "#6E1E2A",
    accentColor: "#C9A227",
    bgPattern: "lontara",
  },
  {
    id: "adat-betawi",
    name: "Adat Betawi",
    description:
      "Tema adat Betawi yang ceria dengan motif gigi balang dan warna-warna semarak khas Jakarta.",
    category: "Tradisional",
    region: "DKI Jakarta",
    previewColor: "#F28C28",
    accentColor: "#2E8B57",
    bgPattern: "gigi-balang",
  },
  {
    id: "adat-dayak",
    name: "Adat Dayak",
    description:
      "Tema etnik Dayak dengan motif perisai dan pola geometris tribal bernuansa bumi Kalimantan.",
    category: "Etnik",
    region: "Kalimantan",
    previewColor: "#5A3E2B",
    accentColor: "#C46B2D",
    bgPattern: "dayak-shield",
  },
  {
    id: "adat-aceh",
    name: "Adat Aceh",
    description:
      "Tema adat Aceh dengan ornamen arabesque dan nuansa hijau emas yang islami dan elegan.",
    category: "Islami",
    region: "Aceh",
    previewColor: "#0B6E4F",
    accentColor: "#D4AF37",
    bgPattern: "aceh-arabesque",
  },
  {
    id: "islamic-elegant",
    name: "Islamic Elegant",
    description:
      "Tema islami elegan dengan pola mashrabiya dan kaligrafi, nuansa teal dan emas yang timeless.",
    category: "Islami",
    region: "Pan-Islamic Indonesian",
    previewColor: "#0F766E",
    accentColor: "#D4AF37",
    bgPattern: "mashrabiya",
  },
  {
    id: "rustic-nusantara",
    name: "Rustic Nusantara",
    description:
      "Tema rustic Nusantara dengan tekstur kayu dan aksen batik, sempurna untuk pernikahan outdoor yang hangat.",
    category: "Rustic",
    region: "Indonesian destination wedding",
    previewColor: "#8C6A43",
    accentColor: "#C9A77D",
    bgPattern: "wood-grain",
  },
];

export const demoEvent: WeddingEvent = {
  bride: "Anisa Rahma",
  groom: "Budi Santoso",
  brideParents: "Bapak Ahmad & Ibu Siti",
  groomParents: "Bapak Hendra & Ibu Dewi",
  akadDate: "Sabtu, 15 Juni 2026",
  akadTime: "08:00 - 10:00 WIB",
  akadLocation: "Masjid Al-Ikhlas, Jakarta Selatan",
  resepsiDate: "Sabtu, 15 Juni 2026",
  resepsiTime: "11:00 - 14:00 WIB",
  resepsiLocation: "Ballroom Hotel Grand Sahid, Jakarta",
  mapUrl: "https://maps.google.com/?q=-6.2088,106.8456",
  story:
    "Kami bertemu pertama kali di bangku kuliah tahun 2020. Dari teman sekelas, menjadi sahabat, dan kini kami siap membangun rumah tangga bersama. Alhamdulillah.",
};
