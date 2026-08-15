-- Modelos 3D opcionales para la ficha de producto y realidad aumentada.
alter table public.products
  add column if not exists model_3d_url text,
  add column if not exists model_3d_ios_url text;

comment on column public.products.model_3d_url is 'Archivo GLB público para el visor 3D y AR en Android.';
comment on column public.products.model_3d_ios_url is 'Archivo USDZ opcional para Quick Look y AR en iPhone/iPad.';
