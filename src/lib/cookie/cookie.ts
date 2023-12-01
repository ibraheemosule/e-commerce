import cookie from "cookie";

const t = process.env.NEXT_PUBLIC_SESSION_TIMEOUT as unknown as number;

export const setCookie = (token: string, duration = t, name?: string) =>
  cookie.serialize(name || "token", token, {
    maxAge: duration,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
