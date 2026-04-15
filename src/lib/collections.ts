/**
 * Appwrite Database and Collection IDs.
 * Set via environment variables; fall back to empty strings for build safety.
 */
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? "";

export const COLLECTIONS = {
  USERS: process.env.NEXT_PUBLIC_COLLECTION_USERS ?? "",
  INVITATIONS: process.env.NEXT_PUBLIC_COLLECTION_INVITATIONS ?? "",
  RSVP_RESPONSES: process.env.NEXT_PUBLIC_COLLECTION_RSVP_RESPONSES ?? "",
  TEMPLATES: process.env.NEXT_PUBLIC_COLLECTION_TEMPLATES ?? "",
  PAYMENTS: process.env.NEXT_PUBLIC_COLLECTION_PAYMENTS ?? "",
  ANALYTICS: process.env.NEXT_PUBLIC_COLLECTION_ANALYTICS ?? "",
} as const;

export const RSVP_STORAGE_CONFIGURED = Boolean(
  DATABASE_ID && COLLECTIONS.INVITATIONS && COLLECTIONS.RSVP_RESPONSES
);

export const INVITATION_STORAGE_CONFIGURED = Boolean(
  DATABASE_ID && COLLECTIONS.INVITATIONS && COLLECTIONS.USERS
);
