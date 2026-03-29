"use client";

import useSWR, { mutate } from "swr";
import type { CartView } from "@/lib/types";

const CART_KEY = "/api/cart";

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json() as Promise<T>;
}

export function useCart() {
  const { data, error, isLoading } = useSWR<CartView>(CART_KEY, fetcher);

  async function addItem(productId: string, quantity = 1) {
    await fetch(CART_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    await mutate(CART_KEY);
  }

  async function updateItem(itemId: string, quantity: number) {
    await fetch(`${CART_KEY}/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    await mutate(CART_KEY);
  }

  async function removeItem(itemId: string) {
    await fetch(`${CART_KEY}/${itemId}`, { method: "DELETE" });
    await mutate(CART_KEY);
  }

  return {
    cart: data,
    isLoading,
    isError: !!error,
    addItem,
    updateItem,
    removeItem,
  };
}
