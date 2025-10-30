import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = (pathanme: string) => {
  if (["/", "/login"].imcludes(pathanme) || pathanme.startsWith("/blog")) {
    return true;
  }
  return false;
};
export function middleware(request: NextRequest) {
  // const user_id = request.cookies.get("user_id");
  //   if (!user_id && request.nextUrl.pathname === "/blog") {
  //     return Response.json({ message: "Unauthorized" });
  //   }
  // console.log("nextUrl", request.nextUrl.pathname);

  // if (Math.random() > 0.5 && request.nextUrl.pathname === "/blog") {
  //   return NextResponse.rewrite(new URL("/blog-2", request.url));
  // }

  const sessionCookie = getSessionCookie(request);

  if (!isPublicRoute(request.nextUrl.pathname) && !sessionCookie) {
    return NextResponse.redirect(new URL(`/login?${new URLSearchParams({redirectTo:request.nextUrl.pathname})}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
