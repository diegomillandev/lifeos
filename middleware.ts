import { NextResponse, NextRequest } from "next/server";
import { verifyJWT } from "./utils/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("LIFEOS_TOKEN")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    await verifyJWT(token);
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|auth).*)"],
};
