import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  return (
    <header className="border-b border-amber-200/70 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
          HarborCart
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-4 text-sm font-semibold text-slate-700 sm:gap-6">
            {links.map((item) => (
              <li key={item.href}>
                <Link className="transition-colors hover:text-amber-600" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
