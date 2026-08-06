"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import {
  createProductAction,
  updateProductAction,
} from "@/actions/products";
import type { Collection, Product } from "@/lib/types";

type ProductFormProps = {
  collections: Collection[];
  product?: Product;
};

export function ProductForm({ collections, product }: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(
    product?.image_url ?? null,
  );
  const [isPending, startTransition] = useTransition();
  const isEditing = Boolean(product);

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
      <div className="grid gap-6 md:grid-cols-2">
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
        <label htmlFor="image" className="mb-2 block text-sm text-muted">
          Watch image {isEditing ? "(optional — leave blank to keep current)" : ""}
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required={!isEditing}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            setPreview(URL.createObjectURL(file));
          }}
          className="w-full border border-line bg-background px-3 py-2.5 file:mr-4 file:border-0 file:bg-accent-soft file:px-3 file:py-1.5 file:text-sm"
        />
        {preview ? (
          <div className="relative mt-4 aspect-[4/5] w-full max-w-xs overflow-hidden bg-surface">
            <Image
              src={preview}
              alt="Watch preview"
              fill
              className="object-cover"
              unoptimized={preview.startsWith("blob:")}
            />
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
