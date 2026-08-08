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

export type ImageSlotInput = {
  file: File | null;
  keepUrl: string | null;
};

export function collectImageSlots(formData: FormData): ImageSlotInput[] {
  let keepUrls: Array<string | null> = [];
  try {
    const raw = String(formData.get("keep_urls") ?? "[]");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      keepUrls = parsed.map((value) =>
        typeof value === "string" && value.length > 0 ? value : null,
      );
    }
  } catch {
    keepUrls = [];
  }

  const slots: ImageSlotInput[] = [];

  for (let index = 0; index < MAX_PRODUCT_IMAGES; index += 1) {
    const value = formData.get(`image_${index}`);
    const file = value instanceof File && value.size > 0 ? value : null;
    slots.push({
      file,
      keepUrl: keepUrls[index] ?? null,
    });
  }

  return slots;
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

export async function saveProductImageSlots(
  supabase: SupabaseClient,
  productId: string,
  slots: ImageSlotInput[],
): Promise<string[]> {
  const hasNewFiles = slots.some((slot) => slot.file);
  if (!hasNewFiles) {
    const existing = await listProductImageUrls(supabase, productId);
    return existing;
  }

  const orderedFiles: File[] = [];

  for (let index = 0; index < slots.length; index += 1) {
    const slot = slots[index];
    if (slot.file) {
      orderedFiles.push(slot.file);
    } else if (slot.keepUrl) {
      const response = await fetch(slot.keepUrl);
      if (!response.ok) {
        throw new Error("Failed to keep an existing product image.");
      }
      const blob = await response.blob();
      const extension =
        slot.keepUrl.split(".").pop()?.split("?")[0]?.toLowerCase() || "jpg";
      orderedFiles.push(
        new File([blob], `kept-${index}.${extension}`, {
          type: blob.type || "image/jpeg",
        }),
      );
    }
  }

  if (orderedFiles.length === 0) {
    throw new Error("Upload at least 1 image (up to 3).");
  }

  await clearProductImages(supabase, productId);
  return uploadProductImages(supabase, productId, orderedFiles);
}
