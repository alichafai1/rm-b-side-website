-- Add compare_price to products
alter table public.products
add column if not exists compare_price numeric(10, 2) check (compare_price is null or compare_price >= 0);
