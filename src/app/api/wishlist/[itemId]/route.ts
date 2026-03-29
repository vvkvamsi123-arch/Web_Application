import { NextRequest } from "next/server";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";
import {
  ok,
  unauthorized,
  forbidden,
  notFound,
  serverError,
} from "@/lib/api/response";

type RouteContext = { params: Promise<{ itemId: string }> };

export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) return unauthorized();

  const { itemId } = await ctx.params;

  try {
    const existing = await prisma.wishlistItem.findUnique({
      where: { id: itemId },
    });
    if (!existing) return notFound("Wishlist item not found.");
    if (existing.userId !== session.user.id) return forbidden();

    await prisma.wishlistItem.delete({ where: { id: itemId } });
    return ok({ success: true });
  } catch {
    return serverError();
  }
}
