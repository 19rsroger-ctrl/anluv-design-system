-- Datos privados de costos y registro de ventas. Nunca se exponen al catálogo público.
create table if not exists public.product_finances (
  product_id uuid primary key references public.products(id) on delete cascade,
  cost_price numeric(12,2) not null default 0 check (cost_price >= 0),
  packaging_cost numeric(12,2) not null default 0 check (packaging_cost >= 0),
  shipping_cost numeric(12,2) not null default 0 check (shipping_cost >= 0),
  payment_fee_percent numeric(5,2) not null default 0 check (payment_fee_percent between 0 and 100),
  marketing_cost numeric(12,2) not null default 0 check (marketing_cost >= 0),
  updated_at timestamptz not null default now()
);
create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(), product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0), unit_sale_price numeric(12,2) not null check (unit_sale_price >= 0),
  unit_cost numeric(12,2) not null default 0 check (unit_cost >= 0), shipping_cost numeric(12,2) not null default 0 check (shipping_cost >= 0),
  payment_fee numeric(12,2) not null default 0 check (payment_fee >= 0), marketing_cost numeric(12,2) not null default 0 check (marketing_cost >= 0),
  sold_at date not null default current_date, notes text, created_at timestamptz not null default now()
);
alter table public.product_finances enable row level security;
alter table public.sales enable row level security;
create policy "Solo administradores ven costos" on public.product_finances for all using (public.is_admin()) with check (public.is_admin());
create policy "Solo administradores ven ventas" on public.sales for all using (public.is_admin()) with check (public.is_admin());
