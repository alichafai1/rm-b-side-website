"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { CartProductInput } from "@/lib/cart";

type ProductBuyActionsProps = {
  product: CartProductInput;
};

export function ProductBuyActions({ product }: ProductBuyActionsProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="mt-10 space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            addItem(product);
            setMessage("Added to cart");
          }}
          className="inline-flex items-center justify-center border border-foreground bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-foreground transition hover:bg-foreground hover:text-hero-ink"
        >
          Add to cart
        </button>
        <button
          type="button"
          onClick={() => {
            addItem(product);
            router.push("/checkout");
          }}
          className="inline-flex items-center justify-center bg-accent px-6 py-3 text-sm font-medium tracking-wide text-hero-ink transition hover:bg-foreground"
        >
          Buy now
        </button>
      </div>
      {message ? (
        <p className="text-sm text-accent">
          {message}.{" "}
          <Link href="/cart" className="underline underline-offset-2">
            View cart
          </Link>
        </p>
      ) : null}
    </div>
  );
}
