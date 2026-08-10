export type CartItem = {
  id: string;
  title: string;
  price: number;
  image_url: string;
  quantity: number;
};

export type CartProductInput = {
  id: string;
  title: string;
  price: number | string;
  image_url: string;
};

export const CART_STORAGE_KEY = "patara-cart";

export function normalizePrice(price: number | string): number {
  const value = typeof price === "string" ? Number(price) : price;
  return Number.isFinite(value) ? value : 0;
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + normalizePrice(item.price) * item.quantity,
    0,
  );
}
