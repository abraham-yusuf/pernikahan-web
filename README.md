# Wedding Invite SaaS - Platform Undangan Pernikahan Digital

[![GitHub stars](https://img.shields.io/github/stars/abraham-yusuf/pernikahan-web.svg)](https://github.com/abraham-yusuf/pernikahan-web/stargazers)
[![Vercel](https://therealsujitk-vercel-badge.vercel.app?url=https://nikah-digital.vercel.app)](https://nikah-digital.vercel.app)
**[Coba Langsung → nikah-digital.vercel.app](https://nikah-digital.vercel.app)**

## Deskripsi
Platform SaaS untuk buat dan jual undangan pernikahan digital custom. User bisa pilih dari library template wedding theme (modern, vintage, floral, etc.), customize teks/foto, tambah RSVP/guest management, lalu generate/share. Monetisasi via subscription ($5-20/bulan) atau per-undangan ($1-5). Dibangun dari MVP React/Next.js, sekarang dengan backend untuk multi-user.

Manfaatkan stack lokal Indonesia: Xendit untuk payment, Supabase untuk auth/database/storage, dan Vercel untuk hosting.

Coding tasks dibantu Claude Opus sebagai AI agent untuk generate components/templates.

## Tech Stack
- **Frontend**: Next.js (SSR untuk SEO), React, Tailwind CSS, React Hook Form.
- **Backend**: Supabase Auth, Supabase Postgres, Supabase Storage.
- **Payment**: Xendit Invoice API (integrasi checkout + webhook).
- **Deployment**: Vercel.
- **AI Agent**: Claude Opus untuk coding; GitHub Copilot untuk suggestions.

## Instalasi
1. Clone repo: `git clone https://github.com/abraham-yusuf/pernikahan-web.git`
2. Install deps: `npm install`
3. Copy env template: `cp .env.example .env.local`
4. Isi `.env.local` dengan kredensial Supabase dan Xendit.
5. Jalankan `database.sql` di Supabase SQL Editor untuk membuat tabel, index, trigger, dan RLS policies.
6. Jalankan `adatdatabase.sql` di Supabase SQL Editor (nama file ini mengikuti requirement migrasi issue) untuk seed semua metadata template dari app ke tabel `public.templates` (idempotent, aman dijalankan berulang).
7. Verifikasi sinkronisasi dengan query:
   - `select template_key, name, status, sort_order from public.templates order by sort_order asc;`
   - pastikan daftar template di homepage/dashboard mengikuti hasil query DB.
8. Run dev: `npm run dev`
9. Deploy: push ke Vercel untuk preview/production.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-side only) |
| `NEXT_PUBLIC_APP_URL` | Yes | App URL (e.g. `http://localhost:3000`) |
| `XENDIT_SECRET_KEY` | For payments | Xendit secret API key |
| `XENDIT_WEBHOOK_TOKEN` | For payments | Callback token untuk verifikasi webhook Xendit |
| `NEXT_PUBLIC_SENTRY_DSN` | For monitoring | Sentry DSN |
| `SENTRY_ORG` | For monitoring | Sentry organization slug |
| `SENTRY_PROJECT` | For monitoring | Sentry project name |
| `SENTRY_AUTH_TOKEN` | For monitoring | Sentry auth token for source maps |

## CI/CD

GitHub Actions runs on every push to `main` and on all PRs:
- **Type check**: `tsc --noEmit`
- **Build**: Full Next.js production build with placeholder env vars

## Deployment

The app is configured for Vercel deployment:
1. Push to `main` triggers auto-deploy
2. PRs create preview deployments
3. CDN caching: public invitation pages cached for 60s with 5min stale-while-revalidate
4. Region: `sin1` (Singapore, closest to Indonesia)

## Cara Pakai (untuk Customer)
- Sign up/login.
- Pilih template dari library.
- Customize: edit teks, upload foto, atur theme colors.
- Tambah fitur: RSVP form, guest list, map.
- Bayar via Xendit untuk unlock Premium dan menghapus watermark invitation.
- Admin: dashboard untuk manage templates/payments.

## Monetisasi
- Tier: Free (basic template), Premium (`Rp 99.000/invitation`: premium templates, publishable invitation, optional watermark removal).
- Jual ke customer via website atau marketplace seperti Etsy/Product Hunt.

## Kontribusi
- Buat issue untuk new template/theme.
- Gunakan Claude Opus prompt: "Generate Next.js component for wedding template editor with theme selector."
- Ikuti workflow di [Workflow.md](./Workflow.md).

## Lisensi
MIT License.

## Kontak
- GitHub: @abraham-yusuf
- X: @bram0511
- Email: [abrahamyusuf.eth@gmail.com]
