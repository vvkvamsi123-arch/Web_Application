import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCategoryBySlug, listSubcategories, listProducts } from "@/lib/services/catalog";

type Props = {
  params: { categorySlug: string };
};

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.categorySlug);
  if (!category) notFound();

  const subs = listSubcategories(category.id);

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: category.name },
          ]}
        />
        <h1 className="text-3xl font-black text-slate-900">{category.name}</h1>
        <p className="mt-2 text-slate-700">
          {listProducts({ categoryId: category.id }).length} products across {subs.length} subcategories
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {subs.map((sub) => {
            const count = listProducts({ subcategoryId: sub.id }).length;
            return (
              <Link
                key={sub.id}
                href={`/category/${category.slug}/${sub.slug}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-amber-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-200 hover:shadow-md"
              >
                <h3 className="text-center font-bold text-slate-900 group-hover:text-amber-700">
                  {sub.name}
                </h3>
                <p className="text-sm text-slate-500">{count} products</p>
              </Link>
            );
          })}
        </div>

        {/* Also show a link to view all products in this category */}
        <div className="mt-8">
          <Link
            href={`/category/${category.slug}/all`}
            className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-amber-600"
          >
            View All {category.name} Products
          </Link>
        </div>
      </Container>
    </section>
  );
}
