import "server-only";

import { ID, Query, type Models } from "node-appwrite";
import { createAdminClient } from "./appwrite";
import { COLLECTIONS, DATABASE_ID } from "./collections";

export type AppwriteDocument<T extends object> = Models.Document & T;
export type AppwriteDocumentList<T extends object> = Models.DocumentList<
  AppwriteDocument<T>
>;

export type UserTier = "free" | "premium";
export type SubscriptionStatus =
  | "none"
  | "pending"
  | "active"
  | "past_due"
  | "cancelled";
export type PreferredLanguage = "id" | "en";
export type InvitationStatus = "draft" | "published" | "archived";
export type RSVPAttendance = "hadir" | "tidak_hadir";
export type TemplateTierAccess = "free" | "premium";
export type TemplateStatus = "active" | "draft" | "archived";
export type PaymentCurrency = "idr";
export type PaymentPlan = "premium_invitation";
export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "expired";

export interface UserDoc {
  authUserId: string;
  email: string;
  fullName: string;
  tier: UserTier;
  subscriptionStatus: SubscriptionStatus;
  preferredLanguage: PreferredLanguage;
  whatsappNumber?: string;
  defaultTemplateId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationDoc {
  userId: string;
  templateId: string;
  slug: string;
  title: string;
  status: InvitationStatus;
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
  customPrimaryColor?: string;
  customAccentColor?: string;
  coverImageFileId?: string;
  galleryFileIds?: string[];
  rsvpEnabled: boolean;
  watermarkEnabled: boolean;
  publishedAt?: string;
  lastViewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RSVPResponseDoc {
  invitationId: string;
  guestName: string;
  attendance: RSVPAttendance;
  guestCount: number;
  message?: string;
  guestPhone?: string;
  guestTag?: string;
  submittedAt: string;
  createdAt: string;
}

export interface TemplateDoc {
  templateKey: string;
  name: string;
  description: string;
  region: string;
  category: string;
  previewColor: string;
  accentColor: string;
  bgPattern: string;
  componentName: string;
  tierAccess: TemplateTierAccess;
  status: TemplateStatus;
  sortOrder: number;
  thumbnailFileId?: string;
  isFeatured: boolean;
  createdByUserId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentDoc {
  userId: string;
  invitationId?: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string;
  stripeCustomerId?: string;
  amount: number;
  currency: PaymentCurrency;
  plan: PaymentPlan;
  status: PaymentStatus;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsDoc {
  invitationId: string;
  dateKey: string;
  pageViews: number;
  uniqueVisitors: number;
  rsvpCount: number;
  lastViewedAt?: string;
  lastRsvpAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserDocument = AppwriteDocument<UserDoc>;
export type InvitationDocument = AppwriteDocument<InvitationDoc>;
export type RSVPResponseDocument = AppwriteDocument<RSVPResponseDoc>;
export type TemplateDocument = AppwriteDocument<TemplateDoc>;
export type PaymentDocument = AppwriteDocument<PaymentDoc>;
export type AnalyticsDocument = AppwriteDocument<AnalyticsDoc>;

export async function createRSVPResponse(
  data: Omit<RSVPResponseDoc, "createdAt">
): Promise<RSVPResponseDocument> {
  const { databases } = createAdminClient();

  return databases.createDocument<RSVPResponseDocument>(
    DATABASE_ID,
    COLLECTIONS.RSVP_RESPONSES,
    ID.unique(),
    { ...data, createdAt: new Date().toISOString() }
  );
}

export async function listRSVPsByInvitation(
  invitationId: string,
  limit = 50,
  offset = 0
): Promise<AppwriteDocumentList<RSVPResponseDoc>> {
  const { databases } = createAdminClient();

  return databases.listDocuments<RSVPResponseDocument>(
    DATABASE_ID,
    COLLECTIONS.RSVP_RESPONSES,
    [
      Query.equal("invitationId", invitationId),
      Query.orderDesc("submittedAt"),
      Query.limit(limit),
      Query.offset(offset),
    ]
  );
}

export async function countRSVPsByInvitation(invitationId: string) {
  const { databases } = createAdminClient();

  const [attending, notAttending] = await Promise.all([
    databases.listDocuments<RSVPResponseDocument>(
      DATABASE_ID,
      COLLECTIONS.RSVP_RESPONSES,
      [
        Query.equal("invitationId", invitationId),
        Query.equal("attendance", "hadir"),
        Query.limit(1),
      ]
    ),
    databases.listDocuments<RSVPResponseDocument>(
      DATABASE_ID,
      COLLECTIONS.RSVP_RESPONSES,
      [
        Query.equal("invitationId", invitationId),
        Query.equal("attendance", "tidak_hadir"),
        Query.limit(1),
      ]
    ),
  ]);

  return {
    attending: attending.total,
    notAttending: notAttending.total,
    total: attending.total + notAttending.total,
  };
}

export async function getInvitationBySlug(
  slug: string
): Promise<InvitationDocument | null> {
  const { databases } = createAdminClient();
  const result = await databases.listDocuments<InvitationDocument>(
    DATABASE_ID,
    COLLECTIONS.INVITATIONS,
    [Query.equal("slug", slug), Query.limit(1)]
  );

  return result.documents[0] ?? null;
}

export async function getInvitationById(
  id: string
): Promise<InvitationDocument | null> {
  const { databases } = createAdminClient();

  try {
    return await databases.getDocument<InvitationDocument>(
      DATABASE_ID,
      COLLECTIONS.INVITATIONS,
      id
    );
  } catch (error) {
    if ((error as { code?: number }).code === 404) {
      return null;
    }

    throw error;
  }
}

export async function createInvitation(
  data: Omit<
    InvitationDoc,
    "createdAt" | "updatedAt" | "publishedAt" | "lastViewedAt"
  >
): Promise<InvitationDocument> {
  const { databases } = createAdminClient();
  const now = new Date().toISOString();

  return databases.createDocument<InvitationDocument>(
    DATABASE_ID,
    COLLECTIONS.INVITATIONS,
    ID.unique(),
    { ...data, createdAt: now, updatedAt: now }
  );
}

export async function listInvitationsByUser(
  userId: string,
  limit = 20,
  offset = 0
): Promise<AppwriteDocumentList<InvitationDoc>> {
  const { databases } = createAdminClient();

  return databases.listDocuments<InvitationDocument>(
    DATABASE_ID,
    COLLECTIONS.INVITATIONS,
    [
      Query.equal("userId", userId),
      Query.orderDesc("updatedAt"),
      Query.limit(limit),
      Query.offset(offset),
    ]
  );
}

export async function updateInvitation(
  id: string,
  data: Partial<Omit<InvitationDoc, "userId" | "createdAt">>
): Promise<InvitationDocument> {
  const { databases } = createAdminClient();

  return databases.updateDocument<InvitationDocument>(
    DATABASE_ID,
    COLLECTIONS.INVITATIONS,
    id,
    { ...data, updatedAt: new Date().toISOString() }
  );
}

export async function deleteInvitation(id: string): Promise<void> {
  const { databases } = createAdminClient();

  await databases.deleteDocument(DATABASE_ID, COLLECTIONS.INVITATIONS, id);
}
