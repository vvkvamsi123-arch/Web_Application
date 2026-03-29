import { prisma } from "@/lib/db/client";
import { getProductById } from "@/lib/services/catalog";
import type { WishlistView } from "@/lib/types";

/**
 * Returns the full wishlist view for a given user, enriched with product data.
 * Called by GET /api/wishlist.
 */
export async function getWishlistView(userId: string): Promise<WishlistView> {
  const rows = await prisma.wishlistItem.findMany({
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
        product: {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          shortDescription: product.shortDescription,
        },
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  return { items };
}
