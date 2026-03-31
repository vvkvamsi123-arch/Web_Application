import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getProductById } from "@/lib/services/catalog";
import { getCategoryById, getSubcategoryById } from "@/lib/data/categories";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { WishlistButton } from "@/components/cart/WishlistButton";

type Props = {
  params: { productId: string };
};

export default function ProductDetailPage({ params }: Props) {
  const product = getProductById(params.productId);
  if (!product) notFound();

  const category = getCategoryById(product.categoryId);
  const subcategory = getSubcategoryById(product.subcategoryId);

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            ...(category
              ? [{ label: category.name, href: `/category/${category.slug}` }]
              : []),
            ...(category && subcategory
              ? [{ label: subcategory.name, href: `/category/${category.slug}/${subcategory.slug}` }]
              : []),
            { label: product.name },
          ]}
        />

        <div className="mt-4 grid gap-8 rounded-2xl border border-amber-100 bg-white p-5 shadow-sm lg:grid-cols-2 lg:p-8">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {category && (
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {category.name}
                </span>
              )}
              {subcategory && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {subcategory.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-black text-slate-900">{product.name}</h1>

            {product.brand && (
              <p className="text-sm text-slate-500">by <span className="font-semibold">{product.brand}</span></p>
            )}

            <p className="text-2xl font-bold text-slate-900">${product.price}</p>

            <div className="flex items-center gap-2">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                  product.stockStatus === "in-stock"
                    ? "bg-green-50 text-green-700"
                    : product.stockStatus === "low-stock"
                    ? "bg-orange-50 text-orange-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {product.stockStatus === "in-stock"
                  ? "In Stock"
                  : product.stockStatus === "low-stock"
                  ? "Low Stock"
                  : "Out of Stock"}
              </span>
            </div>

            <p className="text-slate-700">{product.description}</p>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Specs</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                {product.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>

            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="font-semibold text-slate-500">Product ID</dt>
              <dd className="text-slate-700">{product.id}</dd>
              <dt className="font-semibold text-slate-500">SKU</dt>
              <dd className="text-slate-700">{product.slug.toUpperCase()}</dd>
            </dl>

            <div className="flex items-center gap-3">
              <AddToCartButton
                productId={product.id}
                className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-amber-600 disabled:opacity-60"
              />
              <WishlistButton productId={product.id} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
