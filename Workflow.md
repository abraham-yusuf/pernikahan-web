# Workflow Pengembangan - Wedding Invite SaaS

## 1. Overview
GitHub Flow dengan fokus SaaS: iterasi fitur invitation, RSVP, dashboard, dan payment. Gunakan AI untuk tasks seperti generate template code dan API scaffolding.

## 2. Tools
- Next.js + Supabase.
- Xendit Dashboard (dashboard.xendit.co).
- Supabase Dashboard + SQL Editor (`database.sql`) untuk schema, RLS, dan storage setup.
- Claude Opus: prompt untuk "Build Xendit integration in Next.js API route."

## 3. Proses
### 3.1 Planning
- Issue: "Add template library endpoint."
- Breakdown task per phase: database, templates, dashboard, editor, payments, admin, launch.

### 3.2 Development
1. Sync latest `main`.
2. Code dengan AI help.
3. Jalankan local validation: `npm run lint`, `npm run build`, dan test flow yang relevan.
4. Jika ada perubahan schema, update `database.sql` lalu jalankan di Supabase SQL Editor.
5. Untuk env lokal, copy `.env.example` → `.env.local` dan isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, serta Xendit keys (`XENDIT_SECRET_KEY`, `XENDIT_WEBHOOK_TOKEN`).

### 3.3 Review & Deploy
- PR review.
- Merge → auto-deploy via Vercel.
- Monitor error dan auth/database issues via Sentry error monitoring, Supabase dashboard logs, dan Vercel analytics.

### 3.4 Release & Marketing
- Test checkout flow dan RSVP flow end-to-end.
- Validasi public slug route `/u/[slug]` sebelum release.
- Promosi di X (@bram0511) atau Reddit.

Best practices: weekly releases untuk new themes, schema changes lewat SQL yang versioned, dan RLS review setiap kali menambah tabel baru.
