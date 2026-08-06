"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function requireFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const shortDescription = String(
    formData.get("short_description") ?? "",
  ).trim();
  const collectionId = String(formData.get("collection_id") ?? "").trim();
  const image = formData.get("image");

  if (!title || !priceRaw || !shortDescription || !collectionId) {
    return {
      error: "Title, price, description, and collection are required.",
    } as const;
  }

  const price = Number(priceRaw);
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Enter a valid price." } as const;
  }

  return {
    title,
    price,
    shortDescription,
    collectionId,
    image: image instanceof File ? image : null,
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

async function uploadProductImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  productId: string,
  image: File,
) {
  const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `products/${productId}/${Date.now()}.${extension}`;

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

  return publicUrl;
}

export async function createProductAction(formData: FormData) {
  const parsed = requireFields(formData);
  if ("error" in parsed) {
    return parsed;
  }

  if (!parsed.image || parsed.image.size === 0) {
    return { error: "A product image is required." };
  }

  const supabase = await requireUser();
  const productId = crypto.randomUUID();

  let imageUrl: string;
  try {
    imageUrl = await uploadProductImage(supabase, productId, parsed.image);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to upload image.",
    };
  }

  const { error } = await supabase.from("products").insert({
    id: productId,
    title: parsed.title,
    price: parsed.price,
    short_description: parsed.shortDescription,
    collection_id: parsed.collectionId,
    image_url: imageUrl,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProductAction(productId: string, formData: FormData) {
  const parsed = requireFields(formData);
  if ("error" in parsed) {
    return parsed;
  }

  const supabase = await requireUser();
  let imageUrl: string | undefined;

  if (parsed.image && parsed.image.size > 0) {
    try {
      imageUrl = await uploadProductImage(supabase, productId, parsed.image);
    } catch (error) {
      return {
        error:
          error instanceof Error ? error.message : "Failed to upload image.",
      };
    }
  }

  const { error } = await supabase
    .from("products")
    .update({
      title: parsed.title,
      price: parsed.price,
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

  const { error } = await supabase.from("products").delete().eq("id", productId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
