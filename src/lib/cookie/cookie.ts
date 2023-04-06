import cookie from "cookie";

export const setCookie = (token: string, duration = 3600) =>
  cookie.serialize("token", token, {
    maxAge: duration,
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
