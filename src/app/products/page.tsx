import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGrid } from "@/components/ProductGrid";
import { listCategories, listProducts } from "@/lib/services/catalog";

type ProductsPageProps = {
  searchParams?: {
    category?: string;
    sort?: string;
    q?: string;
  };
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const categoryId = searchParams?.category;
  const sort = searchParams?.sort as "featured" | "price-asc" | "price-desc" | undefined;
  const query = searchParams?.q;

  const products = listProducts({ categoryId, sort, query });
  const categories = listCategories();

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
        <h1 className="text-3xl font-black text-slate-900">Shop All Products</h1>
        <p className="mt-2 text-slate-700">
          Showing {products.length} products{categoryId ? " in selected category" : " across all categories"}.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/products"
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              !categoryId
                ? "border-amber-400 bg-amber-50 text-amber-800"
                : "border-slate-300 bg-white text-slate-700 hover:border-amber-300 hover:text-amber-700"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                categoryId === cat.id
                  ? "border-amber-400 bg-amber-50 text-amber-800"
                  : "border-slate-300 bg-white text-slate-700 hover:border-amber-300 hover:text-amber-700"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: "Featured", value: undefined },
            { label: "Price: Low → High", value: "price-asc" },
            { label: "Price: High → Low", value: "price-desc" },
          ].map((opt) => {
            const href = categoryId
              ? `/products?category=${categoryId}${opt.value ? `&sort=${opt.value}` : ""}`
              : opt.value
              ? `/products?sort=${opt.value}`
              : "/products";
            const isActive = (sort ?? undefined) === opt.value;
            return (
              <Link
                key={opt.label}
                href={href}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? "border-amber-400 bg-amber-50 text-amber-800"
                    : "border-slate-200 bg-white text-slate-600 hover:border-amber-300"
                }`}
              >
                {opt.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </Container>
    </section>
  );
}
