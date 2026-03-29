import { prisma } from "@/lib/db/client";
import { getProductById } from "@/lib/services/catalog";
import type { CartView, CartItem } from "@/lib/types";
import { products } from "@/lib/data/products";

// ---------------------------------------------------------------------------
// Pricing constants — centralised so future phases can source from a DB/CMS.
// ---------------------------------------------------------------------------
const SHIPPING_FLAT = 12;
const TAX_RATE = 0.08;

/**
 * Computes the full cart view for a given user from the database.
 * Called by GET /api/cart.
 */
export async function computeCartView(userId: string): Promise<CartView> {
  const rows = await prisma.cartItem.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  const items = rows
    .map((row) => {
      const product = getProductById(row.productId);
      if (!product) return null;
      return {
        id: row.id,
        productId: row.productId,
        quantity: row.quantity,
        product: {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          shortDescription: product.shortDescription,
        },
        lineTotal: product.price * row.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal > 0 ? SHIPPING_FLAT : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  return { items, subtotal, shipping, tax, total };
}

// ---------------------------------------------------------------------------
// Phase 1 static cart helpers — kept for backward compatibility with the
// static cart page until it is migrated to use the live API.
// ---------------------------------------------------------------------------

export const mockCart: CartItem[] = [
  { productId: "p-101", quantity: 1 },
  { productId: "p-104", quantity: 2 },
];

export function getCartView() {
  const items = mockCart
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        ...item,
        product,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal > 0 ? SHIPPING_FLAT : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shipping + tax;

  return { items, subtotal, shipping, tax, total };
}
