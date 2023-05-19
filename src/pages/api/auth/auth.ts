import { generateToken, verifyToken } from "../../../lib/jwt/jwt";
import { NextApiResponse } from "next";
import { setCookie } from "../../../lib/cookie/cookie";
import dbConnect from "../../../lib/db/dbConnect";
import { IReq } from "../../../utils/ts-types/api-types";

const authPages = ["/api/auth/signup", "/api/auth/signin"];

export const authenticate = async (req: IReq, res: NextApiResponse) => {
  const { cookies, body } = req;
  const { password, email } = body;

  try {
    await dbConnect();
  } catch (e) {
    throw Error("Internal Error Occurred");
  }

  if (!cookies.token && req.url && authPages.includes(req.url)) {
    const jwtToken = generateToken({ email, password });
    if (!jwtToken) throw Error("An internal error occured");

    const cookie = setCookie(jwtToken);

    res.setHeader("Set-Cookie", cookie);
    return;
  }

  const userInfo = cookies.token && (await verifyToken(cookies.token));
  console.log(userInfo, cookies.token);
  if (!userInfo) throw Error("not authenticated");

  return userInfo;
};
