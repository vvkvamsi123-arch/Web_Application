import { products } from "@/lib/data/products";
import { Category, Product } from "@/lib/types";

export type ProductFilters = {
  category?: Category | "All";
  query?: string;
  sort?: "featured" | "price-asc" | "price-desc";
};

// This module is the UI's data boundary and can later call catalog microservices.
export function listProducts(filters: ProductFilters = {}): Product[] {
  const category = filters.category ?? "All";
  const query = (filters.query ?? "").trim().toLowerCase();
  const sort = filters.sort ?? "featured";

  let result = [...products];

  if (category !== "All") {
    result = result.filter((product) => product.category === category);
  }

  if (query) {
    result = result.filter((product) => {
      const haystack = `${product.name} ${product.shortDescription}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function listCategories(): Array<Category | "All"> {
  const all = new Set<Category>();
  products.forEach((product) => all.add(product.category));
  return ["All", ...Array.from(all)];
}
