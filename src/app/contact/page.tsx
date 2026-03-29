import { Container } from "@/components/Container";

export default function ContactPage() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="grid gap-6 rounded-2xl border border-amber-100 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Contact</h1>
            <p className="mt-3 text-slate-700">Static contact information for Phase 1.</p>
            <ul className="mt-5 space-y-2 text-slate-700">
              <li>Email: hello@harborcart.example</li>
              <li>Phone: +1 (555) 140-8890</li>
              <li>Hours: Mon-Fri, 9:00 AM - 6:00 PM</li>
            </ul>
          </div>

          <form className="space-y-3" action="#" method="post">
            <label className="block text-sm font-semibold text-slate-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Your full name"
            />

            <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="you@example.com"
            />

            <label className="block text-sm font-semibold text-slate-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="h-28 w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="How can we help?"
            />

            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-amber-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
