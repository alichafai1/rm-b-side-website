import type { SupabaseClient } from "@supabase/supabase-js";

export const MAX_PRODUCT_IMAGES = 3;

export function getPrimaryImageUrl(
  product: { image_url: string; image_urls?: string[] | null },
  gallery: string[] = [],
) {
  if (gallery.length > 0) return gallery[0];
  if (product.image_urls && product.image_urls.length > 0) {
    return product.image_urls[0];
  }
  return product.image_url;
}

export function collectImageFiles(formData: FormData): File[] {
  const files = formData
    .getAll("images")
    .filter((value): value is File => value instanceof File && value.size > 0);

  return files.slice(0, MAX_PRODUCT_IMAGES);
}

export async function listProductImageUrls(
  supabase: SupabaseClient,
  productId: string,
): Promise<string[]> {
  const { data, error } = await supabase.storage
    .from("product-images")
    .list(`products/${productId}`, {
      limit: 20,
      sortBy: { column: "name", order: "asc" },
    });

  if (error || !data) {
    return [];
  }

  return data
    .filter((file) => Boolean(file.name) && !file.name.endsWith("/"))
    .map(
      (file) =>
        supabase.storage
          .from("product-images")
          .getPublicUrl(`products/${productId}/${file.name}`).data.publicUrl,
    );
}

export async function clearProductImages(
  supabase: SupabaseClient,
  productId: string,
) {
  const { data } = await supabase.storage
    .from("product-images")
    .list(`products/${productId}`, { limit: 50 });

  if (!data?.length) return;

  const paths = data
    .filter((file) => Boolean(file.name) && !file.name.endsWith("/"))
    .map((file) => `products/${productId}/${file.name}`);

  if (paths.length === 0) return;

  const { error } = await supabase.storage.from("product-images").remove(paths);
  if (error) {
    throw new Error(error.message);
  }
}

export async function uploadProductImages(
  supabase: SupabaseClient,
  productId: string,
  images: File[],
): Promise<string[]> {
  if (images.length === 0) {
    throw new Error("At least one product image is required.");
  }

  if (images.length > MAX_PRODUCT_IMAGES) {
    throw new Error(`You can upload up to ${MAX_PRODUCT_IMAGES} images.`);
  }

  const urls: string[] = [];

  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];
    const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `products/${productId}/${String(index + 1).padStart(2, "0")}-${Date.now()}-${index}.${extension}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, image, {
        cacheControl: "3600",
        upsert: false,
        contentType: image.type || "image/jpeg",
      });

    if (error) {
      throw new Error(error.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(path);

    urls.push(publicUrl);
  }

  return urls;
}
