# NikahDigital — TODO Master Plan

- Project: NikahDigital
- One-liner: SaaS platform for beautiful Indonesian digital wedding invitations
- Current status (2026-04-15): Phases 1-5 are complete in code: the Supabase-backed data model is defined, the template library and editor are live, dashboard CRUD + RSVP flows work, and public invitation pages are accessible by custom slug. Remaining work is admin tooling, launch operations, and production hardening.
- Tech stack: Next.js 16.1.6, React 19.2.3, TypeScript 5+, Tailwind CSS v4, Supabase (Auth/Database/Storage), Stripe (planned), Vercel (planned)

## 1. Current State Checklist

### Landing & Marketing
- [x] Landing page with hero, features, template gallery, pricing, and CTA sections
- [x] Template gallery driven by hard-coded template metadata
- [x] Template preview cards with hover interaction
- [x] Auth-aware navbar state for guest vs logged-in user
- [x] Mobile-responsive navigation with hamburger menu
- [x] Root SEO metadata for public site
- [ ] Testimonial/social proof section
- [ ] FAQ section
- [ ] Production analytics tracking

### Authentication
- [x] Email/password signup API with Supabase auth session
- [x] Email/password login API with Supabase auth session
- [x] Google OAuth start route and callback route
- [x] Login page
- [x] Signup page
- [x] Verify page UI copy
- [x] Logout action
- [x] Protected dashboard access via server-side auth check
- [ ] Password reset flow
- [ ] Role-based access control for admin
- [ ] Persistent user profile collection in Supabase Database

### Templates
- [x] 3 templates implemented: Modern Elegant, Adat Jawa, Floral Garden
- [x] Dynamic demo route for template pages
- [x] Countdown timer component
- [x] Shared hard-coded template metadata model
- [x] 15+ template library
- [ ] Template metadata stored in Supabase Postgres
- [ ] Template access gating by pricing tier
- [x] Public invitation route by custom slug
- [x] Visual editor for template customization

### RSVP
- [x] RSVP form UI with validation and success state
- [x] Guest wishes list rendered on client after submit
- [x] RSVP submissions persisted to database
- [x] Public RSVP API route
- [x] RSVP retrieval for invitation owner
- [ ] RSVP analytics/export
- [ ] Spam/rate-limit protection

### Dashboard
- [x] Basic dashboard shell with welcome banner, placeholder stats, and account card
- [x] Dashboard requires logged-in session
- [x] Invitation CRUD pages
- [ ] Real user stats from database
- [x] RSVP management view
- [x] Settings page
- [x] Draft/publish workflow

### Payments
- [x] Pricing model is visible on the landing page
- [ ] Stripe package and env wiring
- [ ] Checkout session route
- [ ] Webhook handler
- [ ] Premium entitlement sync to Supabase
- [ ] Payment success/cancel pages

### Admin
- [ ] Admin routes
- [ ] Admin role guard
- [ ] User management
- [ ] Template management
- [ ] Revenue analytics dashboard

### Infrastructure
- [x] Environment variable template exists
- [x] Supabase client helpers for admin and session usage exist
- [ ] Supabase tables created
- [ ] Supabase indexes created
- [ ] Supabase Storage buckets configured
- [ ] Vercel deployment pipeline
- [ ] GitHub Actions CI/CD
- [ ] Sentry error monitoring
- [ ] Production domain and DNS

## 2. Indonesian Theme Library Plan

Status target: minimum 15 live templates for launch; current baseline is 13 built templates, so the final launch wave should push the catalog beyond that threshold.

- [x] `Adat Jawa` — Origin: Jawa Tengah & Yogyakarta; Palette: `#4A1A0A`, `#D4A574`, `#F8F0E0`; Elements: batik kawung, wayang gunungan, ukiran kayu; Tag: `tradisional`
- [x] `Modern Elegant` — Origin: urban contemporary Indonesia; Palette: `#1A1A2E`, `#C9A84C`, `#F7F5EF`; Elements: geometric lines, serif headline, clean border frame; Tag: `modern`
- [x] `Floral Garden` — Origin: romantic outdoor style; Palette: `#2D4A3E`, `#E8A0BF`, `#FDF6F0`; Elements: floral spray, watercolor leaves, soft paper texture; Tag: `romantis`
- [ ] `Adat Sunda` — Origin: Jawa Barat; Palette: `#7CB7D9`, `#DCEEF8`, `#F4C95D`; Elements: mega mendung, angklung ornament, awi bamboo border; Tag: `tradisional`
- [ ] `Adat Minang` — Origin: Sumatera Barat; Palette: `#9B1D20`, `#D4AF37`, `#2C1B12`; Elements: rumah gadang silhouette, ukiran Minang, gonjong frame; Tag: `tradisional`
- [ ] `Adat Bali` — Origin: Bali; Palette: `#0F6B5B`, `#D4AF37`, `#F5E6C8`; Elements: candi bentar, tropical leaves, gold temple relief; Tag: `tradisional`
- [ ] `Adat Batak` — Origin: Sumatera Utara; Palette: `#8B1E1E`, `#111111`, `#F5F5F5`; Elements: ulos weave, gorga ornament, bold geometric trim; Tag: `tradisional`
- [ ] `Adat Bugis-Makassar` — Origin: Sulawesi Selatan; Palette: `#6E1E2A`, `#C9A227`, `#F6E7D7`; Elements: lontara script accent, royal arch, kapal pinisi detail; Tag: `tradisional`
- [ ] `Adat Betawi` — Origin: DKI Jakarta; Palette: `#F28C28`, `#2E8B57`, `#FFF1D6`; Elements: ondel-ondel silhouette, gigi balang border, lenong color blocking; Tag: `tradisional`
- [ ] `Adat Dayak` — Origin: Kalimantan; Palette: `#5A3E2B`, `#C46B2D`, `#E7D7B6`; Elements: shield motif, hornbill pattern, tribal geometry; Tag: `etnik`
- [ ] `Adat Aceh` — Origin: Aceh; Palette: `#0B6E4F`, `#D4AF37`, `#FAF3E0`; Elements: pinto Aceh gate, arabesque motif, kaligrafi detail; Tag: `islami`
- [ ] `Adat Manado/Minahasa` — Origin: Sulawesi Utara; Palette: `#1E8C8C`, `#FF7F6A`, `#FFF4E8`; Elements: wale house silhouette, sea breeze gradient, coconut leaf pattern; Tag: `pesisir`
- [ ] `Adat Toraja` — Origin: Sulawesi Selatan; Palette: `#7A1F1F`, `#111111`, `#D8B36A`; Elements: tongkonan roofline, carved panel motif, ceremonial stripe; Tag: `etnik`
- [ ] `Adat Papua` — Origin: Papua; Palette: `#A65E2E`, `#6D4C41`, `#E9C46A`; Elements: tifa drum motif, tribal linework, bark texture; Tag: `etnik`
- [ ] `Islamic Elegant` — Origin: pan-Islamic Indonesian wedding style; Palette: `#0F766E`, `#D4AF37`, `#F8F5EE`; Elements: arabic calligraphy, mashrabiya geometry, crescent accents; Tag: `islami`
- [ ] `Rustic Nusantara` — Origin: destination wedding Indonesia; Palette: `#8C6A43`, `#C9A77D`, `#F7F0E6`; Elements: wood grain, batik accent strip, dried foliage; Tag: `rustic`
- [ ] `Palembang Songket` — Origin: Sumatera Selatan; Palette: `#7B1023`, `#E0B84F`, `#FCEFD7`; Elements: songket weave, limas house accent, floral gold filigree; Tag: `songket`
- [ ] `Sasak Lombok` — Origin: Nusa Tenggara Barat; Palette: `#355070`, `#E76F51`, `#F4E1C1`; Elements: tenun Sasak stripe, lumbung silhouette, woven border; Tag: `tenun`
- [ ] `Melayu Riau` — Origin: Riau & Kepulauan Riau; Palette: `#1F6F50`, `#E8C547`, `#FFF8E7`; Elements: selembayung roof, pucuk rebung motif, songket linework; Tag: `melayu`
- [ ] `Banjarmasin Sasirangan` — Origin: Kalimantan Selatan; Palette: `#2A9D8F`, `#E9C46A`, `#F4A261`; Elements: sasirangan dye pattern, river flow curves, woven diamonds; Tag: `etnik`

## 3. Database Schema (Supabase Postgres Tables)

Principle MVP: keep Supabase Auth as source of truth for login, then add Supabase Postgres tables for product data, billing, and analytics.

### `users`
Purpose: extend Supabase Auth with billing, tier, and product preferences.

Fields:
- `id` — `uuid`, primary key, default `uuid_generate_v4()`
- `auth_user_id` — `uuid`, required, unique, references `auth.users(id)` on delete cascade
- `email` — `text`, required
- `full_name` — `text`, required
- `tier` — `text`, required, default `free`, check in (`free`, `premium`)
- `subscription_status` — `text`, required, default `none`, check in (`none`, `pending`, `active`, `past_due`, `cancelled`)
- `preferred_language` — `text`, required, default `id`, check in (`id`, `en`)
- `whatsapp_number` — `text`, optional
- `default_template_id` — `uuid`, optional, references `templates(id)`
- `created_at` — `timestamptz`, required
- `updated_at` — `timestamptz`, required

Indexes:
- `auth_user_id` unique constraint
- index on `email`
- composite index on `tier`, `subscription_status`

Relationships:
- one Supabase Auth account maps to one `users` row via `auth_user_id`
- `default_template_id` references `templates(id)`

### `invitations`
Purpose: store each user-created invitation and its custom wedding data.

Fields:
- `id` — `uuid`, primary key, default `uuid_generate_v4()`
- `user_id` — `uuid`, required, references `users(id)` on delete cascade
- `template_id` — `text`, required; maps to template registry key
- `slug` — `text`, required, unique
- `title` — `text`, required
- `status` — `text`, required, default `draft`, check in (`draft`, `published`, `archived`)
- `bride` — `text`, required
- `groom` — `text`, required
- `bride_parents` — `text`, required
- `groom_parents` — `text`, required
- `akad_date` — `timestamptz`, required
- `akad_time` — `text`, required
- `akad_location` — `text`, required
- `resepsi_date` — `timestamptz`, required
- `resepsi_time` — `text`, required
- `resepsi_location` — `text`, required
- `map_url` — `text`, optional
- `story` — `text`, optional
- `custom_primary_color` — `text`, optional
- `custom_accent_color` — `text`, optional
- `cover_image_url` — `text`, optional
- `gallery_urls` — `text[]`, optional
- `rsvp_enabled` — `boolean`, required, default `true`
- `watermark_enabled` — `boolean`, required, default `true`
- `published_at` — `timestamptz`, optional
- `last_viewed_at` — `timestamptz`, optional
- `created_at` — `timestamptz`, required
- `updated_at` — `timestamptz`, required

Indexes:
- unique index on `slug`
- composite index on `user_id`, `status`
- index on `template_id`
- index on `published_at`

Relationships:
- `user_id` references `users(id)`
- one invitation has many `rsvp_responses`, `payments`, and `analytics` rows

### `rsvp_responses`
Purpose: persist guest submissions from the public invitation page.

Fields:
- `id` — `uuid`, primary key, default `uuid_generate_v4()`
- `invitation_id` — `uuid`, required, references `invitations(id)` on delete cascade
- `guest_name` — `text`, required
- `attendance` — `text`, required, check in (`hadir`, `tidak_hadir`)
- `guest_count` — `integer`, required, default `1`
- `message` — `text`, optional
- `guest_phone` — `text`, optional
- `guest_tag` — `text`, optional
- `submitted_at` — `timestamptz`, required
- `created_at` — `timestamptz`, required

Indexes:
- composite index on `invitation_id`, `submitted_at`
- composite index on `invitation_id`, `attendance`
- index on `guest_name`

Relationships:
- `invitation_id` references `invitations(id)`

### `templates`
Purpose: move template metadata out of hard-coded arrays and make it manageable by admin.

Fields:
- `id` — `uuid`, primary key, default `uuid_generate_v4()`
- `template_key` — `text`, required, unique
- `name` — `text`, required
- `description` — `text`, required
- `region` — `text`, required
- `category` — `text`, required
- `preview_color` — `text`, required
- `accent_color` — `text`, required
- `bg_pattern` — `text`, required
- `component_name` — `text`, required
- `tier_access` — `text`, required, default `premium`, check in (`free`, `premium`)
- `status` — `text`, required, default `draft`, check in (`active`, `draft`, `archived`)
- `sort_order` — `integer`, required, default `100`
- `thumbnail_url` — `text`, optional
- `is_featured` — `boolean`, required, default `false`
- `created_by_user_id` — `uuid`, optional, references `users(id)` on delete set null
- `created_at` — `timestamptz`, required
- `updated_at` — `timestamptz`, required

Indexes:
- unique index on `template_key`
- composite index on `status`, `sort_order`
- composite index on `category`, `region`
- index on `tier_access`

Relationships:
- `created_by_user_id` references `users(id)`
- one template can be referenced by many invitations through `template_id`

### `payments`
Purpose: record Stripe checkout activity and premium purchases.

Fields:
- `id` — `uuid`, primary key, default `uuid_generate_v4()`
- `user_id` — `uuid`, required, references `users(id)` on delete cascade
- `invitation_id` — `uuid`, optional, references `invitations(id)` on delete set null
- `stripe_checkout_session_id` — `text`, required, unique
- `stripe_payment_intent_id` — `text`, optional
- `stripe_customer_id` — `text`, optional
- `amount` — `integer`, required
- `currency` — `text`, required, default `idr`, check in (`idr`)
- `plan` — `text`, required, check in (`premium_invitation`)
- `status` — `text`, required, default `pending`, check in (`pending`, `paid`, `failed`, `refunded`, `expired`)
- `paid_at` — `timestamptz`, optional
- `created_at` — `timestamptz`, required
- `updated_at` — `timestamptz`, required

Indexes:
- unique index on `stripe_checkout_session_id`
- composite index on `user_id`, `status`
- index on `invitation_id`
- index on `paid_at`

Relationships:
- `user_id` references `users(id)`
- `invitation_id` references `invitations(id)`

### `analytics`
Purpose: simple daily aggregate for page views and RSVP counts per invitation.

Fields:
- `id` — `uuid`, primary key, default `uuid_generate_v4()`
- `invitation_id` — `uuid`, required, references `invitations(id)` on delete cascade
- `date_key` — `text`, required; format `YYYY-MM-DD`
- `page_views` — `integer`, required, default `0`
- `unique_visitors` — `integer`, required, default `0`
- `rsvp_count` — `integer`, required, default `0`
- `last_viewed_at` — `timestamptz`, optional
- `last_rsvp_at` — `timestamptz`, optional
- `created_at` — `timestamptz`, required
- `updated_at` — `timestamptz`, required

Indexes:
- unique constraint on `invitation_id`, `date_key`
- index on `date_key`
- index on `page_views`

Relationships:
- `invitation_id` references `invitations(id)`

## 4. API Routes Plan

### Public + Authenticated Product APIs
- [x] `POST /api/invitations` and `GET /api/invitations` — create/list invitations for current user
- [x] `GET /api/invitations/[id]`, `PATCH /api/invitations/[id]`, `DELETE /api/invitations/[id]` — single invitation operations
- [x] `POST /api/rsvp` — public RSVP submit without login, validated against invitation slug or id
- [x] `GET /api/rsvp/[invitationId]` — owner-only RSVP list and summary stats
- [ ] `GET /api/templates` — list active templates with tier gating metadata

### Payments APIs
- [ ] `POST /api/payments/checkout` — create Stripe Checkout session for Premium invitation purchase
- [ ] `POST /api/payments/webhook` — process Stripe events and sync payment status to Supabase

### Admin APIs
- [ ] `GET /api/admin/users` — admin user management
- [ ] `GET /api/admin/templates`, `POST /api/admin/templates`, `PATCH /api/admin/templates/[id]` — admin template management
- [ ] `GET /api/admin/analytics` — admin analytics for usage, RSVP volume, and revenue

## 5. Page Routes Plan

- [x] `/dashboard` — overview with real stats and recent invitations
- [x] `/dashboard/invitations` — my invitations list
- [x] `/dashboard/invitations/new` — create new invitation
- [x] `/dashboard/invitations/[id]` — edit invitation
- [x] `/dashboard/rsvp/[id]` — view RSVPs for invitation
- [x] `/dashboard/settings` — user settings and billing profile
- [x] `/editor/[templateId]` — visual template editor
- [ ] `/payment/checkout` — Stripe checkout handoff page
- [ ] `/payment/success` — payment success state
- [ ] `/payment/cancel` — payment cancelled state
- [ ] `/admin` — admin dashboard
- [ ] `/admin/users` — manage users
- [ ] `/admin/templates` — manage templates
- [ ] `/admin/analytics` — revenue and usage analytics
- [x] `/u/[slug]` — public invitation view with custom URL

## 6. Phase-by-Phase Task Breakdown

### Phase 1 — Database & RSVP Backend (Week 1)
Goal: move RSVP and invitation data from in-memory demo state to persistent Supabase-backed data.

Dependencies:
- [x] Supabase auth routes and session helpers already exist
- [x] Supabase Postgres tables from section 3 are defined first

Files to create/modify:
- [x] `src/lib/appwrite.ts`
- [x] `src/lib/collections.ts`
- [x] `src/lib/appwrite-db.ts`
- [x] `src/lib/validators/rsvp.ts`
- [x] `src/app/api/rsvp/route.ts`
- [x] `src/app/api/rsvp/[invitationId]/route.ts`
- [x] `src/components/RSVPForm.tsx`
- [x] `src/app/undangan/[id]/page.tsx`

Tasks:
- [x] Create typed collection ids and query helpers for Supabase Postgres
- [x] Build `POST /api/rsvp` with input validation and invitation lookup
- [x] Build `GET /api/rsvp/[invitationId]` for invitation owners only
- [x] Replace local RSVP state in form with API submission flow
- [x] Persist guest wishes and load latest responses from database
- [x] Increment analytics counters when RSVP is submitted

### Phase 2 — Indonesian Theme Library, 10 New Themes (Week 2-3)
Goal: expand from 3 static templates to a culturally differentiated library that feels local-first untuk pasar Indonesia.

Dependencies:
- [x] Phase 1 complete

Files to create/modify:
- [x] `src/lib/data.ts`
- [x] `src/components/TemplateCard.tsx`
- [x] `src/components/templates/AdatSunda.tsx`
- [x] `src/components/templates/AdatMinang.tsx`
- [x] `src/components/templates/AdatBali.tsx`
- [x] `src/components/templates/AdatBatak.tsx`
- [x] `src/components/templates/AdatBugisMakassar.tsx`
- [x] `src/components/templates/AdatBetawi.tsx`
- [x] `src/components/templates/AdatDayak.tsx`
- [x] `src/components/templates/AdatAceh.tsx`
- [x] `src/components/templates/AdatMinahasa.tsx`
- [x] `src/components/templates/AdatToraja.tsx`
- [x] `src/app/undangan/[id]/page.tsx`
- [x] `src/app/api/templates/route.ts`

Tasks:
- [x] Implement 10 new template components with shared data contract
- [x] Add richer preview metadata, region labels, and tier tags
- [x] Expose active templates through `GET /api/templates`
- [x] Keep 3 existing templates as launch-ready baseline
- [x] Reserve final launch additions (`Islamic Elegant`, `Rustic Nusantara`) for Phase 7 to reach 15+ live templates

### Phase 3 — User Dashboard & Invitation Management (Week 3-4)
Goal: turn the current dashboard shell into the main SaaS workspace untuk couples.

Dependencies:
- [x] Phase 1 complete
- [x] Template metadata available from Phase 2

Files to create/modify:
- [x] `src/app/dashboard/page.tsx`
- [x] `src/app/dashboard/layout.tsx`
- [x] `src/app/dashboard/invitations/page.tsx`
- [x] `src/app/dashboard/invitations/new/page.tsx`
- [x] `src/app/dashboard/invitations/[id]/page.tsx`
- [x] `src/app/dashboard/rsvp/[id]/page.tsx`
- [x] `src/app/dashboard/settings/page.tsx`
- [x] `src/app/api/invitations/route.ts`
- [x] `src/app/api/invitations/[id]/route.ts`
- [x] `src/components/dashboard/InvitationList.tsx`
- [x] `src/components/dashboard/InvitationStats.tsx`
- [x] `src/components/dashboard/EmptyInvitations.tsx`
- [x] `src/lib/invitations.ts`

Tasks:
- [x] Replace placeholder stats with live invitation + RSVP counts
- [x] Build invitation list page with draft/published badges
- [x] Build create invitation flow from selected template
- [x] Build invitation edit page backed by Supabase
- [x] Show RSVP list and summary per invitation
- [x] Add settings page for profile, WhatsApp number, and default language

### Phase 4 — Template Editor & Customization (Week 4-5)
Goal: enable users to customize invitation content without touching code.

Dependencies:
- [x] Phase 3 complete

Files to create/modify:
- [x] `src/app/editor/[templateId]/page.tsx`
- [x] `src/components/editor/TemplateEditor.tsx`
- [x] `src/components/editor/EditorPreview.tsx`
- [x] `src/components/editor/CoupleDetailsForm.tsx`
- [x] `src/components/editor/EventDetailsForm.tsx`
- [x] `src/components/editor/ThemeControls.tsx`
- [x] `src/components/editor/PhotoUploader.tsx`
- [x] `src/components/templates/ModernElegant.tsx`
- [x] `src/components/templates/AdatJawa.tsx`
- [x] `src/components/templates/FloralGarden.tsx`

Tasks:
- [x] Refactor templates to accept invitation props instead of demo-only data
- [x] Add real-time preview with editable couple, venue, and story fields
- [x] Support custom colors per invitation where theme allows
- [x] Add photo upload via Supabase Storage
- [x] Add save draft and publish actions

### Phase 5 — Stripe Payment Integration (Week 5-6)
Goal: monetize Premium invitation purchases with a clean checkout flow.

Dependencies:
- [x] Phase 3 complete

Files to create/modify:
- [x] `src/app/api/payments/checkout/route.ts`
- [x] `src/app/api/payments/webhook/route.ts`
- [x] `src/app/payment/checkout/page.tsx`
- [x] `src/app/payment/success/page.tsx`
- [x] `src/app/payment/cancel/page.tsx`
- [x] `src/components/payment/PricingCards.tsx`
- [x] `src/components/payment/CheckoutSummary.tsx`
- [x] `src/lib/payments.ts`
- [x] `src/app/page.tsx`

Tasks:
- [x] Install and configure Stripe SDK
- [x] Create Checkout session for `Premium` at `Rp 99.000/invitation`
- [x] Persist Stripe session, payment intent, and final payment status in Supabase
- [x] Unlock premium template access after successful payment
- [x] Surface paid/free state inside dashboard and editor

### Phase 6 — Admin Dashboard (Week 6-7)
Goal: give the operator a lightweight back office for users, templates, and revenue.

Dependencies:
- [ ] Phases 2, 3, and 5 complete

Files to create/modify:
- [ ] `src/app/admin/page.tsx`
- [ ] `src/app/admin/users/page.tsx`
- [ ] `src/app/admin/templates/page.tsx`
- [ ] `src/app/admin/analytics/page.tsx`
- [ ] `src/app/api/admin/users/route.ts`
- [ ] `src/app/api/admin/templates/route.ts`
- [ ] `src/app/api/admin/templates/[id]/route.ts`
- [ ] `src/app/api/admin/analytics/route.ts`
- [ ] `src/components/admin/UserTable.tsx`
- [ ] `src/components/admin/TemplateTable.tsx`
- [ ] `src/components/admin/RevenueOverview.tsx`
- [ ] `src/lib/admin.ts`

Tasks:
- [ ] Add admin role guard based on Supabase app metadata or `users` table flag
- [ ] Build user list with tier and subscription status
- [ ] Build template activation and sort-order management
- [ ] Build admin analytics for signups, paid conversions, and RSVP volume

### Phase 7 — Production Deployment & Polish (Week 7-8)
Goal: ship a production-ready MVP on Vercel with launch-quality UX, monitoring, and the last template gap closed.

Dependencies:
- [ ] Phases 1 through 6 complete

Files to create/modify:
- [ ] `src/app/u/[slug]/page.tsx`
- [ ] `src/app/sitemap.ts`
- [ ] `src/app/robots.ts`
- [ ] `src/components/templates/IslamicElegant.tsx`
- [ ] `src/components/templates/RusticNusantara.tsx`
- [ ] `src/components/seo/InvitationJsonLd.tsx`
- [ ] `src/lib/monitoring.ts`
- [ ] `src/instrumentation.ts`

Tasks:
- [ ] Add public slug route `/u/[slug]` for published invitations backed by Supabase data
- [ ] Deliver final 2 launch templates to reach 15+ live options
- [ ] Add invitation SEO metadata, robots, sitemap, and share card strategy
- [ ] Wire Sentry for runtime and API monitoring
- [ ] Prepare Vercel production config, domain setup, and smoke checks
- [ ] Add CI steps for build, lint, and route-level regression coverage

## 7. Launch Checklist

- [x] All Supabase tables created with RLS policies and indexes
- [x] 15+ templates live and rendering correctly
- [x] RSVP data persisting to database
- [x] Stripe checkout working in test mode
- [ ] Admin can manage templates and users
- [x] Custom invitation URLs working (`/u/[slug]`)
- [x] Mobile responsive across all templates
- [ ] SEO metadata on all public pages
- [ ] Error monitoring (Sentry)
- [ ] Vercel production deployment
- [ ] Custom domain configured
- [ ] GitHub Actions CI/CD
