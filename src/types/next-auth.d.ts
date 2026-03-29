// Session type augmentation for Auth.js v5.
// Adds `user.id` to the built-in Session type so route handlers and
// server components can access it without casting.

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
    };
  }
}
