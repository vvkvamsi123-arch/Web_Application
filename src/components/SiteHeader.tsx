"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-amber-200/70 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-xl font-black tracking-tight text-slate-900">
          HarborCart
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-4 text-sm font-semibold text-slate-700 sm:gap-6">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link className="transition-colors hover:text-amber-600" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              <Link className="transition-colors hover:text-amber-600" href="/cart">
                Cart
              </Link>
            </li>

            {status === "loading" ? null : session?.user ? (
              <>
                <li>
                  <Link className="transition-colors hover:text-amber-600" href="/wishlist">
                    Wishlist
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <span className="hidden text-slate-500 sm:inline">
                    {session.user.name ?? session.user.email}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-amber-600"
                >
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

