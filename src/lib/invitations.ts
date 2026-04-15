import "server-only";

export function generateSlug(bride: string, groom: string): string {
  const brideFirst = bride.trim().split(/\s+/)[0].toLowerCase();
  const groomFirst = groom.trim().split(/\s+/)[0].toLowerCase();
  const suffix = Math.random().toString(36).slice(2, 8);

  return `${brideFirst}-${groomFirst}-${suffix}`.replace(/[^a-z0-9-]/g, "");
}

export interface CreateInvitationInput {
  templateId: string;
  title: string;
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
  mapUrl?: string;
  story?: string;
}

export function validateCreateInvitationInput(body: unknown): {
  data?: CreateInvitationInput;
  error?: string;
} {
  if (!body || typeof body !== "object") {
    return { error: "Request body is required." };
  }

  const b = body as Record<string, unknown>;

  const required: Array<[string, string]> = [
    ["templateId", "Template ID"],
    ["title", "Judul undangan"],
    ["bride", "Nama mempelai wanita"],
    ["groom", "Nama mempelai pria"],
    ["brideParents", "Orang tua mempelai wanita"],
    ["groomParents", "Orang tua mempelai pria"],
    ["akadDate", "Tanggal akad"],
    ["akadTime", "Waktu akad"],
    ["akadLocation", "Lokasi akad"],
    ["resepsiDate", "Tanggal resepsi"],
    ["resepsiTime", "Waktu resepsi"],
    ["resepsiLocation", "Lokasi resepsi"],
  ];

  for (const [key, label] of required) {
    if (
      !b[key] ||
      typeof b[key] !== "string" ||
      b[key].trim().length === 0
    ) {
      return { error: `${label} wajib diisi.` };
    }
  }

  return {
    data: {
      templateId: (b.templateId as string).trim(),
      title: (b.title as string).trim(),
      bride: (b.bride as string).trim(),
      groom: (b.groom as string).trim(),
      brideParents: (b.brideParents as string).trim(),
      groomParents: (b.groomParents as string).trim(),
      akadDate: (b.akadDate as string).trim(),
      akadTime: (b.akadTime as string).trim(),
      akadLocation: (b.akadLocation as string).trim(),
      resepsiDate: (b.resepsiDate as string).trim(),
      resepsiTime: (b.resepsiTime as string).trim(),
      resepsiLocation: (b.resepsiLocation as string).trim(),
      mapUrl: typeof b.mapUrl === "string" ? b.mapUrl.trim() || undefined : undefined,
      story: typeof b.story === "string" ? b.story.trim() || undefined : undefined,
    },
  };
}

export interface UpdateInvitationInput {
  title?: string;
  bride?: string;
  groom?: string;
  brideParents?: string;
  groomParents?: string;
  akadDate?: string;
  akadTime?: string;
  akadLocation?: string;
  resepsiDate?: string;
  resepsiTime?: string;
  resepsiLocation?: string;
  mapUrl?: string;
  story?: string;
  status?: "draft" | "published" | "archived";
}

export function validateUpdateInvitationInput(body: unknown): {
  data?: UpdateInvitationInput;
  error?: string;
} {
  if (!body || typeof body !== "object") {
    return { error: "Request body is required." };
  }

  const b = body as Record<string, unknown>;
  const data: UpdateInvitationInput = {};

  const stringFields = [
    "title",
    "bride",
    "groom",
    "brideParents",
    "groomParents",
    "akadDate",
    "akadTime",
    "akadLocation",
    "resepsiDate",
    "resepsiTime",
    "resepsiLocation",
    "mapUrl",
    "story",
  ] as const;

  for (const key of stringFields) {
    if (key in b && typeof b[key] === "string") {
      data[key] = b[key].trim();
    }
  }

  if ("status" in b) {
    const s = b.status;
    if (s !== "draft" && s !== "published" && s !== "archived") {
      return { error: "status must be 'draft', 'published', or 'archived'." };
    }
    data.status = s;
  }

  if (Object.keys(data).length === 0) {
    return { error: "At least one field must be provided." };
  }

  return { data };
}
