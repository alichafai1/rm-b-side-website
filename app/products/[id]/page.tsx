import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/lib/data";
import { siteContent } from "@/lib/content";

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

  return (
    <>
      <header className="border-b border-line bg-background/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
          >
            {siteContent.brand}
          </Link>
          <Link href="/#products" className="text-sm text-muted transition hover:text-foreground">
            Back to watches
          </Link>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          {product.collections?.name ? (
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              {product.collections.name}
            </p>
          ) : null}
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-4 text-xl text-accent">{formatPrice(product.price)}</p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            {product.short_description}
          </p>
          <div className="mt-10">
            <Link
              href="/#products"
              className="inline-flex items-center bg-accent px-6 py-3 text-sm font-medium tracking-wide text-hero-ink transition hover:bg-foreground"
            >
              View all watches
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
