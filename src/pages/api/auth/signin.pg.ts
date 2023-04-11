import { NextApiResponse, NextApiRequest } from "next";
import { authenticate } from "./auth";
import { UserType } from "../../../utils/ts-types/__store/typesUser";
import { UserModel, IUserModel } from "../../../lib/db/models/user";
export interface ISignup extends NextApiRequest {
  body: UserType & { password: string };
}

export default async function signup(req: ISignup, res: NextApiResponse) {
  try {
    const user = await UserModel.findOne(
      {
        email: req.body.email,
      },
      { id: 0, __v: 0 }
    )
      .then((res: IUserModel) => res)
      .catch(() => {
        res.status(401).json({ message: "incorrect Email or server error" });
      });

    if (!user) return;

    const passwordCheck = await user?.checkPassword(req.body.password);

    if (!passwordCheck) throw Error("Incorrect password");

    user.password = "";

    await authenticate(req, res);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    return res.status(200).json({ data: user });
  } catch (e) {
    console.log(e);
    let message = "Internal server error";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
