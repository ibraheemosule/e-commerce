import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname === req.nextUrl.pathname.toLocaleLowerCase())
    return NextResponse.next();

  return NextResponse.redirect(
    `${req.nextUrl.origin}${req.nextUrl.pathname.toLocaleLowerCase()}`
  );
}
