import { NextRequest, NextResponse } from "next/server";

const authPages = ["/signup", "/signin"];
const userPages = ["/account", "/checkout"];

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("token");
  const path = req.nextUrl.pathname;

  if (path.startsWith("/_next")) {
    return NextResponse.next();
  }

  // if (authPages.includes(path) && cookie) {
  //   return NextResponse.redirect(`${req.nextUrl.origin}`);
  // }

  // if (userPages.includes(path) && !cookie) {
  //   return NextResponse.redirect(`${req.nextUrl.origin}/signin`);
  // }

  if (path === path.toLocaleLowerCase()) return NextResponse.next();

  return NextResponse.redirect(
    `${req.nextUrl.origin}${path.toLocaleLowerCase()}`
  );
}
