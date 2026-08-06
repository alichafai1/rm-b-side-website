import Link from "next/link";
import { siteContent } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center px-5 py-20 sm:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">404</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-muted">
        That page isn’t part of the {siteContent.brand} collection.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit bg-accent px-5 py-3 text-sm font-medium tracking-wide text-hero-ink transition hover:bg-foreground"
      >
        Back home
      </Link>
    </main>
  );
}
