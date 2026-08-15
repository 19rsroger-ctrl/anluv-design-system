-- Categorías dinámicas y datos de catálogo/SEO. No elimina productos existentes.
alter table public.products drop constraint if exists products_category_check;
alter table public.products
  add column if not exists model text,
  add column if not exists sku text unique,
  add column if not exists gtin text,
  add column if not exists mpn text,
  add column if not exists warranty text,
  add column if not exists image_alt text,
  add column if not exists seo_title text,
  add column if not exists seo_description text;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null unique,
  created_at timestamptz not null default now()
);

insert into public.categories (slug, name) values
  ('laptops','Laptops'),('componentes','Componentes'),('licencias','Licencias'),
  ('accesorios','Accesorios'),('audio','Audio'),('scooters-electricos','Scooters eléctricos')
on conflict (slug) do nothing;

alter table public.categories enable row level security;
drop policy if exists "Categorías públicas" on public.categories;
drop policy if exists "Administradores modifican categorías" on public.categories;
create policy "Categorías públicas" on public.categories for select using (true);
create policy "Administradores modifican categorías" on public.categories for all using (public.is_admin()) with check (public.is_admin());
