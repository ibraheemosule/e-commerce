import { NextApiResponse, NextApiRequest } from "next";
import { setCookie } from "../../../lib/cookie/cookie";

export interface ISignup extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default function signup(req: ISignup, res: NextApiResponse) {
  try {
    if (req.cookies.token) {
      res.setHeader("Set-Cookie", setCookie("", -1));
      return res.status(200).json({ message: "successful sign out" });
    }
    return res.status(200).json({ message: "you are already signed out" });
  } catch (e) {
    let message = "Internal error occurred";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
