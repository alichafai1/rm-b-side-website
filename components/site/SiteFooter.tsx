import Link from "next/link";
import { siteContent } from "@/lib/content";
import { legalLinks } from "@/lib/policies";

export function SiteFooter() {
  const { brand, footer } = siteContent;

  return (
    <footer className="border-t border-line bg-foreground text-hero-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-[family-name:var(--font-display)] text-3xl">
            {brand}
          </p>
          <p className="mt-2 text-sm text-hero-ink/70">{footer.company}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-hero-ink/75">
            {footer.blurb}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-hero-ink/60">
            Links
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {footer.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/admin/login" className="transition hover:text-white">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-hero-ink/60">
            Legal
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-hero-ink/60">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-hero-ink/80">
            <li>
              <a
                href={`mailto:${footer.contact.email}`}
                className="transition hover:text-white"
              >
                {footer.contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${footer.contact.phone}`}
                className="transition hover:text-white"
              >
                {footer.contact.phone}
              </a>
            </li>
            <li className="leading-relaxed">
              {footer.contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-hero-ink/50 sm:px-8">
        © {new Date().getFullYear()} {footer.company}. All rights reserved.
      </div>
    </footer>
  );
}
