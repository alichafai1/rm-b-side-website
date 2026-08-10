import { ProductImage } from "@/components/product/ProductImage";
import { siteContent } from "@/lib/content";
import type { Collection } from "@/lib/types";

type CollectionsSectionProps = {
  collections: Collection[];
};

function collectionImageSrc(collection: Collection) {
  const curated =
    siteContent.collections.images[
      collection.slug as keyof typeof siteContent.collections.images
    ];
  if (curated) return curated;

  const remote = collection.image_url;
  if (remote && !remote.endsWith(".svg")) return remote;
  return null;
}

export function CollectionsSection({ collections }: CollectionsSectionProps) {
  const copy = siteContent.collections;

  return (
    <section id="collections" className="scroll-mt-8 px-5 py-20 sm:px-8">
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

        {collections.length === 0 ? (
          <p className="rounded-sm border border-line bg-surface/60 px-5 py-8 text-muted">
            {copy.empty}
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => {
              const imageSrc = collectionImageSrc(collection);

              return (
                <a
                  key={collection.id}
                  href="#products"
                  className="group relative block aspect-[4/5] overflow-hidden"
                >
                  {imageSrc ? (
                    <ProductImage
                      src={imageSrc}
                      alt={collection.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-surface-strong" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-[family-name:var(--font-display)] text-3xl text-hero-ink">
                      {collection.name}
                    </h3>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
