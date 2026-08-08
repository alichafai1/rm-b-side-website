-- Allow up to several product images per watch.
alter table public.products
add column if not exists image_urls text[] not null default '{}';

-- Backfill from the existing primary image.
update public.products
set image_urls = array[image_url]
where coalesce(array_length(image_urls, 1), 0) = 0
  and image_url is not null
  and image_url <> '';
