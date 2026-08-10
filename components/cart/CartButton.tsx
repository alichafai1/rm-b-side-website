"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

type CartButtonProps = {
  tone?: "light" | "dark";
};

export function CartButton({ tone = "dark" }: CartButtonProps) {
  const { count, ready } = useCart();
  const isLight = tone === "light";

  return (
    <Link
      href="/cart"
      className={`relative inline-flex items-center gap-2 text-sm transition ${
        isLight
          ? "text-hero-ink/85 hover:text-hero-ink"
          : "text-muted hover:text-foreground"
      }`}
      aria-label={ready && count > 0 ? `Cart, ${count} items` : "Cart"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.5 5h1.7l1.2 10.2a1.5 1.5 0 0 0 1.5 1.3h8.8a1.5 1.5 0 0 0 1.5-1.2L19.5 8H7"
        />
        <circle cx="9.5" cy="19" r="1.2" />
        <circle cx="16.5" cy="19" r="1.2" />
      </svg>
      <span className="hidden sm:inline">Cart</span>
      {ready && count > 0 ? (
        <span
          className={`absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-medium ${
            isLight
              ? "bg-hero-ink text-foreground"
              : "bg-accent text-hero-ink"
          }`}
        >
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
