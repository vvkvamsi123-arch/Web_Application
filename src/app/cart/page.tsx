"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { useCart } from "@/lib/hooks/useCart";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { status } = useSession();
  const { cart, isLoading, isError, updateItem, removeItem } = useCart(
    status === "authenticated",
  );

  if (status === "unauthenticated") {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <h1 className="text-3xl font-black text-slate-900">Your Cart</h1>
          <p className="mt-4 text-slate-700">
            Please{" "}
            <Link href="/login?callbackUrl=/cart" className="text-blue-600 font-semibold hover:underline">
              sign in
            </Link>{" "}
            to view your cart.
          </p>
        </Container>
      </section>
    );
  }

  if (status === "loading" || isLoading) {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <h1 className="text-3xl font-black text-slate-900">Your Cart</h1>
          <p className="mt-4 text-slate-500 animate-pulse">Loading cart…</p>
        </Container>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <h1 className="text-3xl font-black text-slate-900">Your Cart</h1>
          <p className="mt-4 text-red-600">Failed to load cart. Please try again.</p>
        </Container>
      </section>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <h1 className="text-3xl font-black text-slate-900">Your Cart</h1>

        {isEmpty ? (
          <div className="mt-8 rounded-2xl border border-amber-100 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-600 text-lg">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm sm:flex-row"
                >
                  <div className="relative h-24 w-full sm:w-32 flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      sizes="128px"
                      className="rounded-xl object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between gap-2">
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-bold text-slate-900 hover:text-amber-700"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-slate-600">${item.product.price} each</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                          className="rounded-lg border border-slate-300 px-2 py-0.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateItem(item.id, Math.min(99, item.quantity + 1))}
                          className="rounded-lg border border-slate-300 px-2 py-0.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold text-slate-900">${item.lineTotal}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-semibold text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd>${cart.subtotal}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Shipping</dt>
                  <dd>${cart.shipping}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Tax (8%)</dt>
                  <dd>${cart.tax}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                  <dt>Total</dt>
                  <dd>${cart.total}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="mt-5 w-full rounded-xl bg-teal-700 px-4 py-3 font-semibold text-white hover:bg-teal-800"
              >
                Checkout
              </button>

              <Link
                href="/products"
                className="mt-3 block text-center text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </section>
  );
}

