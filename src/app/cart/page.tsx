import Link from "next/link";
import { Container } from "@/components/Container";
import { getCartView } from "@/lib/services/cart";

export default function CartPage() {
  const cart = getCartView();

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <h1 className="text-3xl font-black text-slate-900">Your Cart</h1>
        <p className="mt-2 text-slate-700">Static cart state for Phase 1 UI validation.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <article
                key={item.productId}
                className="flex flex-col gap-4 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm sm:flex-row"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-24 w-full rounded-xl object-cover sm:w-32"
                />
                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div>
                    <h2 className="font-bold text-slate-900">{item.product.name}</h2>
                    <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">${item.lineTotal}</p>
                    <button
                      type="button"
                      className="rounded-lg border border-slate-300 px-3 py-1 text-sm font-semibold text-slate-700"
                    >
                      Update Qty
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd>${cart.subtotal}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Shipping</dt>
                <dd>${cart.shipping}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt>Tax</dt>
                <dd>${cart.tax}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                <dt>Total</dt>
                <dd>${cart.total}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="mt-5 w-full rounded-xl bg-teal-700 px-4 py-3 font-semibold text-white hover:bg-teal-800"
            >
              Checkout (Phase 2)
            </button>

            <Link href="/products" className="mt-3 block text-center text-sm font-semibold text-teal-700 hover:text-teal-800">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  );
}
