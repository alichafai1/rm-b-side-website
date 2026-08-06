-- RM B-Side schema
-- Paste into Supabase SQL Editor and click Run.

create extension if not exists pgcrypto;

create table if not exists public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price numeric(10, 2) not null check (price >= 0),
  image_url text not null,
  short_description text not null,
  collection_id uuid not null references public.collections (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_collection_id_idx on public.products (collection_id);
create index if not exists products_created_at_idx on public.products (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $fn$
begin
  new.updated_at = now();
  return new;
end;
$fn$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

insert into public.collections (name, slug, image_url, sort_order)
values
  ('Classic', 'classic', 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80', 1),
  ('Sport', 'sport', 'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=1200&q=80', 2),
  ('Premium', 'premium', 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=80', 3)
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

alter table public.collections enable row level security;
alter table public.products enable row level security;

drop policy if exists collections_public_read on public.collections;
create policy collections_public_read
on public.collections
for select
to anon, authenticated
using (true);

drop policy if exists collections_auth_all on public.collections;
create policy collections_auth_all
on public.collections
for all
to authenticated
using (true)
with check (true);

drop policy if exists products_public_read on public.products;
create policy products_public_read
on public.products
for select
to anon, authenticated
using (true);

drop policy if exists products_auth_insert on public.products;
create policy products_auth_insert
on public.products
for insert
to authenticated
with check (true);

drop policy if exists products_auth_update on public.products;
create policy products_auth_update
on public.products
for update
to authenticated
using (true)
with check (true);

drop policy if exists products_auth_delete on public.products;
create policy products_auth_delete
on public.products
for delete
to authenticated
using (true);

drop policy if exists product_images_public_read on storage.objects;
create policy product_images_public_read
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists product_images_auth_insert on storage.objects;
create policy product_images_auth_insert
on storage.objects
for insert
to authenticated
with check (bucket_id = 'product-images');

drop policy if exists product_images_auth_update on storage.objects;
create policy product_images_auth_update
on storage.objects
for update
to authenticated
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');

drop policy if exists product_images_auth_delete on storage.objects;
create policy product_images_auth_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'product-images');
