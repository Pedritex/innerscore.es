-- Adds the temporary password column on purchases and the magic_links table
-- used by the post-checkout welcome flow. Run this in the Supabase SQL Editor.

alter table public.purchases
  add column if not exists temp_password text;

create table if not exists public.magic_links (
  token uuid primary key default gen_random_uuid(),
  email text not null,
  expires_at timestamptz not null default (now() + interval '24 hours'),
  used boolean not null default false,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists magic_links_email_idx
  on public.magic_links (email);
create index if not exists magic_links_expires_at_idx
  on public.magic_links (expires_at);

alter table public.magic_links enable row level security;
