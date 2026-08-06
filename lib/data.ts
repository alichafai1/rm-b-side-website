import { createClient } from "@/lib/supabase/server";
import { getSupabaseEnv } from "@/lib/supabase/env";
import type { Collection, Product, ProductWithCollection } from "@/lib/types";

export async function getCollections(): Promise<Collection[]> {
  if (!getSupabaseEnv()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("collections")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Failed to load collections:", error.message);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("Failed to load collections:", error);
    return [];
  }
}

export async function getProducts(): Promise<ProductWithCollection[]> {
  if (!getSupabaseEnv()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, collections(id, name, slug)")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load products:", error.message);
      return [];
    }

    return (data as ProductWithCollection[]) ?? [];
  } catch (error) {
    console.error("Failed to load products:", error);
    return [];
  }
}

export async function getProductById(
  id: string,
): Promise<ProductWithCollection | null> {
  if (!getSupabaseEnv()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, collections(id, name, slug)")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Failed to load product:", error.message);
      return null;
    }

    return data as ProductWithCollection | null;
  } catch (error) {
    console.error("Failed to load product:", error);
    return null;
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!getSupabaseEnv()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Failed to load product:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to load product:", error);
    return null;
  }
}
