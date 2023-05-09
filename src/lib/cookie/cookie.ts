import cookie from "cookie";

const t = process.env.NEXT_PUBLIC_SESSION_TIMEOUT as unknown as number;

export const setCookie = (token: string, duration = t) =>
  cookie.serialize("token", token, {
    maxAge: duration,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
