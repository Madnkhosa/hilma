import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
interface DecodedToken {
  role: string;
  [key: string]: any;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard")) {
    const cookieStore = cookies();
    const email = cookieStore.get("email")?.value;
    const password = cookieStore.get("password")?.value;

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_LOGIN_EMAIL;
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_LOGIN_PASS;
    if (!email && !password) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      if (email === adminEmail && password === adminPassword) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
