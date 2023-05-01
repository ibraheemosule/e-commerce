import { NextApiResponse } from "next";
import { authenticate } from "./auth";
import { UserModel, IUserModel } from "../../../lib/db/models/user";
import dbConnect from "../../../lib/db/dbConnect";
import { IReq } from "../../../utils/ts-types/api-types";

export default async function signin(req: IReq, res: NextApiResponse) {
  try {
    await dbConnect();

    const user = (await UserModel.findOne(
      {
        email: req.body.email,
      },
      { _id: 0, __v: 0 }
    )
      .exec()
      .catch((e) => {
        console.log(e);
        res.status(401).json({ message: "Internal error occured" });
      })) as IUserModel;

    if (!user) throw Error("Email not found");

    const passwordCheck = await user?.checkPassword(req.body.password);

    if (!passwordCheck) throw Error("Incorrect password");

    user.password = "";

    await authenticate(req, res);

    return res.status(200).json({
      data: user,
    });
  } catch (e) {
    console.log(e);
    let message = "Internal server error";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
