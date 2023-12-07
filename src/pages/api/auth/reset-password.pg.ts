import { NextApiResponse, NextApiRequest } from "next";
import { UserModel, IUserModel } from "../../../lib/db/models/user";
import { customAlphabet } from "nanoid";
import { passwordMsg } from "../../../lib/email-notification/messages";
import { sendEmail } from "../../../lib/email-notification/email";
import { validatePassword } from "../../../utils/utilsFunctions";
import dbConnect from "../../../lib/db/dbConnect";

interface IResetPassword extends NextApiRequest {
  body: { email: string; firstName: string };
}

export default async function updateInfo(
  req: IResetPassword,
  res: NextApiResponse
) {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "No email provided" });
    }

    await dbConnect();

    const chars = "12345ABCDEFabcdef%.&%=";

    type NewPasswordType = () => string;

    const createPassword: NewPasswordType = () => {
      const str = customAlphabet(chars, 8)();
      if (validatePassword(str) === "true") return str;
      return createPassword();
    };

    const newPassword = createPassword();

    const user = (await UserModel.updateOne(
      {
        email: req.body.email,
      },
      { password: newPassword }
    )
      .exec()
      .catch((e) => {
        console.log(e);
        res.status(408).json({ message: "an error occured" });
      })) as unknown as IUserModel;

    if (!user) throw Error("Email not found");

    await sendEmail(
      "1907Store Account Password Reset",
      "",
      req.body.email,
      passwordMsg(req.body.firstName)
    );

    return res.status(200).json({ message: "password reset successful" });
  } catch (e) {
    let message = "server error occurred";
    if (e instanceof Error) message = e.message;
    return res.status(message.includes("server") ? 500 : 401).json({ message });
  }
}
