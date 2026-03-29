import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
// import Apple  from "next-auth/providers/apple";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { comparePassword } from "@/lib/auth/password";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    // -----------------------------------------------------------------------
    // OAuth providers — uncomment after setting env vars.
    // Google requires: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
    // Apple  requires: APPLE_ID, APPLE_SECRET
    // -----------------------------------------------------------------------
    // Google,
    // Apple,

    Credentials({
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          select: { id: true, email: true, name: true, passwordHash: true },
        });

        if (!user?.passwordHash) return null;

        const valid = await comparePassword(
          parsed.data.password,
          user.passwordHash,
        );
        if (!valid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // Persist user.id into the token on first sign-in.
      if (user?.id) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      // Expose user.id on the session object (see src/types/next-auth.d.ts).
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
});
