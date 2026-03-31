import { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";
import { getWishlistView } from "@/lib/services/wishlist.service";
import {
  ok,
  created,
  badRequest,
  unauthorized,
  serverError,
} from "@/lib/api/response";

const addItemSchema = z.object({
  productId: z.string().min(1),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return unauthorized();

  try {
    const wishlist = await getWishlistView(session.user.id);
    return ok(wishlist);
  } catch {
    return serverError();
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return unauthorized();

  try {
    const body: unknown = await req.json();
    const parsed = addItemSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest(parsed.error.issues[0].message, "VALIDATION_ERROR");
    }

    const { productId } = parsed.data;

    // Upsert: idempotent — duplicate adds return the existing item.
    const item = await prisma.wishlistItem.upsert({
      where: { userId_productId: { userId: session.user.id, productId } },
      update: {},
      create: { userId: session.user.id, productId },
    });

    return created({ item });
  } catch {
    return serverError();
  }
}
