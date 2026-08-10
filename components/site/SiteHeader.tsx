import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { siteContent } from "@/lib/content";

type SiteHeaderProps = {
  variant?: "overlay" | "solid";
};

export function SiteHeader({ variant = "overlay" }: SiteHeaderProps) {
  const isOverlay = variant === "overlay";

  return (
    <header
      className={
        isOverlay
          ? "absolute inset-x-0 top-0 z-20"
          : "border-b border-line bg-background/90"
      }
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link
          href="/"
          className={`font-[family-name:var(--font-display)] text-2xl tracking-tight sm:text-3xl ${
            isOverlay ? "text-hero-ink" : "text-foreground"
          }`}
        >
          {siteContent.brand}
        </Link>
        <nav
          className={`flex items-center gap-5 text-sm sm:gap-7 ${
            isOverlay ? "text-hero-ink/85" : "text-muted"
          }`}
        >
          <Link
            href="/#collections"
            className={`transition ${
              isOverlay ? "hover:text-hero-ink" : "hover:text-foreground"
            }`}
          >
            Collections
          </Link>
          <Link
            href="/#products"
            className={`transition ${
              isOverlay ? "hover:text-hero-ink" : "hover:text-foreground"
            }`}
          >
            Watches
          </Link>
          <a
            href={`mailto:${siteContent.footer.contact.email}`}
            className={`transition ${
              isOverlay ? "hover:text-hero-ink" : "hover:text-foreground"
            }`}
          >
            Contact
          </a>
          <CartButton tone={isOverlay ? "light" : "dark"} />
        </nav>
      </div>
    </header>
  );
}
