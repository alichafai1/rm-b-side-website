"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { items, subtotal, ready, setQuantity, removeItem } = useCart();

  if (!ready) {
    return <p className="text-muted">Loading cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-muted">Your cart is empty.</p>
        <Link
          href="/#products"
          className="inline-flex bg-accent px-5 py-3 text-sm font-medium tracking-wide text-hero-ink transition hover:bg-foreground"
        >
          Browse watches
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ul className="divide-y divide-line border-y border-line">
        {items.map((item) => (
          <li key={item.id} className="flex gap-4 py-5 sm:gap-6">
            <Link
              href={`/products/${item.id}`}
              className="relative h-24 w-20 shrink-0 overflow-hidden bg-surface sm:h-28 sm:w-24"
            >
              <ProductImage
                src={item.image_url}
                alt={item.title}
                fill
                className="object-cover"
                sizes="96px"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Link
                    href={`/products/${item.id}`}
                    className="font-medium tracking-tight transition hover:text-accent"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-muted">
                  Qty
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(event) =>
                      setQuantity(item.id, Number(event.target.value))
                    }
                    className="w-16 border border-line bg-background px-2 py-1.5 text-foreground outline-none ring-accent focus:ring-2"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-sm text-muted underline underline-offset-2 transition hover:text-foreground"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">Subtotal</p>
          <p className="mt-1 text-2xl font-medium text-accent">
            {formatPrice(subtotal)}
          </p>
          <p className="mt-1 text-sm text-muted">Shipping calculated at checkout.</p>
        </div>
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-medium tracking-wide text-hero-ink transition hover:bg-foreground"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
