import { CartItem } from "@/lib/types";
import { products } from "@/lib/data/products";

export const mockCart: CartItem[] = [
  { productId: "p-101", quantity: 1 },
  { productId: "p-104", quantity: 2 }
];

export function getCartView() {
  const items = mockCart.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) {
      return null;
    }

    return {
      ...item,
      product,
      lineTotal: product.price * item.quantity
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal > 0 ? 12 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  return { items, subtotal, shipping, tax, total };
}
