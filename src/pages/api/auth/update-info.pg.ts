import { NextApiResponse, NextApiRequest } from "next";
import { authenticate } from "./auth";
import { UserType } from "../../../utils/ts-types/__store/typesUser";
import { UserModel, IUserModel } from "../../../lib/db/models/user";

export interface ISignup extends NextApiRequest {
  body: UserType & { password: string };
}

export default async function updateInfo(req: ISignup, res: NextApiResponse) {
  try {
    await authenticate(req, res);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newUser: IUserModel | null = await UserModel.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      { new: true }
    );

    if (!newUser) throw Error("error occurred");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = newUser;

    // delete data._id;
    // delete data.id;
    // delete data.__v;

    return res.status(200).json({ data });
  } catch (e) {
    // res.setHeader("Set-Cookie", setCookie("", -1));
    // return res.status(200).json({ message: "successful sign out" });
    let message = "server error occurred";
    if (e instanceof Error) message = e.message;
    return res.status(message.includes("server") ? 500 : 401).json({ message });
  }
}
