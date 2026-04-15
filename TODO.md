# NikahDigital — TODO Master Plan

- Project: NikahDigital
- One-liner: SaaS platform for beautiful Indonesian digital wedding invitations
- Current status (2026-04-15): Public marketing site is live in code, 3 demo templates render from hard-coded data, Appwrite auth works, dashboard is still a protected shell, and no production data layer exists yet.
- Tech stack: Next.js 16.1.6, React 19.2.3, TypeScript 5+, Tailwind CSS v4, Appwrite (Auth/Databases/Storage), Stripe (planned), Vercel (planned)

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
- [x] Email/password signup API with Appwrite session cookie
- [x] Email/password login API with Appwrite session cookie
- [x] Google OAuth start route and callback route
- [x] Login page
- [x] Signup page
- [x] Verify page UI copy
- [x] Logout action
- [x] Protected dashboard access via server-side auth check
- [ ] Password reset flow
- [ ] Role-based access control for admin
- [ ] Persistent user profile collection in Appwrite Database

### Templates
- [x] 3 templates implemented: Modern Elegant, Adat Jawa, Floral Garden
- [x] Dynamic demo route for template pages
- [x] Countdown timer component
- [x] Shared hard-coded template metadata model
- [ ] 15+ template library
- [ ] Template metadata stored in Appwrite Database
- [ ] Template access gating by pricing tier
- [ ] Public invitation route by custom slug
- [ ] Visual editor for template customization

### RSVP
- [x] RSVP form UI with validation and success state
- [x] Guest wishes list rendered on client after submit
- [ ] RSVP submissions persisted to Appwrite Database
- [ ] Public RSVP API route
- [ ] RSVP retrieval for invitation owner
- [ ] RSVP analytics/export
- [ ] Spam/rate-limit protection

### Dashboard
- [x] Basic dashboard shell with welcome banner, placeholder stats, and account card
- [x] Dashboard requires logged-in session
- [ ] Invitation CRUD pages
- [ ] Real user stats from database
- [ ] RSVP management view
- [ ] Settings page
- [ ] Draft/publish workflow

### Payments
- [x] Pricing model is visible on the landing page
- [ ] Stripe package and env wiring
- [ ] Checkout session route
- [ ] Webhook handler
- [ ] Premium entitlement sync to Appwrite
- [ ] Payment success/cancel pages

### Admin
- [ ] Admin routes
- [ ] Admin role guard
- [ ] User management
- [ ] Template management
- [ ] Revenue analytics dashboard

### Infrastructure
- [x] Environment variable template exists
- [x] Appwrite client helpers for admin and session usage exist
- [ ] Appwrite collections created
- [ ] Appwrite indexes created
- [ ] Appwrite storage buckets configured
- [ ] Vercel deployment pipeline
- [ ] GitHub Actions CI/CD
- [ ] Sentry error monitoring
- [ ] Production domain and DNS

## 2. Indonesian Theme Library Plan

Status target: minimum 15 live templates for launch; current baseline is 3 built templates, so 12+ additional themes are still required.

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

## 3. Database Schema (Appwrite Collections)

Principle MVP: keep Appwrite Auth as source of truth for login, then add Appwrite Database collections for product data, billing, and analytics.

### `Users`
Purpose: extend Appwrite Auth with billing, tier, and product preferences.

Fields:
- `authUserId` — `string`, required, unique; bridge to Appwrite Auth user id
- `email` — `email`, required
- `fullName` — `string`, required
- `tier` — `enum(free,premium)`, required, default `free`
- `subscriptionStatus` — `enum(none,pending,active,past_due,cancelled)`, required, default `none`
- `preferredLanguage` — `enum(id,en)`, required, default `id`
- `whatsappNumber` — `string`, optional
- `defaultTemplateId` — `relationship -> Templates`, optional
- `createdAt` — `datetime`, required
- `updatedAt` — `datetime`, required

Indexes:
- `authUserId_unique` — unique on `authUserId`
- `email_idx` — on `email`
- `tier_subscription_idx` — on `tier`, `subscriptionStatus`

Relationships:
- `defaultTemplateId -> Templates.$id`
- one Appwrite Auth account maps to one `Users` document via `authUserId`

### `Invitations`
Purpose: store each user-created invitation and its custom wedding data.

Fields:
- `userId` — `relationship -> Users`, required
- `templateId` — `relationship -> Templates`, required
- `slug` — `string`, required, unique
- `title` — `string`, required
- `status` — `enum(draft,published,archived)`, required, default `draft`
- `bride` — `string`, required
- `groom` — `string`, required
- `brideParents` — `string`, required
- `groomParents` — `string`, required
- `akadDate` — `datetime`, required
- `akadTime` — `string`, required
- `akadLocation` — `string`, required
- `resepsiDate` — `datetime`, required
- `resepsiTime` — `string`, required
- `resepsiLocation` — `string`, required
- `mapUrl` — `url`, optional
- `story` — `string`, optional
- `customPrimaryColor` — `string`, optional
- `customAccentColor` — `string`, optional
- `coverImageFileId` — `string`, optional
- `galleryFileIds` — `string[]`, optional
- `rsvpEnabled` — `boolean`, required, default `true`
- `watermarkEnabled` — `boolean`, required, default `true`
- `publishedAt` — `datetime`, optional
- `lastViewedAt` — `datetime`, optional
- `createdAt` — `datetime`, required
- `updatedAt` — `datetime`, required

Indexes:
- `slug_unique` — unique on `slug`
- `user_status_idx` — on `userId`, `status`
- `template_idx` — on `templateId`
- `publishedAt_idx` — on `publishedAt`

Relationships:
- `userId -> Users.$id`
- `templateId -> Templates.$id`
- one invitation has many `RSVPResponses`, `Payments`, and `Analytics` rows

### `RSVPResponses`
Purpose: persist guest submissions from the public invitation page.

Fields:
- `invitationId` — `relationship -> Invitations`, required
- `guestName` — `string`, required
- `attendance` — `enum(hadir,tidak_hadir)`, required
- `guestCount` — `integer`, required, default `1`
- `message` — `string`, optional
- `guestPhone` — `string`, optional
- `guestTag` — `string`, optional
- `submittedAt` — `datetime`, required
- `createdAt` — `datetime`, required

Indexes:
- `invitation_submittedAt_idx` — on `invitationId`, `submittedAt`
- `invitation_attendance_idx` — on `invitationId`, `attendance`
- `guestName_idx` — on `guestName`

Relationships:
- `invitationId -> Invitations.$id`

### `Templates`
Purpose: move template metadata out of hard-coded arrays and make it manageable by admin.

Fields:
- `templateKey` — `string`, required, unique
- `name` — `string`, required
- `description` — `string`, required
- `region` — `string`, required
- `category` — `string`, required
- `previewColor` — `string`, required
- `accentColor` — `string`, required
- `bgPattern` — `string`, required
- `componentName` — `string`, required
- `tierAccess` — `enum(free,premium)`, required, default `premium`
- `status` — `enum(active,draft,archived)`, required, default `draft`
- `sortOrder` — `integer`, required, default `100`
- `thumbnailFileId` — `string`, optional
- `isFeatured` — `boolean`, required, default `false`
- `createdByUserId` — `relationship -> Users`, optional
- `createdAt` — `datetime`, required
- `updatedAt` — `datetime`, required

Indexes:
- `templateKey_unique` — unique on `templateKey`
- `status_sort_idx` — on `status`, `sortOrder`
- `category_region_idx` — on `category`, `region`
- `tierAccess_idx` — on `tierAccess`

Relationships:
- `createdByUserId -> Users.$id`
- one template can be referenced by many `Invitations`

### `Payments`
Purpose: record Stripe checkout activity and premium purchases.

Fields:
- `userId` — `relationship -> Users`, required
- `invitationId` — `relationship -> Invitations`, optional
- `stripeCheckoutSessionId` — `string`, required, unique
- `stripePaymentIntentId` — `string`, optional
- `stripeCustomerId` — `string`, optional
- `amount` — `integer`, required
- `currency` — `enum(idr)`, required, default `idr`
- `plan` — `enum(premium_invitation)`, required
- `status` — `enum(pending,paid,failed,refunded,expired)`, required, default `pending`
- `paidAt` — `datetime`, optional
- `createdAt` — `datetime`, required
- `updatedAt` — `datetime`, required

Indexes:
- `checkout_unique` — unique on `stripeCheckoutSessionId`
- `user_status_idx` — on `userId`, `status`
- `invitation_idx` — on `invitationId`
- `paidAt_idx` — on `paidAt`

Relationships:
- `userId -> Users.$id`
- `invitationId -> Invitations.$id`

### `Analytics`
Purpose: simple daily aggregate for page views and RSVP counts per invitation.

Fields:
- `invitationId` — `relationship -> Invitations`, required
- `dateKey` — `string`, required; format `YYYY-MM-DD`
- `pageViews` — `integer`, required, default `0`
- `uniqueVisitors` — `integer`, required, default `0`
- `rsvpCount` — `integer`, required, default `0`
- `lastViewedAt` — `datetime`, optional
- `lastRsvpAt` — `datetime`, optional
- `createdAt` — `datetime`, required
- `updatedAt` — `datetime`, required

Indexes:
- `invitation_date_unique` — unique on `invitationId`, `dateKey`
- `date_idx` — on `dateKey`
- `views_idx` — on `pageViews`

Relationships:
- `invitationId -> Invitations.$id`

## 4. API Routes Plan

### Public + Authenticated Product APIs
- [ ] `POST /api/invitations` and `GET /api/invitations` — create/list invitations for current user
- [ ] `GET /api/invitations/[id]`, `PATCH /api/invitations/[id]`, `DELETE /api/invitations/[id]` — single invitation operations
- [ ] `POST /api/rsvp` — public RSVP submit without login, validated against invitation slug or id
- [ ] `GET /api/rsvp/[invitationId]` — owner-only RSVP list and summary stats
- [ ] `GET /api/templates` — list active templates with tier gating metadata

### Payments APIs
- [ ] `POST /api/payments/checkout` — create Stripe Checkout session for Premium invitation purchase
- [ ] `POST /api/payments/webhook` — process Stripe events and sync payment status to Appwrite

### Admin APIs
- [ ] `GET /api/admin/users` — admin user management
- [ ] `GET /api/admin/templates`, `POST /api/admin/templates`, `PATCH /api/admin/templates/[id]` — admin template management
- [ ] `GET /api/admin/analytics` — admin analytics for usage, RSVP volume, and revenue

## 5. Page Routes Plan

- [ ] `/dashboard` — overview with real stats and recent invitations
- [ ] `/dashboard/invitations` — my invitations list
- [ ] `/dashboard/invitations/new` — create new invitation
- [ ] `/dashboard/invitations/[id]` — edit invitation
- [ ] `/dashboard/rsvp/[id]` — view RSVPs for invitation
- [ ] `/dashboard/settings` — user settings and billing profile
- [ ] `/editor/[templateId]` — visual template editor
- [ ] `/payment/checkout` — Stripe checkout handoff page
- [ ] `/payment/success` — payment success state
- [ ] `/payment/cancel` — payment cancelled state
- [ ] `/admin` — admin dashboard
- [ ] `/admin/users` — manage users
- [ ] `/admin/templates` — manage templates
- [ ] `/admin/analytics` — revenue and usage analytics
- [ ] `/u/[slug]` — public invitation view with custom URL

## 6. Phase-by-Phase Task Breakdown

### Phase 1 — Database & RSVP Backend (Week 1)
Goal: move RSVP and invitation data from in-memory demo state to persistent Appwrite-backed data.

Dependencies:
- [x] Appwrite auth routes and session helpers already exist
- [ ] Appwrite Database collections from section 3 must be created first

Files to create/modify:
- [ ] `src/lib/appwrite.ts`
- [ ] `src/lib/collections.ts`
- [ ] `src/lib/appwrite-db.ts`
- [ ] `src/lib/validators/rsvp.ts`
- [ ] `src/app/api/rsvp/route.ts`
- [ ] `src/app/api/rsvp/[invitationId]/route.ts`
- [ ] `src/components/RSVPForm.tsx`
- [ ] `src/app/undangan/[id]/page.tsx`

Tasks:
- [ ] Create typed collection ids and query helpers for Appwrite Databases
- [ ] Build `POST /api/rsvp` with input validation and invitation lookup
- [ ] Build `GET /api/rsvp/[invitationId]` for invitation owners only
- [ ] Replace local RSVP state in form with API submission flow
- [ ] Persist guest wishes and load latest responses from database
- [ ] Increment analytics counters when RSVP is submitted

### Phase 2 — Indonesian Theme Library, 10 New Themes (Week 2-3)
Goal: expand from 3 static templates to a culturally differentiated library that feels local-first untuk pasar Indonesia.

Dependencies:
- [ ] Phase 1 complete

Files to create/modify:
- [ ] `src/lib/data.ts`
- [ ] `src/components/TemplateCard.tsx`
- [ ] `src/components/templates/AdatSunda.tsx`
- [ ] `src/components/templates/AdatMinang.tsx`
- [ ] `src/components/templates/AdatBali.tsx`
- [ ] `src/components/templates/AdatBatak.tsx`
- [ ] `src/components/templates/AdatBugisMakassar.tsx`
- [ ] `src/components/templates/AdatBetawi.tsx`
- [ ] `src/components/templates/AdatDayak.tsx`
- [ ] `src/components/templates/AdatAceh.tsx`
- [ ] `src/components/templates/AdatMinahasa.tsx`
- [ ] `src/components/templates/AdatToraja.tsx`
- [ ] `src/app/undangan/[id]/page.tsx`
- [ ] `src/app/api/templates/route.ts`

Tasks:
- [ ] Implement 10 new template components with shared data contract
- [ ] Add richer preview metadata, region labels, and tier tags
- [ ] Expose active templates through `GET /api/templates`
- [ ] Keep 3 existing templates as launch-ready baseline
- [ ] Reserve final launch additions (`Islamic Elegant`, `Rustic Nusantara`) for Phase 7 to reach 15+ live templates

### Phase 3 — User Dashboard & Invitation Management (Week 3-4)
Goal: turn the current dashboard shell into the main SaaS workspace untuk couples.

Dependencies:
- [ ] Phase 1 complete
- [ ] Template metadata available from Phase 2

Files to create/modify:
- [ ] `src/app/dashboard/page.tsx`
- [ ] `src/app/dashboard/layout.tsx`
- [ ] `src/app/dashboard/invitations/page.tsx`
- [ ] `src/app/dashboard/invitations/new/page.tsx`
- [ ] `src/app/dashboard/invitations/[id]/page.tsx`
- [ ] `src/app/dashboard/rsvp/[id]/page.tsx`
- [ ] `src/app/dashboard/settings/page.tsx`
- [ ] `src/app/api/invitations/route.ts`
- [ ] `src/app/api/invitations/[id]/route.ts`
- [ ] `src/components/dashboard/InvitationList.tsx`
- [ ] `src/components/dashboard/InvitationStats.tsx`
- [ ] `src/components/dashboard/EmptyInvitations.tsx`
- [ ] `src/lib/invitations.ts`

Tasks:
- [ ] Replace placeholder stats with live invitation + RSVP counts
- [ ] Build invitation list page with draft/published badges
- [ ] Build create invitation flow from selected template
- [ ] Build invitation edit page backed by Appwrite
- [ ] Show RSVP list and summary per invitation
- [ ] Add settings page for profile, WhatsApp number, and default language

### Phase 4 — Template Editor & Customization (Week 4-5)
Goal: enable users to customize invitation content without touching code.

Dependencies:
- [ ] Phase 3 complete

Files to create/modify:
- [ ] `src/app/editor/[templateId]/page.tsx`
- [ ] `src/components/editor/TemplateEditor.tsx`
- [ ] `src/components/editor/EditorPreview.tsx`
- [ ] `src/components/editor/CoupleDetailsForm.tsx`
- [ ] `src/components/editor/EventDetailsForm.tsx`
- [ ] `src/components/editor/ThemeControls.tsx`
- [ ] `src/components/editor/PhotoUploader.tsx`
- [ ] `src/components/templates/ModernElegant.tsx`
- [ ] `src/components/templates/AdatJawa.tsx`
- [ ] `src/components/templates/FloralGarden.tsx`

Tasks:
- [ ] Refactor templates to accept invitation props instead of demo-only data
- [ ] Add real-time preview with editable couple, venue, and story fields
- [ ] Support custom colors per invitation where theme allows
- [ ] Add photo upload via Appwrite Storage
- [ ] Add save draft and publish actions

### Phase 5 — Stripe Payment Integration (Week 5-6)
Goal: monetize Premium invitation purchases with a clean checkout flow.

Dependencies:
- [ ] Phase 3 complete

Files to create/modify:
- [ ] `src/app/api/payments/checkout/route.ts`
- [ ] `src/app/api/payments/webhook/route.ts`
- [ ] `src/app/payment/checkout/page.tsx`
- [ ] `src/app/payment/success/page.tsx`
- [ ] `src/app/payment/cancel/page.tsx`
- [ ] `src/components/payment/PricingCards.tsx`
- [ ] `src/components/payment/CheckoutSummary.tsx`
- [ ] `src/lib/payments.ts`
- [ ] `src/app/page.tsx`

Tasks:
- [ ] Install and configure Stripe SDK
- [ ] Create Checkout session for `Premium` at `Rp 99.000/invitation`
- [ ] Persist Stripe session, payment intent, and final payment status in Appwrite
- [ ] Unlock premium template access after successful payment
- [ ] Surface paid/free state inside dashboard and editor

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
- [ ] Add admin role guard based on Appwrite prefs or `Users` collection flag
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
- [ ] Add public slug route `/u/[slug]` for published invitations
- [ ] Deliver final 2 launch templates to reach 15+ live options
- [ ] Add invitation SEO metadata, robots, sitemap, and share card strategy
- [ ] Wire Sentry for runtime and API monitoring
- [ ] Prepare Vercel production config, domain setup, and smoke checks
- [ ] Add CI steps for build, lint, and route-level regression coverage

## 7. Launch Checklist

- [ ] All Appwrite collections created with indexes
- [ ] 15+ templates live and rendering correctly
- [ ] RSVP data persisting to database
- [ ] Stripe checkout working in test mode
- [ ] Admin can manage templates and users
- [ ] Custom invitation URLs working (`/u/[slug]`)
- [ ] Mobile responsive across all templates
- [ ] SEO metadata on all public pages
- [ ] Error monitoring (Sentry)
- [ ] Vercel production deployment
- [ ] Custom domain configured
- [ ] GitHub Actions CI/CD
