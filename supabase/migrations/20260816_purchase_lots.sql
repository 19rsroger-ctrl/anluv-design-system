-- Lotes históricos: conserva moneda y tipo de cambio de la compra original.
create table if not exists public.purchase_lots (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete restrict,
  purchased_at date not null, supplier text, quantity_received integer not null check (quantity_received > 0), quantity_remaining integer not null check (quantity_remaining >= 0 and quantity_remaining <= quantity_received),
  unit_cost_usd numeric(12,2) not null check (unit_cost_usd >= 0), exchange_rate numeric(12,4) not null check (exchange_rate > 0),
  freight_cost numeric(12,2) not null default 0, duties_cost numeric(12,2) not null default 0, other_cost numeric(12,2) not null default 0,
  unit_landed_pen numeric(12,2) not null check (unit_landed_pen >= 0), notes text, created_at timestamptz not null default now()
);
alter table public.purchase_lots enable row level security;
create policy "Solo administradores ven lotes" on public.purchase_lots for all using (public.is_admin()) with check (public.is_admin());
