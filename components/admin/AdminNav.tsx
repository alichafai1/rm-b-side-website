import Link from "next/link";
import { logoutAction } from "@/actions/auth";
import { siteContent } from "@/lib/content";

export function AdminNav() {
  return (
    <header className="border-b border-line bg-background/90">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="font-[family-name:var(--font-display)] text-xl tracking-tight"
          >
            {siteContent.brand} Admin
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition hover:text-foreground"
          >
            View site
          </Link>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-muted transition hover:text-foreground"
          >
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
