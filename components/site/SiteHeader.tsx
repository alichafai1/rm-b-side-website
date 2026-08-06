import Link from "next/link";
import { siteContent } from "@/lib/content";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-hero-ink sm:text-3xl"
        >
          {siteContent.brand}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-hero-ink/85 sm:gap-7">
          <a href="#collections" className="transition hover:text-hero-ink">
            Collections
          </a>
          <a href="#products" className="transition hover:text-hero-ink">
            Watches
          </a>
          <a
            href={`mailto:${siteContent.footer.contact.email}`}
            className="transition hover:text-hero-ink"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
