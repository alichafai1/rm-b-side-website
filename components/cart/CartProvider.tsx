"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  CART_STORAGE_KEY,
  getCartCount,
  getCartSubtotal,
  normalizePrice,
  type CartItem,
  type CartProductInput,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  addItem: (product: CartProductInput, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const row = item as Partial<CartItem>;
        if (
          typeof row.id !== "string" ||
          typeof row.title !== "string" ||
          typeof row.image_url !== "string"
        ) {
          return null;
        }

        const quantity = Number(row.quantity);
        if (!Number.isFinite(quantity) || quantity < 1) return null;

        return {
          id: row.id,
          title: row.title,
          price: normalizePrice(row.price ?? 0),
          image_url: row.image_url,
          quantity: Math.min(Math.floor(quantity), 99),
        } satisfies CartItem;
      })
      .filter((item): item is CartItem => Boolean(item));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      setItems(readStoredCart());
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: getCartCount(items),
      subtotal: getCartSubtotal(items),
      ready,
      addItem(product, quantity = 1) {
        const addBy = Math.max(1, Math.min(Math.floor(quantity), 99));
        const price = normalizePrice(product.price);

        setItems((current) => {
          const existing = current.find((item) => item.id === product.id);
          if (existing) {
            return current.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    title: product.title,
                    price,
                    image_url: product.image_url,
                    quantity: Math.min(item.quantity + addBy, 99),
                  }
                : item,
            );
          }

          return [
            ...current,
            {
              id: product.id,
              title: product.title,
              price,
              image_url: product.image_url,
              quantity: addBy,
            },
          ];
        });
      },
      removeItem(productId) {
        setItems((current) => current.filter((item) => item.id !== productId));
      },
      setQuantity(productId, quantity) {
        const next = Math.floor(quantity);
        if (next < 1) {
          setItems((current) =>
            current.filter((item) => item.id !== productId),
          );
          return;
        }

        setItems((current) =>
          current.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.min(next, 99) }
              : item,
          ),
        );
      },
      clearCart() {
        setItems([]);
      },
    }),
    [items, ready],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
