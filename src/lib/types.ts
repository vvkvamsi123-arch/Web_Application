export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryId: string;
  subcategoryId: string;
  leafCategoryId: string;
  price: number;
  rating: number;
  imageUrl: string;
  shortDescription: string;
  description: string;
  specs: string[];
  brand: string;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
};

// ---------------------------------------------------------------------------
// Phase 1 — kept for backward compatibility with static cart service
// ---------------------------------------------------------------------------
export type CartItem = {
  productId: string;
  quantity: number;
};

// ---------------------------------------------------------------------------
// Phase 2 — DB-backed cart / wishlist
// ---------------------------------------------------------------------------

/** A cart item enriched with product data and line total. */
export type CartLineItem = {
  id: string;
  productId: string;
  quantity: number;
  product: Pick<Product, "id" | "slug" | "name" | "price" | "imageUrl" | "shortDescription">;
  lineTotal: number;
};

/** Full cart view returned by /api/cart. */
export type CartView = {
  items: CartLineItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

/** A wishlist item enriched with product data. */
export type WishlistLineItem = {
  id: string;
  productId: string;
  product: Pick<Product, "id" | "slug" | "name" | "price" | "imageUrl" | "shortDescription">;
};

/** Full wishlist view returned by /api/wishlist. */
export type WishlistView = {
  items: WishlistLineItem[];
};
