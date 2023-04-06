import { NextApiResponse, NextApiRequest } from "next";
import { authenticate } from "./auth";

export interface ISignup extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async function signup(req: ISignup, res: NextApiResponse) {
  try {
    await authenticate(req, res);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = req.body;
    return res.status(200).json({ data });
  } catch (e) {
    let message = "Internal error occurred";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
