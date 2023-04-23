import { NextApiResponse, NextApiRequest } from "next";
import { authenticate } from "./auth";
import { UserType } from "../../../utils/ts-types/__store/typesUser";
import { UserModel, IUserModel } from "../../../lib/db/models/user";
export interface IAuthInfo extends NextApiRequest {
  body: UserType & { password: string; oldPassword?: string };
}

export default async function updateInfo(req: IAuthInfo, res: NextApiResponse) {
  try {
    const user = await authenticate(req, res);

    if (req.body.password && user?.password !== req.body.oldPassword) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    delete req.body.oldPassword;
    const updateDetails = (await UserModel.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).exec()) as unknown as IUserModel;

    if (req.body.password) {
      req.cookies.token = "";
      await authenticate(req, res);
    }

    if (!updateDetails) throw Error("error occurred");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = updateDetails;

    return res.status(200).json({ data });
  } catch (e) {
    let message = "server error occurred";
    if (e instanceof Error) message = e.message;
    return res.status(message.includes("server") ? 500 : 401).json({ message });
  }
}
