import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-100 bg-white p-12 text-center">
        <p className="text-lg font-semibold text-slate-700">No products found</p>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or browse another category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
