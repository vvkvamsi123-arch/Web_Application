import { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";
import {
  ok,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  serverError,
} from "@/lib/api/response";

const updateSchema = z.object({
  quantity: z.int().min(1).max(99),
});

type RouteContext = { params: Promise<{ itemId: string }> };

export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) return unauthorized();

  const { itemId } = await ctx.params;

  try {
    const body: unknown = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return badRequest(parsed.error.issues[0].message, "VALIDATION_ERROR");
    }

    const existing = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });
    if (!existing) return notFound("Cart item not found.");
    if (existing.userId !== session.user.id) return forbidden();

    const item = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: parsed.data.quantity },
    });

    return ok({ item });
  } catch {
    return serverError();
  }
}

export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const session = await auth();
  if (!session?.user?.id) return unauthorized();

  const { itemId } = await ctx.params;

  try {
    const existing = await prisma.cartItem.findUnique({
      where: { id: itemId },
    });
    if (!existing) return notFound("Cart item not found.");
    if (existing.userId !== session.user.id) return forbidden();

    await prisma.cartItem.delete({ where: { id: itemId } });
    return ok({ success: true });
  } catch {
    return serverError();
  }
}
