-- ============================================================
-- NikahDigital — Admin Role Migration
-- Run this in Supabase SQL Editor AFTER the base database.sql
-- ============================================================

-- Add role column to users table
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user'
  CHECK (role IN ('user', 'admin'));

-- Index for role lookups
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- RLS policies for admin access (all tables)
-- Admin can read ALL users
CREATE POLICY "Admins can read all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );

-- Admin can update ALL users
CREATE POLICY "Admins can update all users"
  ON public.users FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );

-- Admin can read ALL invitations
CREATE POLICY "Admins can read all invitations"
  ON public.invitations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );

-- Admin can read ALL rsvp_responses
CREATE POLICY "Admins can read all rsvp_responses"
  ON public.rsvp_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );

-- Admin can manage ALL templates (read, insert, update, delete)
CREATE POLICY "Admins can read all templates"
  ON public.templates FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );

CREATE POLICY "Admins can insert templates"
  ON public.templates FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );

CREATE POLICY "Admins can update templates"
  ON public.templates FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete templates"
  ON public.templates FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );

-- Admin can read ALL payments
CREATE POLICY "Admins can read all payments"
  ON public.payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );

-- Admin can read ALL analytics
CREATE POLICY "Admins can read all analytics"
  ON public.analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.auth_user_id = auth.uid() AND u.role = 'admin'
    )
  );
