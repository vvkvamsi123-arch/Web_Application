import { prisma } from "@/lib/db/client";
import { hashPassword } from "@/lib/auth/password";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

/**
 * Creates a new user with a hashed password.
 * Throws if the email is already in use (Prisma unique constraint).
 */
export async function registerUser(input: RegisterInput) {
  const passwordHash = await hashPassword(input.password);

  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
    },
    select: { id: true, email: true, name: true, createdAt: true },
  });
}

/**
 * Looks up a user by email and returns only the fields needed for
 * Credentials provider authorization.
 */
export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, passwordHash: true },
  });
}
