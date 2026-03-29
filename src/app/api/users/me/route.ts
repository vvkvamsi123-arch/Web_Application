import { auth } from "@/lib/auth/config";
import { ok, unauthorized } from "@/lib/api/response";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return unauthorized();

  const { id, email, name, image } = session.user;
  return ok({ id, email, name: name ?? null, image: image ?? null });
}
