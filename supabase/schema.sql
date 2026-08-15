-- ANLUV: ejecutar una vez en Supabase > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text,
  category text not null check (category in ('laptops', 'componentes', 'licencias', 'accesorios', 'audio')),
  type text not null check (type in ('fisico', 'digital')),
  condition text not null check (condition in ('nuevo', 'reacondicionado', 'usado', 'openbox', 'repuestos')),
  price numeric(12,2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  model_3d_url text,
  model_3d_ios_url text,
  shipping text,
  summary text,
  specs jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') $$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;

create policy "Los usuarios leen su perfil" on public.profiles for select using (id = auth.uid());
create policy "Catálogo público" on public.products for select using (active = true or public.is_admin());
create policy "Solo administradores modifican productos" on public.products for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
on conflict (id) do nothing;
create policy "Imágenes públicas" on storage.objects for select using (bucket_id = 'product-images');
create policy "Administradores suben imágenes" on storage.objects for insert with check (bucket_id = 'product-images' and public.is_admin());
create policy "Administradores actualizan imágenes" on storage.objects for update using (bucket_id = 'product-images' and public.is_admin());
create policy "Administradores eliminan imágenes" on storage.objects for delete using (bucket_id = 'product-images' and public.is_admin());

-- Después de crear tu usuario en Authentication > Users, ejecuta esto una vez:
-- insert into public.profiles (id, role) values ('UUID_DEL_USUARIO', 'admin');
