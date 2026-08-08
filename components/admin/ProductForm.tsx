"use client";

import { useMemo, useState, useTransition } from "react";
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

type ImageSlot = {
  file: File | null;
  preview: string | null;
};

function emptySlots(): ImageSlot[] {
  return Array.from({ length: MAX_PRODUCT_IMAGES }, () => ({
    file: null,
    preview: null,
  }));
}

export function ProductForm({
  collections,
  product,
  existingImages = [],
}: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [slots, setSlots] = useState<ImageSlot[]>(emptySlots);
  const [isPending, startTransition] = useTransition();
  const isEditing = Boolean(product);

  const selectedCount = useMemo(
    () => slots.filter((slot) => slot.file).length,
    [slots],
  );

  function updateSlot(index: number, file: File | null) {
    setSlots((current) =>
      current.map((slot, slotIndex) => {
        if (slotIndex !== index) return slot;
        if (slot.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(slot.preview);
        }
        return {
          file,
          preview: file ? URL.createObjectURL(file) : null,
        };
      }),
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const keepUrls = slots.map((slot, index) =>
          slot.file ? null : existingImages[index] ?? null,
        );
        formData.set("keep_urls", JSON.stringify(keepUrls));

        slots.forEach((slot, index) => {
          if (slot.file) {
            formData.set(`image_${index}`, slot.file);
          }
        });

        if (!isEditing && selectedCount === 0) {
          setError("Upload at least 1 image (up to 3).");
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
            Watch images (1–{MAX_PRODUCT_IMAGES})
          </p>
          <p className="mt-1 text-xs text-muted">
            Choose a photo for each slot. Image 1 is the main photo.
            {isEditing
              ? " Leave slots empty to keep current images."
              : " Image 2 and Image 3 are optional."}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {slots.map((slot, index) => {
            const label =
              index === 0 ? "Image 1 (main)" : `Image ${index + 1} (optional)`;
            const preview = slot.preview ?? existingImages[index] ?? null;

            return (
              <div key={label} className="space-y-2 rounded-sm border border-line p-3">
                <label
                  htmlFor={`image-slot-${index}`}
                  className="block text-sm text-muted"
                >
                  {label}
                </label>
                <input
                  id={`image-slot-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    updateSlot(index, file);
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
                    {slot.file ? (
                      <button
                        type="button"
                        onClick={() => updateSlot(index, null)}
                        className="absolute right-2 top-2 bg-white/90 px-2 py-0.5 text-[10px] uppercase tracking-wide text-foreground"
                      >
                        Clear
                      </button>
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
