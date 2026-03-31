import { NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth/config";
import { prisma } from "@/lib/db/client";
import { computeCartView } from "@/lib/services/cart";
import {
  ok,
  created,
  badRequest,
  unauthorized,
  serverError,
} from "@/lib/api/response";

const addItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.int().min(1).max(99),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return unauthorized();

  try {
    const cartView = await computeCartView(session.user.id);
    return ok(cartView);
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

    const { productId, quantity } = parsed.data;

    const item = await prisma.cartItem.upsert({
      where: { userId_productId: { userId: session.user.id, productId } },
      update: { quantity: { increment: quantity } },
      create: { userId: session.user.id, productId, quantity },
    });

    return created({ item });
  } catch {
    return serverError();
  }
}
