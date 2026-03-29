import Link from "next/link";
import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[5/4] overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{product.category}</p>
        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-600">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-base font-bold text-slate-900">${product.price}</p>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
