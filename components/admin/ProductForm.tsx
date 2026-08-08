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

export function ProductForm({
  collections,
  product,
  existingImages = [],
}: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const isEditing = Boolean(product);

  const currentImages = useMemo(() => {
    if (previews.length > 0) return previews;
    if (existingImages.length > 0) return existingImages;
    return product?.image_url ? [product.image_url] : [];
  }, [existingImages, previews, product?.image_url]);

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
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

      <div>
        <label htmlFor="images" className="mb-2 block text-sm text-muted">
          Watch images (1–{MAX_PRODUCT_IMAGES})
          {isEditing
            ? " — leave empty to keep current images, or choose new ones to replace them"
            : ""}
        </label>
        <input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          required={!isEditing}
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []).slice(
              0,
              MAX_PRODUCT_IMAGES,
            );
            setPreviews(files.map((file) => URL.createObjectURL(file)));
          }}
          className="w-full border border-line bg-background px-3 py-2.5 file:mr-4 file:border-0 file:bg-accent-soft file:px-3 file:py-1.5 file:text-sm"
        />
        <p className="mt-2 text-xs text-muted">
          You can select up to {MAX_PRODUCT_IMAGES} images. The first image is
          used as the main product photo.
        </p>

        {currentImages.length > 0 ? (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {currentImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative aspect-[4/5] overflow-hidden bg-surface"
              >
                <ProductImage
                  src={src}
                  alt={`Watch image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                {index === 0 ? (
                  <span className="absolute left-2 top-2 bg-foreground/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-hero-ink">
                    Main
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
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
