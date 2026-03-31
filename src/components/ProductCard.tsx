import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-slate-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.stockStatus === "out-of-stock" && (
          <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
            Out of Stock
          </span>
        )}
        {product.stockStatus === "low-stock" && (
          <span className="absolute right-2 top-2 rounded-full bg-orange-400 px-2 py-0.5 text-xs font-bold text-white">
            Low Stock
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{product.category}</p>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-slate-600">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="text-base font-bold text-slate-900">${product.price}</p>
          {product.brand && (
            <p className="text-xs text-slate-500">{product.brand}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
