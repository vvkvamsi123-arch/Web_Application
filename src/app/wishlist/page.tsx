"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { useCart } from "@/lib/hooks/useCart";
import { useSession } from "next-auth/react";

export default function WishlistPage() {
  const { status } = useSession();
  const { wishlist, isLoading, isError, removeItem } = useWishlist(
    status === "authenticated",
  );
  const { addItem: addToCart } = useCart(status === "authenticated");

  if (status === "unauthenticated") {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <h1 className="text-3xl font-black text-slate-900">Your Wishlist</h1>
          <p className="mt-4 text-slate-700">
            Please{" "}
            <Link href="/login?callbackUrl=/wishlist" className="text-blue-600 font-semibold hover:underline">
              sign in
            </Link>{" "}
            to view your wishlist.
          </p>
        </Container>
      </section>
    );
  }

  if (status === "loading" || isLoading) {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <h1 className="text-3xl font-black text-slate-900">Your Wishlist</h1>
          <p className="mt-4 text-slate-500 animate-pulse">Loading wishlist…</p>
        </Container>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-10 sm:py-12">
        <Container>
          <h1 className="text-3xl font-black text-slate-900">Your Wishlist</h1>
          <p className="mt-4 text-red-600">Failed to load wishlist. Please try again.</p>
        </Container>
      </section>
    );
  }

  const isEmpty = !wishlist || wishlist.items.length === 0;

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-900">Your Wishlist</h1>
          <Link
            href="/products"
            className="text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            Continue Shopping
          </Link>
        </div>

        {isEmpty ? (
          <div className="mt-8 rounded-2xl border border-amber-100 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-600 text-lg">Your wishlist is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm"
              >
                <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="font-bold text-slate-900 hover:text-amber-700"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-slate-600">{item.product.shortDescription}</p>
                  </div>
                  <p className="text-base font-bold text-slate-900">${item.product.price}</p>
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={async () => {
                        await addToCart(item.productId);
                      }}
                      className="flex-1 rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      aria-label="Remove from wishlist"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
