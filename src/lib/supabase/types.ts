export type UserTier = "free" | "premium";
export type UserRole = "user" | "admin";
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
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded" | "expired";

export type UserRow = {
  id: string;
  auth_user_id: string;
  email: string;
  role: UserRole;
  full_name: string;
  tier: UserTier;
  subscription_status: SubscriptionStatus;
  preferred_language: PreferredLanguage;
  whatsapp_number: string | null;
  default_template_id: string | null;
  created_at: string;
  updated_at: string;
};

export type InvitationRow = {
  id: string;
  user_id: string;
  template_id: string;
  slug: string;
  title: string;
  status: InvitationStatus;
  bride: string;
  groom: string;
  bride_parents: string;
  groom_parents: string;
  akad_date: string;
  akad_time: string;
  akad_location: string;
  resepsi_date: string;
  resepsi_time: string;
  resepsi_location: string;
  map_url: string | null;
  story: string | null;
  custom_primary_color: string | null;
  custom_accent_color: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  rsvp_enabled: boolean;
  watermark_enabled: boolean;
  published_at: string | null;
  last_viewed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type RSVPResponseRow = {
  id: string;
  invitation_id: string;
  guest_name: string;
  attendance: RSVPAttendance;
  guest_count: number;
  message: string | null;
  guest_phone: string | null;
  guest_tag: string | null;
  submitted_at: string;
  created_at: string;
};

export type TemplateRow = {
  id: string;
  template_key: string;
  name: string;
  description: string;
  region: string;
  category: string;
  preview_color: string;
  accent_color: string;
  bg_pattern: string;
  component_name: string;
  tier_access: TemplateTierAccess;
  status: TemplateStatus;
  sort_order: number;
  thumbnail_url: string | null;
  is_featured: boolean;
  created_by_user_id: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentRow = {
  id: string;
  user_id: string;
  invitation_id: string | null;
  xendit_invoice_id: string;
  xendit_external_id: string;
  xendit_invoice_url: string | null;
  xendit_payment_method: string | null;
  xendit_payment_channel: string | null;
  amount: number;
  currency: PaymentCurrency;
  plan: PaymentPlan;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AnalyticsRow = {
  id: string;
  invitation_id: string;
  date_key: string;
  page_views: number;
  unique_visitors: number;
  rsvp_count: number;
  last_viewed_at: string | null;
  last_rsvp_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      users: {
        Row: UserRow;
        Insert: {
          id?: string;
          auth_user_id: string;
          email: string;
          role?: UserRole;
          full_name: string;
          tier?: UserTier;
          subscription_status?: SubscriptionStatus;
          preferred_language?: PreferredLanguage;
          whatsapp_number?: string | null;
          default_template_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<UserRow>;
        Relationships: [];
      };
      invitations: {
        Row: InvitationRow;
        Insert: {
          id?: string;
          user_id: string;
          template_id: string;
          slug: string;
          title: string;
          status?: InvitationStatus;
          bride: string;
          groom: string;
          bride_parents: string;
          groom_parents: string;
          akad_date: string;
          akad_time: string;
          akad_location: string;
          resepsi_date: string;
          resepsi_time: string;
          resepsi_location: string;
          map_url?: string | null;
          story?: string | null;
          custom_primary_color?: string | null;
          custom_accent_color?: string | null;
          cover_image_url?: string | null;
          gallery_urls?: string[] | null;
          rsvp_enabled?: boolean;
          watermark_enabled?: boolean;
          published_at?: string | null;
          last_viewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<InvitationRow>;
        Relationships: [];
      };
      rsvp_responses: {
        Row: RSVPResponseRow;
        Insert: {
          id?: string;
          invitation_id: string;
          guest_name: string;
          attendance: RSVPAttendance;
          guest_count: number;
          message?: string | null;
          guest_phone?: string | null;
          guest_tag?: string | null;
          submitted_at?: string;
          created_at?: string;
        };
        Update: Partial<RSVPResponseRow>;
        Relationships: [];
      };
      templates: {
        Row: TemplateRow;
        Insert: {
          id?: string;
          template_key: string;
          name: string;
          description: string;
          region: string;
          category: string;
          preview_color: string;
          accent_color: string;
          bg_pattern: string;
          component_name: string;
          tier_access?: TemplateTierAccess;
          status?: TemplateStatus;
          sort_order?: number;
          thumbnail_url?: string | null;
          is_featured?: boolean;
          created_by_user_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<TemplateRow>;
        Relationships: [];
      };
      payments: {
        Row: PaymentRow;
        Insert: {
          id?: string;
          user_id: string;
          invitation_id?: string | null;
          xendit_invoice_id: string;
          xendit_external_id: string;
          xendit_invoice_url?: string | null;
          xendit_payment_method?: string | null;
          xendit_payment_channel?: string | null;
          amount: number;
          currency?: PaymentCurrency;
          plan: PaymentPlan;
          status?: PaymentStatus;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<PaymentRow>;
        Relationships: [];
      };
      analytics: {
        Row: AnalyticsRow;
        Insert: {
          id?: string;
          invitation_id: string;
          date_key: string;
          page_views?: number;
          unique_visitors?: number;
          rsvp_count?: number;
          last_viewed_at?: string | null;
          last_rsvp_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<AnalyticsRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
