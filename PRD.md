# NikahDigital — PRD

## Product Summary
NikahDigital adalah SaaS platform for beautiful Indonesian digital wedding invitations. Produk menggabungkan wedding invitation builder, RSVP management, dan pembayaran Premium dengan diferensiasi utama pada template adat Indonesia yang terasa lokal, bukan template generik global.

## Target Users
- Pasangan Indonesia yang ingin undangan digital cepat, cantik, dan mudah dibagikan
- Wedding organizer atau freelancer yang membantu pasangan setup undangan

## Current Product State
- [x] Landing page, template gallery, pricing, and CTA flow
- [x] 13 live templates across the current library
- [x] Supabase Auth: email/password, Google OAuth, session cookies
- [x] Protected dashboard with invitation CRUD, RSVP views, and settings
- [x] Persistent Supabase Postgres tables
- [x] Invitation CRUD and template editor
- [x] Persistent RSVP backend
- [ ] Stripe checkout
- [x] Admin dashboard
- [x] Production deployment

## Core Differentiators
- Indonesian cultural theme library: Jawa, Sunda, Minang, Bali, Batak, Bugis-Makassar, Betawi, Dayak, Aceh, Toraja, Papua, dan lainnya
- Bilingual UX style: English technical clarity + Bahasa Indonesia product copy
- Fast mobile-first invitation pages for WhatsApp sharing
- Simple Premium pricing: `Rp 99.000/invitation`

## Scope for v2.0 MVP (8 weeks)
### Phase 1 — Foundation
- [x] Supabase Postgres tables: users, invitations, rsvp_responses, templates, payments, analytics
- [x] RSVP backend with persistent storage
- [x] Auth hardening and typed server helpers

### Phase 2 — Theme Library
- [x] Add 10 new Indonesian themes in core build phase
- [x] Store template metadata in Supabase Postgres
- [x] Reach 13 registered templates in the current library

### Phase 3 — Dashboard
- [x] Invitation CRUD
- [x] RSVP viewer with analytics
- [x] User settings and tier display

### Phase 4 — Editor
- [x] Visual template editor
- [x] Real-time preview
- [x] Photo upload and draft/publish flow

### Phase 5 — Monetization
- [ ] Stripe checkout
- [ ] Premium template gating
- [ ] Payment-to-entitlement sync in Supabase

### Phase 6 — Admin + Launch
- [x] Admin dashboard for users, templates, analytics
- [x] Vercel deployment, Sentry, CI/CD
- [ ] Custom domain
- [x] Public invitation slug route `/u/[slug]`

## Tech Stack
- Frontend: Next.js 16.1.6, React 19.2.3, TypeScript 5+, Tailwind CSS v4
- Backend/Auth/DB: Supabase Auth with session cookies, Supabase Postgres, and Supabase Storage
- Payments: Stripe
- Deployment: Vercel

## Success Metrics
- [ ] Month 1: 100 signups, 10 paid (Rp 990.000)
- [ ] Month 3: 500 signups, 50 paid (Rp 4.950.000)
- [ ] Month 6: 2000 signups, 200 paid (Rp 19.800.000)
- [ ] Launch KPI: 15+ templates live, Stripe test checkout, and custom domain
- [x] Current launch state: 13 templates live, persistent RSVP, admin ops ready, production deploy active

## Non-Goals for v2.0
- [ ] Native mobile app
- [ ] Expansion beyond wedding invitations
- [ ] User-uploaded custom template marketplace
