// Delegates all Auth.js route handling to the configured NextAuth instance.
// Handles: GET /api/auth/* and POST /api/auth/* (signin, signout, callback, session, csrf…)
import { handlers } from "@/lib/auth/config";

export const { GET, POST } = handlers;
