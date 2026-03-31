"use client";

import useSWR, { mutate } from "swr";
import type { CartView } from "@/lib/types";

const CART_KEY = "/api/cart";

type ApiError = {
  message?: string;
};

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as ApiError | null;
    throw new Error(data?.message ?? "Failed to fetch cart");
  }
  return res.json() as Promise<T>;
}

async function request(url: string, init: RequestInit): Promise<void> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as ApiError | null;
    throw new Error(data?.message ?? "Cart request failed");
  }
}

export function useCart(enabled = true) {
  const { data, error, isLoading } = useSWR<CartView>(
    enabled ? CART_KEY : null,
    fetcher,
  );

  async function addItem(productId: string, quantity = 1): Promise<void> {
    await request(CART_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    await mutate(CART_KEY);
  }

  async function updateItem(itemId: string, quantity: number): Promise<void> {
    await request(`${CART_KEY}/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    await mutate(CART_KEY);
  }

  async function removeItem(itemId: string): Promise<void> {
    await request(`${CART_KEY}/${itemId}`, { method: "DELETE" });
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
