import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://nikah-digital.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "NikahDigital - Undangan Pernikahan Digital",
    template: "%s | NikahDigital",
  },
  description:
    "Platform undangan pernikahan digital terbaik di Indonesia. Pilih dari berbagai template cantik, customize, dan bagikan undangan Anda.",
  keywords: [
    "undangan pernikahan",
    "undangan digital",
    "wedding invitation",
    "pernikahan",
    "nikah",
    "undangan online",
    "nikah digital",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "NikahDigital",
    title: "NikahDigital - Undangan Pernikahan Digital",
    description: "Platform undangan pernikahan digital terbaik di Indonesia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NikahDigital - Undangan Pernikahan Digital",
    description: "Platform undangan pernikahan digital terbaik di Indonesia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
