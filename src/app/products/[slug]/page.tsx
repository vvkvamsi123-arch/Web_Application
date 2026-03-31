import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/services/catalog";

type Props = {
  params: { slug: string };
};

/**
 * Legacy slug-based PDP route — redirects to the canonical /product/[productId] route.
 */
export default function LegacyProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }
  redirect(`/product/${product.id}`);
}
