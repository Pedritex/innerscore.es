alter table public.purchases
  add column if not exists cancelled_at timestamptz;
