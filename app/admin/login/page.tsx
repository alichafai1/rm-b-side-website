import { LoginForm } from "@/components/admin/LoginForm";
import { siteContent } from "@/lib/content";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-16 sm:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Admin</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight">
        Sign in to {siteContent.brand}
      </h1>
      <p className="mt-3 text-sm text-muted">
        Manage watches for the patara showcase. Sign in with your admin
        account.
      </p>
      <div className="mt-8 border border-line bg-background/80 p-6">
        <LoginForm />
      </div>
    </main>
  );
}
