import { auth } from "@/lib/auth/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Route protection rules
// ---------------------------------------------------------------------------

/** Routes that require an authenticated session. */
const PROTECTED_PATHS = ["/cart", "/wishlist", "/account"];

/** API routes that require authentication (fast-path 401 before full handler). */
const PROTECTED_API_PREFIXES = ["/api/cart", "/api/wishlist", "/api/users/me"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtectedPage = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isProtectedApi = PROTECTED_API_PREFIXES.some((p) =>
    pathname.startsWith(p),
  );

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session?.user?.id) {
    if (isProtectedApi) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Authentication required." },
        { status: 401 },
      );
    }

    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware only on pages and API routes — skip static assets and
  // Next.js internals to avoid unnecessary overhead.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
