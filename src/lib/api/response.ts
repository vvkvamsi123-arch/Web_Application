import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Typed response helpers — keep route handlers concise and consistent.
// Every non-2xx response uses the { error, message } envelope documented in
// docs/api/contracts.md.
// ---------------------------------------------------------------------------

export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function created<T>(data: T) {
  return NextResponse.json(data, { status: 201 });
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function badRequest(message: string, code = "BAD_REQUEST") {
  return NextResponse.json({ error: code, message }, { status: 400 });
}

export function unauthorized(message = "Authentication required.") {
  return NextResponse.json(
    { error: "UNAUTHORIZED", message },
    { status: 401 },
  );
}

export function forbidden(message = "Access denied.") {
  return NextResponse.json({ error: "FORBIDDEN", message }, { status: 403 });
}

export function notFound(message = "Resource not found.") {
  return NextResponse.json({ error: "NOT_FOUND", message }, { status: 404 });
}

export function conflict(message: string, code = "CONFLICT") {
  return NextResponse.json({ error: code, message }, { status: 409 });
}

export function serverError(message = "An unexpected error occurred.") {
  return NextResponse.json(
    { error: "INTERNAL_SERVER_ERROR", message },
    { status: 500 },
  );
}
