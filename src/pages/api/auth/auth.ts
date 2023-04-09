import { generateToken, verifyToken } from "../../../lib/jwt/jwt";
import { ISignup } from "./signup.pg";
import { NextApiResponse } from "next";
import { setCookie } from "../../../lib/cookie/cookie";
import dbConnect from "../../../lib/db/dbConnect";

export const authenticate = async (req: ISignup, res: NextApiResponse) => {
  const { cookies, body } = req;
  const { password, email } = body;

  try {
    await dbConnect();
  } catch (e) {
    throw Error("Internal Error Occurred");
  }

  if (!cookies.token) {
    const jwtToken = generateToken({ email, password });
    if (!jwtToken) throw Error("An internal error occured");

    res.setHeader("Set-Cookie", setCookie(jwtToken));
    return;
  }

  const userInfo = await verifyToken(cookies.token);

  if (!userInfo) throw Error("Unauthorized");

  return userInfo;
};
