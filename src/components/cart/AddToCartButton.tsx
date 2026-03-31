"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/hooks/useCart";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
};

export function AddToCartButton({ productId, className }: AddToCartButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  const { addItem } = useCart(status === "authenticated");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddToCart() {
    if (status !== "authenticated") {
      const callback = pathname || "/products";
      router.push(`/login?callbackUrl=${encodeURIComponent(callback)}`);
      return;
    }

    try {
      setIsSubmitting(true);
      await addItem(productId, 1);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isSubmitting}
      className={className}
    >
      {isSubmitting ? "Adding..." : "Add to cart"}
    </button>
  );
}
