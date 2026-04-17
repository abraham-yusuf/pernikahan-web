-- ============================================================
-- NikahDigital — Template metadata migration seed
-- Source: src/lib/data.ts
-- Idempotent: safe to run multiple times
-- ============================================================

BEGIN;

ALTER TABLE IF EXISTS public.templates
  ADD COLUMN IF NOT EXISTS template_key text,
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS region text,
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS preview_color text,
  ADD COLUMN IF NOT EXISTS accent_color text,
  ADD COLUMN IF NOT EXISTS bg_pattern text,
  ADD COLUMN IF NOT EXISTS component_name text,
  ADD COLUMN IF NOT EXISTS tier_access text,
  ADD COLUMN IF NOT EXISTS status text,
  ADD COLUMN IF NOT EXISTS sort_order integer,
  ADD COLUMN IF NOT EXISTS thumbnail_url text,
  ADD COLUMN IF NOT EXISTS preview_url text,
  ADD COLUMN IF NOT EXISTS is_featured boolean,
  ADD COLUMN IF NOT EXISTS created_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz;

ALTER TABLE public.templates
  ALTER COLUMN tier_access SET DEFAULT 'premium',
  ALTER COLUMN status SET DEFAULT 'active',
  ALTER COLUMN sort_order SET DEFAULT 100,
  ALTER COLUMN is_featured SET DEFAULT false,
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET DEFAULT now();

UPDATE public.templates
SET
  tier_access = COALESCE(NULLIF(tier_access, ''), 'premium'),
  status = COALESCE(NULLIF(status, ''), 'active'),
  sort_order = COALESCE(sort_order, 100),
  is_featured = COALESCE(is_featured, false),
  created_at = COALESCE(created_at, now()),
  updated_at = COALESCE(updated_at, now())
WHERE
  tier_access IS NULL
  OR status IS NULL
  OR sort_order IS NULL
  OR is_featured IS NULL
  OR created_at IS NULL
  OR updated_at IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'templates_tier_access_check'
      AND conrelid = 'public.templates'::regclass
  ) THEN
    ALTER TABLE public.templates
      ADD CONSTRAINT templates_tier_access_check
      CHECK (tier_access IN ('free', 'premium'));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'templates_status_check'
      AND conrelid = 'public.templates'::regclass
  ) THEN
    ALTER TABLE public.templates
      ADD CONSTRAINT templates_status_check
      CHECK (status IN ('active', 'draft', 'archived'));
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS templates_template_key_key
  ON public.templates(template_key);

CREATE INDEX IF NOT EXISTS idx_templates_status_sort
  ON public.templates(status, sort_order);

INSERT INTO public.templates (
  template_key,
  name,
  description,
  region,
  category,
  preview_color,
  accent_color,
  bg_pattern,
  component_name,
  tier_access,
  status,
  sort_order,
  thumbnail_url,
  preview_url,
  is_featured,
  updated_at
) VALUES
  ('modern-elegant', 'Modern Elegant', 'Desain modern minimalis dengan sentuhan emas yang elegan. Cocok untuk pasangan yang menyukai kesederhanaan.', 'Indonesia', 'Modern', '#1a1a2e', '#c9a84c', 'geometric', 'ModernElegantTemplate', 'free', 'active', 10, null, null, true, now()),
  ('adat-jawa', 'Adat Jawa', 'Tema tradisional Jawa dengan motif batik dan ornamen wayang. Sempurna untuk pernikahan adat.', 'Jawa Tengah', 'Tradisional', '#4a1a0a', '#d4a574', 'batik', 'AdatJawaTemplate', 'premium', 'active', 20, null, null, false, now()),
  ('floral-garden', 'Floral Garden', 'Desain romantis dengan hiasan bunga-bunga cantik. Ideal untuk pernikahan di taman atau outdoor.', 'Indonesia', 'Romantis', '#2d4a3e', '#e8a0bf', 'floral', 'FloralGardenTemplate', 'premium', 'active', 30, null, null, false, now()),
  ('adat-sunda', 'Adat Sunda', 'Tema pernikahan adat Sunda dengan motif mega mendung dan nuansa biru pastel yang menenangkan.', 'Jawa Barat', 'Tradisional', '#1a3a5c', '#F4C95D', 'mega-mendung', 'AdatSundaTemplate', 'premium', 'active', 40, null, null, false, now()),
  ('adat-minang', 'Adat Minang', 'Tema adat Minangkabau dengan ukiran tradisional dan nuansa emas kerajaan yang megah.', 'Sumatera Barat', 'Tradisional', '#2C1B12', '#D4AF37', 'minang-ukir', 'AdatMinangTemplate', 'premium', 'active', 50, null, null, false, now()),
  ('adat-bali', 'Adat Bali', 'Tema pernikahan Bali dengan ornamen candi dan nuansa emas tropis yang sakral.', 'Bali', 'Tradisional', '#2d1f0e', '#D4AF37', 'bali-relief', 'AdatBaliTemplate', 'premium', 'active', 60, null, null, false, now()),
  ('adat-batak', 'Adat Batak', 'Tema adat Batak dengan ornamen gorga dan kombinasi merah-hitam yang tegas dan gagah.', 'Sumatera Utara', 'Tradisional', '#8B1E1E', '#111111', 'gorga', 'AdatBatakTemplate', 'premium', 'active', 70, null, null, false, now()),
  ('adat-bugis-makassar', 'Adat Bugis-Makassar', 'Tema adat Bugis-Makassar dengan nuansa kerajaan emas dan maroon yang agung.', 'Sulawesi Selatan', 'Tradisional', '#6E1E2A', '#C9A227', 'lontara', 'AdatBugisMakassarTemplate', 'premium', 'active', 80, null, null, false, now()),
  ('adat-betawi', 'Adat Betawi', 'Tema adat Betawi yang ceria dengan motif gigi balang dan warna-warna semarak khas Jakarta.', 'DKI Jakarta', 'Tradisional', '#F28C28', '#2E8B57', 'gigi-balang', 'AdatBetawiTemplate', 'premium', 'active', 90, null, null, false, now()),
  ('adat-dayak', 'Adat Dayak', 'Tema etnik Dayak dengan motif perisai dan pola geometris tribal bernuansa bumi Kalimantan.', 'Kalimantan', 'Etnik', '#5A3E2B', '#C46B2D', 'dayak-shield', 'AdatDayakTemplate', 'premium', 'active', 100, null, null, false, now()),
  ('adat-aceh', 'Adat Aceh', 'Tema adat Aceh dengan ornamen arabesque dan nuansa hijau emas yang islami dan elegan.', 'Aceh', 'Islami', '#0B6E4F', '#D4AF37', 'aceh-arabesque', 'AdatAcehTemplate', 'premium', 'active', 110, null, null, false, now()),
  ('adat-toraja', 'Adat Toraja', 'Tema adat Toraja dengan siluet tongkonan, ukiran panel tradisional, dan nuansa marun emas yang megah.', 'Sulawesi Selatan', 'Etnik', '#7A1F1F', '#D8B36A', 'toraja-panel', 'AdatTorajaTemplate', 'premium', 'active', 120, null, null, true, now()),
  ('islamic-elegant', 'Islamic Elegant', 'Tema islami elegan dengan pola mashrabiya dan kaligrafi, nuansa teal dan emas yang timeless.', 'Pan-Islamic Indonesian', 'Islami', '#0F766E', '#D4AF37', 'mashrabiya', 'IslamicElegantTemplate', 'premium', 'active', 130, null, null, false, now()),
  ('rustic-nusantara', 'Rustic Nusantara', 'Tema rustic Nusantara dengan tekstur kayu dan aksen batik, sempurna untuk pernikahan outdoor yang hangat.', 'Indonesian destination wedding', 'Rustic', '#8C6A43', '#C9A77D', 'wood-grain', 'RusticNusantaraTemplate', 'premium', 'active', 140, null, null, false, now())
ON CONFLICT (template_key)
DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  region = EXCLUDED.region,
  category = EXCLUDED.category,
  preview_color = EXCLUDED.preview_color,
  accent_color = EXCLUDED.accent_color,
  bg_pattern = EXCLUDED.bg_pattern,
  component_name = EXCLUDED.component_name,
  tier_access = EXCLUDED.tier_access,
  status = EXCLUDED.status,
  sort_order = EXCLUDED.sort_order,
  thumbnail_url = EXCLUDED.thumbnail_url,
  preview_url = EXCLUDED.preview_url,
  is_featured = EXCLUDED.is_featured,
  updated_at = now();

COMMIT;
