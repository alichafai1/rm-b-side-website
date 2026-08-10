import { CollectionsSection } from "@/components/site/CollectionsSection";
import { Hero } from "@/components/site/Hero";
import { ProductsSection } from "@/components/site/ProductsSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { TrustSection } from "@/components/site/TrustSection";
import { getCollections, getProducts } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts(6),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <CollectionsSection collections={collections} />
        <ProductsSection products={products} />
        <TrustSection />
      </main>
      <SiteFooter />
    </>
  );
}
