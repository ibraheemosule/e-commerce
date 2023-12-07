import { NextApiResponse, NextApiRequest } from "next";
import { authenticate } from "./auth";
import { UserType } from "../../../utils/ts-types/__store/typesUser";
import { UserModel, IUserModel } from "../../../lib/db/models/user";
import { sendEmail } from "../../../lib/email-notification/email";
import { setCookie } from "../../../lib/cookie/cookie";
import {
  passwordMsg,
  detailsUpdateMsg,
} from "../../../lib/email-notification/messages";
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

    const updateDetails = (await UserModel.updateOne(
      { email: req.body.email },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .exec()
      .catch((e) => {
        console.log(e);
        let message = "An error occured";
        if (e instanceof Error) {
          e.message.includes("Validation")
            ? (message = "Edited field failed validation")
            : null;
        }
        throw new Error(message);
      })) as unknown as IUserModel;

    if (req.body.password) {
      req.cookies.token = "";

      await sendEmail(
        "1907Store Account Password Changed",
        "",
        user!.email,
        passwordMsg("", req.body.firstName)
      );

      res.setHeader("Set-Cookie", setCookie("", -1));
    }

    if (!updateDetails) throw Error("error occurred");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = updateDetails;

    await sendEmail(
      "1907Store Account Details Updated",
      "",
      user!.email,
      detailsUpdateMsg(req.body.firstName)
    );

    return res.status(200).json({ data });
  } catch (e) {
    let message = "server error occurred";
    if (e instanceof Error) message = e.message;
    return res.status(message.includes("server") ? 500 : 401).json({ message });
  }
}
