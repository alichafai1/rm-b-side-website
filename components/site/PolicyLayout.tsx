import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { siteContent } from "@/lib/content";
import type { PolicyPage } from "@/lib/policies";

type PolicyLayoutProps = {
  policy: PolicyPage;
};

export function PolicyLayout({ policy }: PolicyLayoutProps) {
  return (
    <>
      <header className="border-b border-line bg-background/90">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-2xl tracking-tight"
          >
            {siteContent.brand}
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition hover:text-foreground"
          >
            Back home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12 sm:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Legal</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          {policy.title}
        </h1>
        <p className="mt-3 text-sm text-muted">Last updated: {policy.updated}</p>

        <div className="mt-10 space-y-10">
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-medium tracking-tight">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
