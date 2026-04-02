import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryCard } from "@/components/CategoryCard";
import { Container } from "@/components/Container";
import { ProductGrid } from "@/components/ProductGrid";
import {
  countProductsForCategory,
  isLeafCategory,
  listCategoryChildren,
  listProducts,
  resolveCategoryBySlugChain,
} from "@/lib/services/catalog";

type Props = {
  params: { slugs: string[] };
  searchParams?: { sort?: string };
};

export default function CategoryRoutePage({ params, searchParams }: Props) {
  const resolvedPath = resolveCategoryBySlugChain(params.slugs);
  if (!resolvedPath) notFound();

  const currentCategory = resolvedPath[resolvedPath.length - 1];
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    ...resolvedPath.map((node, index) => ({
      label: node.name,
      href:
        index === resolvedPath.length - 1
          ? undefined
          : `/category/${resolvedPath.slice(0, index + 1).map((item) => item.slug).join("/")}`,
    })),
  ];

  if (!isLeafCategory(currentCategory.id)) {
    const childCategories = listCategoryChildren(currentCategory.id);

    return (
      <section className="py-10 sm:py-12">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="text-3xl font-black text-slate-900">{currentCategory.name}</h1>
          <p className="mt-2 max-w-2xl text-slate-700">
            Browse {childCategories.length} subcategories and drill into the product listing page from the next level.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {childCategories.map((child) => {
              const href = `/category/${[...resolvedPath, child].map((item) => item.slug).join("/")}`;
              return (
                <CategoryCard
                  key={child.id}
                  category={child}
                  href={href}
                  productCount={countProductsForCategory(child.id)}
                />
              );
            })}
          </div>
        </Container>
      </section>
    );
  }

  const sort = (searchParams?.sort as "price-asc" | "price-desc" | undefined) ?? undefined;
  const products = listProducts({ leafCategoryId: currentCategory.id, sort });
  const parentCategory = resolvedPath[resolvedPath.length - 2];
  const siblingCategories = parentCategory ? listCategoryChildren(parentCategory.id) : [];
  const currentPath = `/category/${resolvedPath.map((item) => item.slug).join("/")}`;

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
              {parentCategory?.name ?? "Categories"}
            </h2>
            <nav>
              <ul className="space-y-1">
                {siblingCategories.map((category) => {
                  const siblingHref = parentCategory
                    ? `/category/${[...resolvedPath.slice(0, -1), category].map((item) => item.slug).join("/")}`
                    : currentPath;

                  return (
                    <li key={category.id}>
                      <Link
                        href={siblingHref}
                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          category.id === currentCategory.id
                            ? "bg-amber-100 text-amber-800"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
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
                ].map((option) => {
                  const href = option.value ? `${currentPath}?sort=${option.value}` : currentPath;
                  const isActive = (sort ?? "") === option.value;

                  return (
                    <Link
                      key={option.label}
                      href={href}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-amber-100 text-amber-800"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">{currentCategory.name}</h1>
                <p className="mt-1 text-sm text-slate-600">
                  {products.length} products in this product listing page.
                </p>
              </div>
            </div>
            <ProductGrid products={products} />
          </div>
        </div>
      </Container>
    </section>
  );
}
