"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/format";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "United States",
  notes: "",
};

export function CheckoutForm() {
  const { items, subtotal, ready, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [placedItems, setPlacedItems] = useState(items);
  const [placedTotal, setPlacedTotal] = useState(0);

  const shipping = items.length > 0 ? 0 : 0;
  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  if (!ready) {
    return <p className="text-muted">Loading checkout…</p>;
  }

  if (orderId) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">
            Order confirmed
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight">
            Thank you
          </h1>
          <p className="mt-3 text-muted">
            Your order <span className="text-foreground">{orderId}</span> was
            received. We&apos;ll contact you at {form.email} to confirm payment
            and delivery.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {placedItems.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 py-3 text-sm">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <p className="text-lg font-medium text-accent">
          Total {formatPrice(placedTotal)}
        </p>

        <Link
          href="/#products"
          className="inline-flex bg-accent px-5 py-3 text-sm font-medium tracking-wide text-hero-ink transition hover:bg-foreground"
        >
          Continue shopping
        </Link>
      </div>
    );
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
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);

          if (
            !form.fullName.trim() ||
            !form.email.trim() ||
            !form.phone.trim() ||
            !form.address.trim() ||
            !form.city.trim() ||
            !form.postalCode.trim() ||
            !form.country.trim()
          ) {
            setError("Please fill in all required fields.");
            return;
          }

          const id = `PT-${Date.now().toString(36).toUpperCase()}`;
          setPlacedItems(items);
          setPlacedTotal(total);
          setOrderId(id);
          clearCart();
        }}
      >
        <div>
          <h2 className="text-lg font-medium tracking-tight">
            Shipping details
          </h2>
          <p className="mt-1 text-sm text-muted">
            Simple checkout — no online card charge yet. We confirm payment after
            you place the order.
          </p>
        </div>

        <Field
          label="Full name"
          required
          value={form.fullName}
          onChange={(value) => setForm((current) => ({ ...current, fullName: value }))}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(value) => setForm((current) => ({ ...current, email: value }))}
          />
          <Field
            label="Phone"
            type="tel"
            required
            value={form.phone}
            onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
          />
        </div>
        <Field
          label="Address"
          required
          value={form.address}
          onChange={(value) => setForm((current) => ({ ...current, address: value }))}
        />
        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            label="City"
            required
            value={form.city}
            onChange={(value) => setForm((current) => ({ ...current, city: value }))}
          />
          <Field
            label="Postal code"
            required
            value={form.postalCode}
            onChange={(value) =>
              setForm((current) => ({ ...current, postalCode: value }))
            }
          />
          <Field
            label="Country"
            required
            value={form.country}
            onChange={(value) => setForm((current) => ({ ...current, country: value }))}
          />
        </div>
        <div>
          <label htmlFor="notes" className="mb-2 block text-sm text-muted">
            Order notes (optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            value={form.notes}
            onChange={(event) =>
              setForm((current) => ({ ...current, notes: event.target.value }))
            }
            className="w-full border border-line bg-background px-3 py-2.5 outline-none ring-accent focus:ring-2"
          />
        </div>

        {error ? (
          <p className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full bg-accent px-6 py-3 text-sm font-medium tracking-wide text-hero-ink transition hover:bg-foreground sm:w-auto"
        >
          Place order
        </button>
      </form>

      <aside className="h-fit border border-line bg-background/70 p-5 sm:p-6">
        <h2 className="text-lg font-medium tracking-tight">Order summary</h2>
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <div className="relative h-16 w-14 shrink-0 overflow-hidden bg-surface">
                <ProductImage
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted">Qty {item.quantity}</p>
              </div>
              <p className="text-sm">
                {formatPrice(item.price * item.quantity)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between text-muted">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-muted">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-base font-medium text-accent">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-muted">
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-line bg-background px-3 py-2.5 outline-none ring-accent focus:ring-2"
      />
    </div>
  );
}
