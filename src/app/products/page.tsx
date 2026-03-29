import Link from "next/link";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { listCategories, listProducts } from "@/lib/services/catalog";

type ProductsPageProps = {
  searchParams?: {
    category?: string;
    sort?: string;
    q?: string;
  };
};

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams?.category;
  const sort = searchParams?.sort;
  const query = searchParams?.q;

  const products = listProducts({
    category: category as "All" | "Electronics" | "Home" | "Lifestyle" | "Fitness" | undefined,
    sort: sort as "featured" | "price-asc" | "price-desc" | undefined,
    query
  });

  const categories = listCategories();

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <h1 className="text-3xl font-black text-slate-900">Shop</h1>
        <p className="mt-2 text-slate-700">Browse products using static data through a service abstraction layer.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((item) => (
            <Link
              key={item}
              href={item === "All" ? "/products" : `/products?category=${encodeURIComponent(item)}`}
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-amber-300 hover:text-amber-700"
            >
              {item}
            </Link>
          ))}

          <Link
            href="/products?sort=price-asc"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-amber-300 hover:text-amber-700"
          >
            Price Low to High
          </Link>
          <Link
            href="/products?sort=price-desc"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-amber-300 hover:text-amber-700"
          >
            Price High to Low
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
