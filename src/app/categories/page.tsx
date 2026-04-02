import { Container } from "@/components/Container";
import { CategoryCard } from "@/components/CategoryCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { countProductsForCategory, listCategories, listProducts } from "@/lib/services/catalog";

export default function CategoriesPage() {
  const cats = listCategories();

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />
        <h1 className="text-3xl font-black text-slate-900">Shop by Category</h1>
        <p className="mt-2 text-slate-700">
          Browse our {cats.length} categories across {listProducts().length}+ products.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {cats.map((cat) => {
            const count = countProductsForCategory(cat.id);
            return <CategoryCard key={cat.id} category={cat} productCount={count} />;
          })}
        </div>
      </Container>
    </section>
  );
}
