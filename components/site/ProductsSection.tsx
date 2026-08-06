import { ProductCard } from "@/components/product/ProductCard";
import { siteContent } from "@/lib/content";
import type { ProductWithCollection } from "@/lib/types";

type ProductsSectionProps = {
  products: ProductWithCollection[];
};

export function ProductsSection({ products }: ProductsSectionProps) {
  const copy = siteContent.products;

  return (
    <section id="products" className="scroll-mt-8 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-3 text-muted">{copy.text}</p>
        </div>

        {products.length === 0 ? (
          <p className="rounded-sm border border-line bg-surface/60 px-5 py-8 text-muted">
            {copy.empty}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
