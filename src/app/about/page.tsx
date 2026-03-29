import { Container } from "@/components/Container";

export default function AboutPage() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-black text-slate-900">About HarborCart</h1>
          <p className="mt-4 max-w-3xl text-slate-700">
            HarborCart is a Phase 1 static storefront used to validate UX, layout, and domain boundaries before
            introducing distributed backend services.
          </p>
          <p className="mt-3 max-w-3xl text-slate-700">
            In upcoming phases, product data, inventory, cart, and order workflows can move into dedicated
            microservices while the frontend remains stable through service adapters.
          </p>
        </div>
      </Container>
    </section>
  );
}
