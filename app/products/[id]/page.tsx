import Link from "next/link";
import { notFound } from "next/navigation";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { ProductBuyActions } from "@/components/product/ProductBuyActions";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { getProductById } from "@/lib/data";
import { listProductImageUrls } from "@/lib/product-images";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const supabase = await createClient();
  const gallery = await listProductImageUrls(supabase, product.id);
  const images = gallery.length > 0 ? gallery : [product.image_url];

  return (
    <>
      <SiteHeader variant="solid" />

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14">
        <ProductGallery title={product.title} images={images} />

        <div className="flex flex-col justify-center">
          {product.collections?.name ? (
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              {product.collections.name}
            </p>
          ) : null}
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            {product.title}
          </h1>
          <PriceDisplay price={product.price} className="mt-4 text-xl" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {product.short_description}
          </p>

          <ProductBuyActions
            product={{
              id: product.id,
              title: product.title,
              price: product.price,
              image_url: images[0] ?? product.image_url,
            }}
          />

          <div className="mt-6">
            <Link
              href="/#products"
              className="text-sm text-muted underline underline-offset-2 transition hover:text-foreground"
            >
              Back to watches
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
