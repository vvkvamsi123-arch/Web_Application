import { products } from "@/lib/data/products";
import { Product } from "@/lib/types";
import {
  categories,
  categoryTree,
  subcategories,
  getCategoryBySlug,
  getCategoryPath,
  getSubcategoryBySlug,
  getSubcategoriesForCategory,
  isLeafCategory,
  listChildCategories,
  listDescendantCategoryIds,
  resolveCategoryBySlugChain,
  type CategoryDef,
  type CategoryNode,
  type SubcategoryDef,
} from "@/lib/data/categories";

export type ProductFilters = {
  categoryId?: string;
  subcategoryId?: string;
  leafCategoryId?: string;
  query?: string;
  sort?: "featured" | "price-asc" | "price-desc";
};

export function listProducts(filters: ProductFilters = {}): Product[] {
  const query = (filters.query ?? "").trim().toLowerCase();
  const sort = filters.sort ?? "featured";

  let result = [...products];

  if (filters.categoryId) {
    result = result.filter((p) => p.categoryId === filters.categoryId);
  }

  if (filters.subcategoryId) {
    result = result.filter((p) => p.subcategoryId === filters.subcategoryId);
  }

  if (filters.leafCategoryId) {
    result = result.filter((p) => p.leafCategoryId === filters.leafCategoryId);
  }

  if (query) {
    result = result.filter((p) => {
      const haystack = `${p.name} ${p.shortDescription} ${p.brand}`.toLowerCase();
      return haystack.includes(query);
    });
  }

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") result.sort((a, b) => b.price - a.price);

  return result;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function listCategories(): CategoryDef[] {
  return categories;
}

export function listSubcategories(categoryId?: string): SubcategoryDef[] {
  if (categoryId) return getSubcategoriesForCategory(categoryId);
  return subcategories;
}

export function listCategoryChildren(parentId: string): CategoryNode[] {
  return listChildCategories(parentId);
}

export function countProductsForCategory(categoryId: string): number {
  const categoryIds = [categoryId, ...listDescendantCategoryIds(categoryId)];
  const leafIds = categoryIds.filter((id) => isLeafCategory(id));

  if (leafIds.length === 0) {
    return products.filter((product) => product.categoryId === categoryId).length;
  }

  return products.filter((product) => leafIds.includes(product.leafCategoryId)).length;
}

export function getLeafCategories(): CategoryNode[] {
  return categoryTree.filter((node) => isLeafCategory(node.id));
}

export {
  getCategoryBySlug,
  getCategoryPath,
  getSubcategoryBySlug,
  isLeafCategory,
  resolveCategoryBySlugChain,
};
