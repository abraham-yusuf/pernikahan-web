interface InvitationJsonLdProps {
  bride: string;
  groom: string;
  akadDate: string;
  akadLocation: string;
  resepsiDate: string;
  resepsiLocation: string;
  slug: string;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://nikah-digital.vercel.app";

export function InvitationJsonLd({
  bride,
  groom,
  akadDate,
  akadLocation,
  resepsiDate,
  resepsiLocation,
  slug,
}: InvitationJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Pernikahan ${bride} & ${groom}`,
    description: `Anda diundang ke pernikahan ${bride} & ${groom}`,
    url: `${BASE_URL}/u/${slug}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    subEvent: [
      {
        "@type": "Event",
        name: "Akad Nikah",
        startDate: akadDate,
        location: {
          "@type": "Place",
          name: akadLocation,
        },
      },
      {
        "@type": "Event",
        name: "Resepsi",
        startDate: resepsiDate,
        location: {
          "@type": "Place",
          name: resepsiLocation,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
