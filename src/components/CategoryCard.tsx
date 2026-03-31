import Link from "next/link";
import { type CategoryDef } from "@/lib/data/categories";

type CategoryCardProps = {
  category: CategoryDef;
  productCount?: number;
};

const categoryIcons: Record<string, string> = {
  "cat-1": "📱",
  "cat-2": "👗",
  "cat-3": "🏠",
  "cat-4": "💄",
  "cat-5": "🛒",
  "cat-6": "🏋️",
  "cat-7": "📚",
  "cat-8": "🧸",
  "cat-9": "🚗",
  "cat-10": "💊",
};

export function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-amber-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
    >
      <span className="text-4xl" role="img" aria-hidden="true">
        {categoryIcons[category.id] ?? "📦"}
      </span>
      <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700">
        {category.name}
      </h3>
      {productCount !== undefined && (
        <p className="text-sm text-slate-500">{productCount} products</p>
      )}
    </Link>
  );
}
