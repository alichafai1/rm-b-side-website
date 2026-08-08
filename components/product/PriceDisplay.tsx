import { formatPrice } from "@/lib/format";

type PriceDisplayProps = {
  price: number | string;
  comparePrice?: number | string | null;
  className?: string;
};

export function PriceDisplay({
  price,
  comparePrice,
  className = "",
}: PriceDisplayProps) {
  const compareValue =
    comparePrice === null || comparePrice === undefined || comparePrice === ""
      ? null
      : Number(comparePrice);
  const showCompare =
    compareValue !== null &&
    Number.isFinite(compareValue) &&
    compareValue > Number(price);

  return (
    <p className={`flex items-baseline gap-2 ${className}`}>
      <span className="text-accent">{formatPrice(price)}</span>
      {showCompare ? (
        <span className="text-sm text-muted line-through">
          {formatPrice(compareValue)}
        </span>
      ) : null}
    </p>
  );
}
