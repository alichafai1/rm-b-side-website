import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCollections } from "@/lib/data";

export default async function NewProductPage() {
  const collections = await getCollections();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8">
      <Link
        href="/admin"
        className="text-sm text-muted transition hover:text-foreground"
      >
        ← Back to watches
      </Link>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Add watch
      </h1>
      <p className="mt-3 text-sm text-muted">
        Upload an image and fill in the details. The watch appears on the
        homepage immediately.
      </p>
      <div className="mt-8 border border-line bg-background/80 p-6">
        <ProductForm collections={collections} />
      </div>
    </main>
  );
}
