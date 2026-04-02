"use client";

import { useState } from "react";
import Link from "next/link";
import { listCategories, listCategoryChildren } from "@/lib/services/catalog";

const rootCategories = listCategories();

export function MegaMenu() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openRootId, setOpenRootId] = useState<string | null>(rootCategories[0]?.id ?? null);
  const [openBranchId, setOpenBranchId] = useState<string | null>(null);

  return (
    <>
      <div className="hidden lg:block">
        <div className="group relative">
          <button className="transition-colors hover:text-amber-600">Categories</button>
          <div className="invisible absolute left-0 top-full z-30 mt-4 w-[860px] rounded-3xl border border-amber-100 bg-white p-6 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
            <div className="grid grid-cols-[220px_1fr] gap-6">
              <div className="space-y-2 border-r border-slate-100 pr-4">
                {rootCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-amber-50 hover:text-amber-800"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                {rootCategories.map((category) => (
                  <div key={category.id} className="rounded-2xl bg-slate-50/70 p-4">
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-sm font-black uppercase tracking-wide text-slate-900"
                    >
                      {category.name}
                    </Link>
                    <div className="mt-4 space-y-4">
                      {listCategoryChildren(category.id).map((child) => (
                        <div key={child.id}>
                          <Link
                            href={`/category/${category.slug}/${child.slug}`}
                            className="text-sm font-semibold text-slate-700 hover:text-amber-700"
                          >
                            {child.name}
                          </Link>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {listCategoryChildren(child.id).map((grandchild) => (
                              <Link
                                key={grandchild.id}
                                href={`/category/${[category.slug, child.slug, grandchild.slug].join("/")}`}
                                className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-amber-100 hover:text-amber-800"
                              >
                                {grandchild.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((current) => !current)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700"
        >
          Categories
        </button>

        {isMobileOpen && (
          <div className="fixed inset-x-0 top-[73px] z-40 border-t border-amber-100 bg-white p-4 shadow-2xl">
            <div className="grid gap-4">
              {rootCategories.map((category) => {
                const isRootOpen = openRootId === category.id;
                const level2Categories = listCategoryChildren(category.id);

                return (
                  <div key={category.id} className="rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setOpenRootId(isRootOpen ? null : category.id)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-800"
                    >
                      <span>{category.name}</span>
                      <span>{isRootOpen ? "-" : "+"}</span>
                    </button>

                    {isRootOpen && (
                      <div className="border-t border-slate-100 px-4 py-3">
                        <div className="space-y-3">
                          {level2Categories.map((level2) => {
                            const isBranchOpen = openBranchId === level2.id;
                            const leaves = listCategoryChildren(level2.id);

                            return (
                              <div key={level2.id} className="rounded-xl bg-slate-50 p-3">
                                <button
                                  type="button"
                                  onClick={() => setOpenBranchId(isBranchOpen ? null : level2.id)}
                                  className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-700"
                                >
                                  <span>{level2.name}</span>
                                  <span>{isBranchOpen ? "-" : "+"}</span>
                                </button>

                                {isBranchOpen && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {leaves.map((leaf) => (
                                      <Link
                                        key={leaf.id}
                                        href={`/category/${[category.slug, level2.slug, leaf.slug].join("/")}`}
                                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600"
                                        onClick={() => setIsMobileOpen(false)}
                                      >
                                        {leaf.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
