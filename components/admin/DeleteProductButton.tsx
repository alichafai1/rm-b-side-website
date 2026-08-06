"use client";

import { useTransition } from "react";
import { deleteProductAction } from "@/actions/products";

type DeleteProductButtonProps = {
  productId: string;
  productTitle: string;
};

export function DeleteProductButton({
  productId,
  productTitle,
}: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (
          !window.confirm(
            `Delete “${productTitle}”? This cannot be undone.`,
          )
        ) {
          return;
        }
        startTransition(async () => {
          await deleteProductAction(productId);
        });
      }}
      className="text-sm text-red-700 transition hover:text-red-900 disabled:opacity-60"
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
