"use client";

import useSWR, { mutate } from "swr";
import type { WishlistView } from "@/lib/types";

const WISHLIST_KEY = "/api/wishlist";

type ApiError = {
  message?: string;
};

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as ApiError | null;
    throw new Error(data?.message ?? "Failed to fetch wishlist");
  }
  return res.json() as Promise<T>;
}

async function request(url: string, init: RequestInit): Promise<void> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as ApiError | null;
    throw new Error(data?.message ?? "Wishlist request failed");
  }
}

export function useWishlist(enabled = true) {
  const { data, error, isLoading } = useSWR<WishlistView>(
    enabled ? WISHLIST_KEY : null,
    fetcher,
  );

  async function addItem(productId: string) {
    await request(WISHLIST_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    await mutate(WISHLIST_KEY);
  }

  async function removeItem(itemId: string) {
    await request(`${WISHLIST_KEY}/${itemId}`, { method: "DELETE" });
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
