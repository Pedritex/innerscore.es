-- Tracks upsells purchased after the main 3,00 € checkout.
-- One row per accepted upsell. main_payment_intent_id links back to purchases.stripe_session_id.

create table if not exists public.upsell_purchases (
  id uuid primary key default gen_random_uuid(),
  main_payment_intent_id text not null,
  upsell_slot int not null check (upsell_slot in (1, 2, 3)),
  stripe_payment_intent_id text not null unique,
  amount_cents int not null,
  currency text not null default 'eur',
  email text,
  created_at timestamptz not null default now(),
  unique (main_payment_intent_id, upsell_slot)
);

create index if not exists upsell_purchases_main_pi_idx
  on public.upsell_purchases (main_payment_intent_id);

-- Service role bypasses RLS, but enable + deny-all for safety since anon key exists in client.
alter table public.upsell_purchases enable row level security;
