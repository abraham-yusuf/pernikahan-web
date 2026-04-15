export interface RSVPInput {
  invitationId: string;
  guestName: string;
  attendance: "hadir" | "tidak_hadir";
  guestCount: number;
  message?: string;
}

export function validateRSVPInput(body: unknown): {
  data?: RSVPInput;
  error?: string;
} {
  if (!body || typeof body !== "object") {
    return { error: "Request body is required." };
  }

  const { invitationId, guestName, attendance, guestCount, message } =
    body as Record<string, unknown>;

  if (!invitationId || typeof invitationId !== "string") {
    return { error: "invitationId is required." };
  }

  if (
    !guestName ||
    typeof guestName !== "string" ||
    guestName.trim().length < 2
  ) {
    return { error: "guestName must be at least 2 characters." };
  }

  if (attendance !== "hadir" && attendance !== "tidak_hadir") {
    return { error: "attendance must be 'hadir' or 'tidak_hadir'." };
  }

  const count = typeof guestCount === "number" ? guestCount : 1;
  if (count < 1 || count > 10) {
    return { error: "guestCount must be between 1 and 10." };
  }

  return {
    data: {
      invitationId: invitationId.trim(),
      guestName: guestName.trim(),
      attendance,
      guestCount: count,
      message:
        typeof message === "string"
          ? message.trim().slice(0, 500) || undefined
          : undefined,
    },
  };
}
