import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { normalizeHostHeader, resolveHostAppId } from "./src/lib/hostRouting";

export function middleware(request: NextRequest) {
  const host = normalizeHostHeader(request.headers.get("host"));
  const pathname = request.nextUrl.pathname;
  const appId = resolveHostAppId(host);

  if (appId === "portfolio") {
    if (pathname.startsWith("/blog") || pathname.startsWith("/frontend")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/blog") || pathname.startsWith("/frontend")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  if (appId === "blog") {
    url.pathname = pathname === "/" ? "/blog" : `/blog${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (appId === "frontend") {
    url.pathname = pathname === "/" ? "/frontend" : `/frontend${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
