import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  // Rutas que requieren autenticación
  const protectedPaths = ["/admin/dashboard"];

  // Verificar si la ruta actual requiere autenticación
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const token = request.cookies.get("auth_token");

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      const isValid = await verifyToken(token.value);
      if (!isValid) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
