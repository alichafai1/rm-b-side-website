export function formatPrice(price: number | string): string {
  const value = typeof price === "string" ? Number(price) : price;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(value) ? value : 0);
}
