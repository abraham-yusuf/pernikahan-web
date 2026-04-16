-- ============================================================
-- NikahDigital — Xendit Migration (run AFTER database.sql)
-- Drops Stripe columns and adds Xendit columns on payments table
-- ============================================================

-- Drop old Stripe columns (if they exist)
ALTER TABLE public.payments DROP COLUMN IF EXISTS stripe_checkout_session_id;
ALTER TABLE public.payments DROP COLUMN IF EXISTS stripe_payment_intent_id;
ALTER TABLE public.payments DROP COLUMN IF EXISTS stripe_customer_id;

-- Add Xendit columns
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS xendit_invoice_id text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS xendit_external_id text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS xendit_invoice_url text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS xendit_payment_method text;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS xendit_payment_channel text;

-- Add unique constraints
ALTER TABLE public.payments ADD CONSTRAINT payments_xendit_invoice_id_key UNIQUE (xendit_invoice_id);
ALTER TABLE public.payments ADD CONSTRAINT payments_xendit_external_id_key UNIQUE (xendit_external_id);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_payments_user ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_xendit_external ON public.payments(xendit_external_id);
