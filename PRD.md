# NikahDigital — PRD

## Product Summary
NikahDigital adalah SaaS platform for beautiful Indonesian digital wedding invitations. Produk menggabungkan wedding invitation builder, RSVP management, dan pembayaran Premium dengan diferensiasi utama pada template adat Indonesia yang terasa lokal, bukan template generik global.

## Target Users
- Pasangan Indonesia yang ingin undangan digital cepat, cantik, dan mudah dibagikan
- Wedding organizer atau freelancer yang membantu pasangan setup undangan

## Current Product State
- [x] Landing page, template gallery, pricing, and CTA flow
- [x] 3 live demo templates: Modern Elegant, Adat Jawa, Floral Garden
- [x] Appwrite auth: email/password, Google OAuth, session cookies
- [x] Basic protected dashboard shell
- [ ] Persistent Appwrite Database collections
- [ ] Invitation CRUD and template editor
- [ ] Persistent RSVP backend
- [ ] Stripe checkout
- [ ] Admin dashboard
- [ ] Production deployment

## Core Differentiators
- Indonesian cultural theme library: Jawa, Sunda, Minang, Bali, Batak, Bugis-Makassar, Betawi, Dayak, Aceh, Toraja, Papua, dan lainnya
- Bilingual UX style: English technical clarity + Bahasa Indonesia product copy
- Fast mobile-first invitation pages for WhatsApp sharing
- Simple Premium pricing: `Rp 99.000/invitation`

## Scope for v2.0 MVP (8 weeks)
### Phase 1 — Foundation
- [ ] Appwrite collections: Users, Invitations, RSVPResponses, Templates, Payments, Analytics
- [ ] RSVP backend with persistent storage
- [ ] Auth hardening and typed server helpers

### Phase 2 — Theme Library
- [ ] Add 10 new Indonesian themes in core build phase
- [ ] Store template metadata in Appwrite Database
- [ ] Reach 15+ total templates by launch

### Phase 3 — Dashboard
- [ ] Invitation CRUD
- [ ] RSVP viewer with analytics
- [ ] User settings and tier display

### Phase 4 — Editor
- [ ] Visual template editor
- [ ] Real-time preview
- [ ] Photo upload and draft/publish flow

### Phase 5 — Monetization
- [ ] Stripe checkout
- [ ] Premium template gating
- [ ] Payment-to-entitlement sync in Appwrite

### Phase 6 — Admin + Launch
- [ ] Admin dashboard for users, templates, analytics
- [ ] Vercel deployment, custom domain, Sentry, CI/CD
- [ ] Public invitation slug route `/u/[slug]`

## Tech Stack
- Frontend: Next.js 16.1.6, React 19.2.3, TypeScript 5+, Tailwind CSS v4
- Backend/Auth/DB: Appwrite with session cookies and Appwrite Database collections
- Payments: Stripe
- Deployment: Vercel

## Success Metrics
- [ ] Month 1: 100 signups, 10 paid (Rp 990.000)
- [ ] Month 3: 500 signups, 50 paid (Rp 4.950.000)
- [ ] Month 6: 2000 signups, 200 paid (Rp 19.800.000)
- [ ] Launch KPI: 15+ templates live, persistent RSVP, Stripe test checkout, admin ops ready

## Non-Goals for v2.0
- [ ] Native mobile app
- [ ] Expansion beyond wedding invitations
- [ ] User-uploaded custom template marketplace
