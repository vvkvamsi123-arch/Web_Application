import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { WishlistButton } from "@/components/cart/WishlistButton";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{product.category}</p>
        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-600">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-base font-bold text-slate-900">${product.price}</p>
          <div className="flex items-center gap-2">
            <WishlistButton productId={product.id} />
            <AddToCartButton
              productId={product.id}
              className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-60"
            />
            <Link
              href={`/products/${product.slug}`}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-amber-300 hover:text-amber-700"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
