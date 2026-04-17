-- ============================================================
-- NikahDigital — Template metadata seed: Adat Toraja
-- Run this in Supabase SQL Editor to register the new template.
-- ============================================================

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
  is_featured
)
VALUES (
  'adat-toraja',
  'Adat Toraja',
  'Tema adat Toraja dengan siluet tongkonan, ukiran panel tradisional, dan nuansa marun emas yang megah.',
  'Sulawesi Selatan',
  'Etnik',
  '#7A1F1F',
  '#D8B36A',
  'toraja-panel',
  'AdatTorajaTemplate',
  'premium',
  'active',
  140,
  false
)
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
  is_featured = EXCLUDED.is_featured,
  updated_at = now();
