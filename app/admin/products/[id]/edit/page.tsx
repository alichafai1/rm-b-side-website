import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCollections, getProduct } from "@/lib/data";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const [collections, product] = await Promise.all([
    getCollections(),
    getProduct(id),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <Link
        href="/admin"
        className="text-sm text-muted transition hover:text-foreground"
      >
        ← Back to watches
      </Link>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Edit watch
      </h1>
      <p className="mt-3 text-sm text-muted">
        Update details or replace the watch image.
      </p>
      <div className="mt-8 border border-line bg-background/80 p-6">
        <ProductForm collections={collections} product={product} />
      </div>
    </main>
  );
}
