import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader variant="solid" />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8">
        <div className="mb-8 max-w-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-muted">
            Checkout
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
            Complete your order
          </h1>
        </div>
        <CheckoutForm />
      </main>
      <SiteFooter />
    </>
  );
}
