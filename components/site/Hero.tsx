import Image from "next/image";
import { siteContent } from "@/lib/content";

export function Hero() {
  const { hero, brand } = siteContent;

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src={hero.imageSrc}
        alt={hero.imageAlt}
        fill
        priority
        className="animate-image-pan object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/25" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
        <p className="animate-rise mb-4 font-[family-name:var(--font-display)] text-4xl text-hero-ink sm:text-5xl md:text-6xl">
          {brand}
        </p>
        <h1 className="animate-rise delay-1 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-hero-ink sm:text-4xl md:text-5xl">
          {hero.title}
        </h1>
        <p className="animate-rise delay-2 mt-4 max-w-xl text-base leading-relaxed text-hero-ink/85 sm:text-lg">
          {hero.text}
        </p>
        <div className="animate-rise delay-3 mt-8">
          <a
            href={hero.ctaHref}
            className="inline-flex items-center bg-hero-ink px-6 py-3 text-sm font-medium tracking-wide text-foreground transition hover:bg-white"
          >
            {hero.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
