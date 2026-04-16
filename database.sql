-- ============================================================
-- NikahDigital — Supabase Postgres Schema
-- Run this in the Supabase SQL Editor to set up all tables.
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- Core tables
-- ============================================================

create table public.users (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  full_name text not null,
  tier text not null default 'free' check (tier in ('free', 'premium')),
  subscription_status text not null default 'none' check (subscription_status in ('none', 'pending', 'active', 'past_due', 'cancelled')),
  preferred_language text not null default 'id' check (preferred_language in ('id', 'en')),
  whatsapp_number text,
  default_template_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.templates (
  id uuid primary key default uuid_generate_v4(),
  template_key text not null unique,
  name text not null,
  description text not null,
  region text not null,
  category text not null,
  preview_color text not null,
  accent_color text not null,
  bg_pattern text not null,
  component_name text not null,
  tier_access text not null default 'premium' check (tier_access in ('free', 'premium')),
  status text not null default 'draft' check (status in ('active', 'draft', 'archived')),
  sort_order integer not null default 100,
  thumbnail_url text,
  is_featured boolean not null default false,
  created_by_user_id uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users
  add constraint users_default_template_id_fkey
  foreign key (default_template_id) references public.templates(id) on delete set null;

create table public.invitations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  template_id text not null,
  slug text not null unique,
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  bride text not null,
  groom text not null,
  bride_parents text not null,
  groom_parents text not null,
  akad_date timestamptz not null,
  akad_time text not null,
  akad_location text not null,
  resepsi_date timestamptz not null,
  resepsi_time text not null,
  resepsi_location text not null,
  map_url text,
  story text,
  custom_primary_color text,
  custom_accent_color text,
  cover_image_url text,
  gallery_urls text[],
  rsvp_enabled boolean not null default true,
  watermark_enabled boolean not null default true,
  published_at timestamptz,
  last_viewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rsvp_responses (
  id uuid primary key default uuid_generate_v4(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  guest_name text not null,
  attendance text not null check (attendance in ('hadir', 'tidak_hadir')),
  guest_count integer not null default 1 check (guest_count > 0),
  message text,
  guest_phone text,
  guest_tag text,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  invitation_id uuid references public.invitations(id) on delete set null,
  xendit_invoice_id text not null unique,
  xendit_external_id text not null unique,
  xendit_invoice_url text,
  xendit_payment_method text,
  xendit_payment_channel text,
  amount integer not null check (amount >= 0),
  currency text not null default 'idr' check (currency in ('idr')),
  plan text not null check (plan in ('premium_invitation')),
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded', 'expired')),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.analytics (
  id uuid primary key default uuid_generate_v4(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  date_key text not null,
  page_views integer not null default 0 check (page_views >= 0),
  unique_visitors integer not null default 0 check (unique_visitors >= 0),
  rsvp_count integer not null default 0 check (rsvp_count >= 0),
  last_viewed_at timestamptz,
  last_rsvp_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (invitation_id, date_key)
);

-- ============================================================
-- Indexes
-- ============================================================

-- users indexes
create index idx_users_email on public.users(email);
create index idx_users_role on public.users(role);
create index idx_users_tier_status on public.users(tier, subscription_status);

-- invitations indexes
create index idx_invitations_user_status on public.invitations(user_id, status);
create index idx_invitations_template on public.invitations(template_id);
create index idx_invitations_published_at on public.invitations(published_at);

-- rsvp_responses indexes
create index idx_rsvp_invitation_submitted on public.rsvp_responses(invitation_id, submitted_at);
create index idx_rsvp_invitation_attendance on public.rsvp_responses(invitation_id, attendance);
create index idx_rsvp_guest_name on public.rsvp_responses(guest_name);

-- templates indexes
create index idx_templates_status_sort on public.templates(status, sort_order);
create index idx_templates_category_region on public.templates(category, region);
create index idx_templates_tier on public.templates(tier_access);

-- payments indexes
create index idx_payments_user on public.payments(user_id);
create index idx_payments_status on public.payments(status);
create index idx_payments_xendit_external on public.payments(xendit_external_id);

-- analytics indexes
create index idx_analytics_date on public.analytics(date_key);
create index idx_analytics_views on public.analytics(page_views);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.users enable row level security;
alter table public.invitations enable row level security;
alter table public.rsvp_responses enable row level security;
alter table public.templates enable row level security;
alter table public.payments enable row level security;
alter table public.analytics enable row level security;

-- users policies
create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = auth_user_id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = auth_user_id);

create policy "Users can insert own profile"
  on public.users for insert
  with check (auth.uid() = auth_user_id);

create policy "Admins can read all users"
  on public.users for select
  using (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Admins can update all users"
  on public.users for update
  using (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

-- invitations policies
create policy "Users can read own invitations"
  on public.invitations for select
  using (user_id in (select id from public.users where auth_user_id = auth.uid()));

create policy "Users can create invitations"
  on public.invitations for insert
  with check (user_id in (select id from public.users where auth_user_id = auth.uid()));

create policy "Users can update own invitations"
  on public.invitations for update
  using (user_id in (select id from public.users where auth_user_id = auth.uid()));

create policy "Users can delete own invitations"
  on public.invitations for delete
  using (user_id in (select id from public.users where auth_user_id = auth.uid()));

create policy "Published invitations are publicly readable"
  on public.invitations for select
  using (status = 'published');

create policy "Admins can read all invitations"
  on public.invitations for select
  using (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

-- rsvp_responses policies
create policy "Anyone can submit RSVP to published invitations"
  on public.rsvp_responses for insert
  with check (
    invitation_id in (select id from public.invitations where status = 'published')
  );

create policy "Invitation owners can read RSVPs"
  on public.rsvp_responses for select
  using (
    invitation_id in (
      select i.id from public.invitations i
      join public.users u on u.id = i.user_id
      where u.auth_user_id = auth.uid()
    )
  );

create policy "Anyone can read RSVPs for published invitations"
  on public.rsvp_responses for select
  using (
    invitation_id in (select id from public.invitations where status = 'published')
  );

create policy "Admins can read all rsvp_responses"
  on public.rsvp_responses for select
  using (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

-- templates policies
create policy "Anyone can read active templates"
  on public.templates for select
  using (status = 'active');

create policy "Admins can read all templates"
  on public.templates for select
  using (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Admins can insert templates"
  on public.templates for insert
  with check (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Admins can update templates"
  on public.templates for update
  using (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

create policy "Admins can delete templates"
  on public.templates for delete
  using (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

-- payments policies
create policy "Users can read own payments"
  on public.payments for select
  using (user_id in (select id from public.users where auth_user_id = auth.uid()));

create policy "Users can insert own payments"
  on public.payments for insert
  with check (user_id in (select id from public.users where auth_user_id = auth.uid()));

create policy "Admins can read all payments"
  on public.payments for select
  using (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

-- analytics policies
create policy "Users can read own analytics"
  on public.analytics for select
  using (
    invitation_id in (
      select i.id from public.invitations i
      join public.users u on u.id = i.user_id
      where u.auth_user_id = auth.uid()
    )
  );

create policy "Admins can read all analytics"
  on public.analytics for select
  using (
    exists (
      select 1 from public.users u
      where u.auth_user_id = auth.uid() and u.role = 'admin'
    )
  );

-- ============================================================
-- Signup trigger
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (auth_user_id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- updated_at triggers
-- ============================================================

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.users for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.invitations for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.templates for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.payments for each row execute function public.update_updated_at();
create trigger set_updated_at before update on public.analytics for each row execute function public.update_updated_at();
