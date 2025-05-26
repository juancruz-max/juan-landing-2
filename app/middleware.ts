import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Panel"',
        },
      });
    }

    try {
      const encodedCredentials = authHeader.split(" ")[1];
      const decodedCredentials = Buffer.from(
        encodedCredentials,
        "base64"
      ).toString();
      const [username, password] = decodedCredentials.split(":");

      // Use environment variables for authentication
      const validUsername = process.env.ADMIN_USERNAME;
      const validPassword = process.env.ADMIN_PASSWORD;
      console.log("validUsername", validUsername);
      console.log("validPassword", validPassword);

      if (username !== validUsername || password !== validPassword) {
        return new NextResponse("Invalid credentials", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="Admin Panel"',
          },
        });
      }
    } catch (error) {
      return new NextResponse("Invalid authentication header", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Panel"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
