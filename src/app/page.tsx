import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { listProducts } from "@/lib/services/catalog";

export default function HomePage() {
  const featured = listProducts().slice(0, 4);

  return (
    <>
      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-700">
              Spring 2026 Collection
            </p>
            <h1 className="text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              Everyday essentials, curated for modern living.
            </h1>
            <p className="max-w-xl text-lg text-slate-700">
              HarborCart is a static storefront demo with polished UX and a clean architecture boundary,
              ready to connect with future catalog and cart microservices.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-amber-600"
              >
                Shop Products
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition-colors hover:border-slate-400"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative min-h-[320px] rounded-3xl border border-amber-100 bg-white p-3 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80"
              alt="Curated home and lifestyle items"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="rounded-2xl object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900">Featured Products</h2>
            <Link href="/products" className="text-sm font-semibold text-teal-700 hover:text-teal-800">
              View all
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="rounded-2xl bg-teal-700 p-8 text-white">
            <h3 className="text-2xl font-black">Free shipping on orders above $200</h3>
            <p className="mt-2 max-w-2xl text-teal-100">
              This campaign is static in Phase 1. In later phases, it can be personalized by pricing and promotion services.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
