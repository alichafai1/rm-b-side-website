import { formatPrice } from "@/lib/format";

type PriceDisplayProps = {
  price: number | string;
  className?: string;
};

export function PriceDisplay({ price, className = "" }: PriceDisplayProps) {
  return (
    <p className={className}>
      <span className="text-accent">{formatPrice(price)}</span>
    </p>
  );
}
