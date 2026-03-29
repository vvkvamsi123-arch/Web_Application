import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { hashPassword } from "@/lib/auth/password";
import {
  created,
  badRequest,
  conflict,
  serverError,
} from "@/lib/api/response";

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  // bcrypt silently truncates at 72 bytes — enforce the ceiling explicitly.
  password: z.string().min(8).max(72),
});

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return badRequest(parsed.error.errors[0].message, "VALIDATION_ERROR");
    }

    const { name, email, password } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return conflict(
        "An account with this email already exists.",
        "EMAIL_IN_USE",
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return created(user);
  } catch {
    return serverError();
  }
}
