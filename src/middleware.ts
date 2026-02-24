
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Build protected routes logic
    const isProtected = path.startsWith("/admin") && !path.startsWith("/adminlogin");

    const adminSession = request.cookies.get("admin_session")?.value;

    // Protected Route Logic
    if (isProtected && !adminSession) {
        return NextResponse.redirect(new URL("/adminlogin", request.url));
    }

    // Redirect logged-in users away from login page
    if (path === "/adminlogin" && adminSession) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/adminlogin"],
};
