import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getProductBySlug } from "@/lib/services/catalog";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { WishlistButton } from "@/components/cart/WishlistButton";

type ProductDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <Link href="/products" className="text-sm font-semibold text-teal-700 hover:text-teal-800">
          Back to products
        </Link>

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
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{product.category}</p>
            <h1 className="text-3xl font-black text-slate-900">{product.name}</h1>
            <p className="text-lg font-bold text-slate-900">${product.price}</p>
            <p className="text-slate-700">{product.description}</p>

            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Specs</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
                {product.specs.map((spec) => (
                  <li key={spec}>{spec}</li>
                ))}
              </ul>
            </div>

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
