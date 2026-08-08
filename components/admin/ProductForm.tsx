"use client";

import { useState, useTransition } from "react";
import {
  createProductAction,
  updateProductAction,
} from "@/actions/products";
import { ProductImage } from "@/components/product/ProductImage";
import { MAX_PRODUCT_IMAGES } from "@/lib/product-images";
import type { Collection, Product } from "@/lib/types";

type ProductFormProps = {
  collections: Collection[];
  product?: Product;
  existingImages?: string[];
};

export function ProductForm({
  collections,
  product,
  existingImages = [],
}: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Array<string | null>>(
    Array.from({ length: MAX_PRODUCT_IMAGES }, () => null),
  );
  const [isPending, startTransition] = useTransition();
  const isEditing = Boolean(product);

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        // Keep current images for any slot the user did not replace.
        const keepUrls = Array.from({ length: MAX_PRODUCT_IMAGES }, (_, index) => {
          const selected = formData.get(`image_${index}`);
          const hasNewFile = selected instanceof File && selected.size > 0;
          return hasNewFile ? null : existingImages[index] ?? null;
        });
        formData.set("keep_urls", JSON.stringify(keepUrls));

        const hasAnyNewFile = Array.from({ length: MAX_PRODUCT_IMAGES }).some(
          (_, index) => {
            const selected = formData.get(`image_${index}`);
            return selected instanceof File && selected.size > 0;
          },
        );
        const hasExisting = existingImages.length > 0;

        if (!isEditing && !hasAnyNewFile) {
          setError("Please choose at least 1 image. You can add up to 3.");
          return;
        }

        if (isEditing && !hasAnyNewFile && !hasExisting) {
          setError("Please choose at least 1 image. You can add up to 3.");
          return;
        }

        setError(null);
        startTransition(async () => {
          const result = product
            ? await updateProductAction(product.id, formData)
            : await createProductAction(formData);
          if (result?.error) {
            setError(result.error);
          }
        });
      }}
    >
      <div>
        <label htmlFor="title" className="mb-2 block text-sm text-muted">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={product?.title}
          className="w-full border border-line bg-background px-3 py-2.5 outline-none ring-accent focus:ring-2"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-2 block text-sm text-muted">
            Price (USD)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            defaultValue={product?.price}
            className="w-full border border-line bg-background px-3 py-2.5 outline-none ring-accent focus:ring-2"
          />
        </div>
        <div>
          <label
            htmlFor="compare_price"
            className="mb-2 block text-sm text-muted"
          >
            Compare price (USD)
          </label>
          <input
            id="compare_price"
            name="compare_price"
            type="number"
            min="0"
            step="0.01"
            defaultValue={product?.compare_price ?? undefined}
            className="w-full border border-line bg-background px-3 py-2.5 outline-none ring-accent focus:ring-2"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="short_description"
          className="mb-2 block text-sm text-muted"
        >
          Short description
        </label>
        <textarea
          id="short_description"
          name="short_description"
          required
          rows={4}
          defaultValue={product?.short_description}
          className="w-full border border-line bg-background px-3 py-2.5 outline-none ring-accent focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="collection_id"
          className="mb-2 block text-sm text-muted"
        >
          Collection
        </label>
        <select
          id="collection_id"
          name="collection_id"
          required
          defaultValue={product?.collection_id ?? ""}
          className="w-full border border-line bg-background px-3 py-2.5 outline-none ring-accent focus:ring-2"
        >
          <option value="" disabled>
            Choose a collection
          </option>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-foreground">
            Watch images (1, 2, or 3)
          </p>
          <p className="mt-1 text-xs text-muted">
            Add only the images you need. Image 1 is the main photo. Image 2 and
            Image 3 are optional.
            {isEditing
              ? " Leave a slot empty to keep its current image."
              : ""}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: MAX_PRODUCT_IMAGES }, (_, index) => {
            const label =
              index === 0 ? "Image 1 (main)" : `Image ${index + 1} (optional)`;
            const preview = previews[index] ?? existingImages[index] ?? null;

            return (
              <div
                key={label}
                className="space-y-2 rounded-sm border border-line p-3"
              >
                <label
                  htmlFor={`image_${index}`}
                  className="block text-sm text-muted"
                >
                  {label}
                </label>
                <input
                  id={`image_${index}`}
                  name={`image_${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setPreviews((current) => {
                      const next = [...current];
                      if (next[index]?.startsWith("blob:")) {
                        URL.revokeObjectURL(next[index] as string);
                      }
                      next[index] = file ? URL.createObjectURL(file) : null;
                      return next;
                    });
                  }}
                  className="w-full text-sm file:mr-3 file:border-0 file:bg-accent-soft file:px-3 file:py-1.5"
                />
                {preview ? (
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <ProductImage
                      src={preview}
                      alt={label}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                    {index === 0 ? (
                      <span className="absolute left-2 top-2 bg-foreground/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-hero-ink">
                        Main
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex aspect-[4/5] items-center justify-center border border-dashed border-line text-xs text-muted">
                    No image
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {error ? (
        <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="bg-accent px-5 py-3 text-sm font-medium tracking-wide text-hero-ink transition hover:bg-foreground disabled:opacity-60"
      >
        {isPending
          ? isEditing
            ? "Saving…"
            : "Creating…"
          : isEditing
            ? "Save changes"
            : "Create watch"}
      </button>
    </form>
  );
}
