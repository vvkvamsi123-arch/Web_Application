"use client";

import useSWR, { mutate } from "swr";
import type { WishlistView } from "@/lib/types";

const WISHLIST_KEY = "/api/wishlist";

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json() as Promise<T>;
}

export function useWishlist() {
  const { data, error, isLoading } = useSWR<WishlistView>(
    WISHLIST_KEY,
    fetcher,
  );

  async function addItem(productId: string) {
    await fetch(WISHLIST_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    await mutate(WISHLIST_KEY);
  }

  async function removeItem(itemId: string) {
    await fetch(`${WISHLIST_KEY}/${itemId}`, { method: "DELETE" });
    await mutate(WISHLIST_KEY);
  }

  function isWishlisted(productId: string): boolean {
    return data?.items.some((i) => i.productId === productId) ?? false;
  }

  return {
    wishlist: data,
    isLoading,
    isError: !!error,
    addItem,
    removeItem,
    isWishlisted,
  };
}
