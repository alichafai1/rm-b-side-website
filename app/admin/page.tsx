import Link from "next/link";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { ProductImage } from "@/components/product/ProductImage";
import { getProducts } from "@/lib/data";

export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Dashboard
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
            Watches
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-accent px-5 py-3 text-sm font-medium tracking-wide text-hero-ink transition hover:bg-foreground"
        >
          Add watch
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="mt-10 border border-line bg-surface/50 px-5 py-8 text-muted">
          No watches yet. Create your first watch to populate the showcase.
        </p>
      ) : (
        <div className="mt-10 overflow-hidden border border-line">
          <ul className="divide-y divide-line">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-surface">
                  <ProductImage
                    src={product.image_url}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{product.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
                    <PriceDisplay price={product.price} className="text-sm" />
                    {product.collections?.name ? (
                      <span>· {product.collections.name}</span>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-sm text-accent transition hover:text-foreground"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton
                    productId={product.id}
                    productTitle={product.title}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
