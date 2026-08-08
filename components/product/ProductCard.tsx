import Link from "next/link";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { ProductImage } from "@/components/product/ProductImage";
import type { ProductWithCollection } from "@/lib/types";

type ProductCardProps = {
  product: ProductWithCollection;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block border border-line bg-background/70 transition hover:border-accent/40 hover:bg-surface/50"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <ProductImage
          src={product.image_url}
          alt={product.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-medium tracking-tight">{product.title}</h3>
          <PriceDisplay price={product.price} className="shrink-0 text-sm" />
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {product.short_description}
        </p>
        {product.collections?.name ? (
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {product.collections.name}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
