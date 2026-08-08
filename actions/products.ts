"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearProductImages,
  collectImageFiles,
  MAX_PRODUCT_IMAGES,
  uploadProductImages,
} from "@/lib/product-images";
import { createClient } from "@/lib/supabase/server";

function requireFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const comparePriceRaw = String(formData.get("compare_price") ?? "").trim();
  const shortDescription = String(
    formData.get("short_description") ?? "",
  ).trim();
  const collectionId = String(formData.get("collection_id") ?? "").trim();
  const images = collectImageFiles(formData);

  if (!title || !priceRaw || !shortDescription || !collectionId) {
    return {
      error: "Title, price, description, and collection are required.",
    } as const;
  }

  const price = Number(priceRaw);
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Enter a valid price." } as const;
  }

  let comparePrice: number | null = null;
  if (comparePriceRaw) {
    comparePrice = Number(comparePriceRaw);
    if (!Number.isFinite(comparePrice) || comparePrice < 0) {
      return { error: "Enter a valid compare price." } as const;
    }
  }

  if (images.length > MAX_PRODUCT_IMAGES) {
    return {
      error: `You can upload up to ${MAX_PRODUCT_IMAGES} images.`,
    } as const;
  }

  return {
    title,
    price,
    comparePrice,
    shortDescription,
    collectionId,
    images,
  } as const;
}

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return supabase;
}

export async function createProductAction(formData: FormData) {
  const parsed = requireFields(formData);
  if ("error" in parsed) {
    return parsed;
  }

  if (parsed.images.length === 0) {
    return { error: "Upload at least 1 image (up to 3)." };
  }

  const supabase = await requireUser();
  const productId = crypto.randomUUID();

  let imageUrls: string[];
  try {
    imageUrls = await uploadProductImages(
      supabase,
      productId,
      parsed.images,
    );
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to upload images.",
    };
  }

  const { error } = await supabase.from("products").insert({
    id: productId,
    title: parsed.title,
    price: parsed.price,
    compare_price: parsed.comparePrice,
    short_description: parsed.shortDescription,
    collection_id: parsed.collectionId,
    image_url: imageUrls[0],
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProductAction(
  productId: string,
  formData: FormData,
) {
  const parsed = requireFields(formData);
  if ("error" in parsed) {
    return parsed;
  }

  const supabase = await requireUser();
  let imageUrl: string | undefined;

  if (parsed.images.length > 0) {
    try {
      await clearProductImages(supabase, productId);
      const imageUrls = await uploadProductImages(
        supabase,
        productId,
        parsed.images,
      );
      imageUrl = imageUrls[0];
    } catch (error) {
      return {
        error:
          error instanceof Error ? error.message : "Failed to upload images.",
      };
    }
  }

  const { error } = await supabase
    .from("products")
    .update({
      title: parsed.title,
      price: parsed.price,
      compare_price: parsed.comparePrice,
      short_description: parsed.shortDescription,
      collection_id: parsed.collectionId,
      ...(imageUrl ? { image_url: imageUrl } : {}),
    })
    .eq("id", productId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath(`/products/${productId}`);
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProductAction(productId: string) {
  const supabase = await requireUser();

  try {
    await clearProductImages(supabase, productId);
  } catch {
    // Continue deleting the product row even if storage cleanup fails.
  }

  const { error } = await supabase.from("products").delete().eq("id", productId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
