"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product/ProductImage";

type ProductGalleryProps = {
  title: string;
  images: string[];
};

export function ProductGallery({ title, images }: ProductGalleryProps) {
  const gallery = images.length > 0 ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? gallery[0];

  if (!activeImage) {
    return <div className="aspect-[4/5] bg-surface" />;
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <ProductImage
          src={activeImage}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {gallery.length > 1 ? (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[4/5] overflow-hidden border ${
                index === activeIndex
                  ? "border-accent"
                  : "border-line hover:border-accent/40"
              }`}
            >
              <ProductImage
                src={src}
                alt={`${title} image ${index + 1}`}
                fill
                className="object-cover"
                sizes="160px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
