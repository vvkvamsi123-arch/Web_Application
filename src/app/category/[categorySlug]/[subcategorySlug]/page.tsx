import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductGrid } from "@/components/ProductGrid";
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  listProducts,
  listSubcategories,
} from "@/lib/services/catalog";

type Props = {
  params: { categorySlug: string; subcategorySlug: string };
  searchParams?: { sort?: string };
};

export default function PLPPage({ params, searchParams }: Props) {
  const category = getCategoryBySlug(params.categorySlug);
  if (!category) notFound();

  const isAllProducts = params.subcategorySlug === "all";
  const subcategory = isAllProducts
    ? null
    : getSubcategoryBySlug(params.subcategorySlug, category.id);

  if (!isAllProducts && !subcategory) notFound();

  const sort = (searchParams?.sort as "price-asc" | "price-desc" | undefined) ?? undefined;

  const filtered = listProducts({
    categoryId: category.id,
    subcategoryId: subcategory?.id,
    sort,
  });

  const subs = listSubcategories(category.id);

  const breadcrumbLabel = isAllProducts ? "All Products" : subcategory!.name;

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: category.name, href: `/category/${category.slug}` },
            { label: breadcrumbLabel },
          ]}
        />

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-56">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              Subcategories
            </h2>
            <nav>
              <ul className="space-y-1">
                <li>
                  <Link
                    href={`/category/${category.slug}/all`}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isAllProducts
                        ? "bg-amber-100 text-amber-800"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    All {category.name}
                  </Link>
                </li>
                {subs.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/category/${category.slug}/${s.slug}`}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        subcategory?.id === s.id
                          ? "bg-amber-100 text-amber-800"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
                Sort By
              </h2>
              <div className="flex flex-col gap-1">
                {[
                  { label: "Featured", value: "" },
                  { label: "Price: Low → High", value: "price-asc" },
                  { label: "Price: High → Low", value: "price-desc" },
                ].map((opt) => {
                  const base = isAllProducts
                    ? `/category/${category.slug}/all`
                    : `/category/${category.slug}/${subcategory!.slug}`;
                  const href = opt.value ? `${base}?sort=${opt.value}` : base;
                  const isActive = (sort ?? "") === opt.value;
                  return (
                    <Link
                      key={opt.value}
                      href={href}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-amber-100 text-amber-800"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {opt.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-black text-slate-900">
                {breadcrumbLabel}
                <span className="ml-2 text-base font-normal text-slate-500">
                  ({filtered.length} products)
                </span>
              </h1>
            </div>
            <ProductGrid products={filtered} />
          </div>
        </div>
      </Container>
    </section>
  );
}
