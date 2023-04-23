import { NextApiResponse, NextApiRequest } from "next";
import { authenticate } from "./auth";
import { UserType } from "../../../utils/ts-types/__store/typesUser";
import { UserModel, IUserModel } from "../../../lib/db/models/user";
import dbConnect from "../../../lib/db/dbConnect";
export interface ISignup extends NextApiRequest {
  body: UserType & { password: string };
}

export default async function signin(req: ISignup, res: NextApiResponse) {
  try {
    await dbConnect();

    const user = await UserModel.findOne(
      {
        email: req.body.email,
      },
      { id: 0, __v: 0 }
    )
      .then((res: IUserModel) => res)
      .catch((e) => {
        console.log(e);
        res.status(401).json({ message: "Internal error occured" });
      });

    if (!user) throw Error("Email not found");

    const passwordCheck = await user?.checkPassword(req.body.password);

    if (!passwordCheck) throw Error("Incorrect password");

    user.password = "";

    delete user._id;
    delete user.__v;

    await authenticate(req, res);

    return res.status(200).json({ data: user });
  } catch (e) {
    console.log(e);
    let message = "Internal server error";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
