import { NextApiResponse, NextApiRequest } from "next";
import { authenticate } from "./auth";
import { UserType } from "../../../utils/ts-types/__store/typesUser";
import { UserModel, IUserModel } from "../../../lib/db/models/user";
import { sendEmail } from "../../../lib/email-notification/email";
import { accCreatedMsg } from "../../../lib/email-notification/messages";
import { firstLetterUpperCase } from "../../../utils/utilsFunctions";
import dbConnect from "../../../lib/db/dbConnect";
export interface ISignup extends NextApiRequest {
  body: UserType & { password: string };
}

export default async function signup(req: ISignup, res: NextApiResponse) {
  try {
    await dbConnect();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: IUserModel = await UserModel.create(req.body).catch((e) => {
      let message = "An error occurred";

      if (e instanceof Error) {
        e.message.includes("duplicate")
          ? (message = "email already exists")
          : (message = e.message);
      }

      throw new Error(message);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = user;

    delete data._id;
    delete data.id;
    delete data.__v;

    await authenticate(req, res);

    await sendEmail(
      "1907Store Account Created",
      firstLetterUpperCase(user.firstName),
      user.email,
      accCreatedMsg(user)
    );

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    let message = "Internal Error Occurred";
    if (e instanceof Error) message = e.message;
    return res
      .status(message.includes("Internal") ? 500 : 401)
      .json({ message });
  }
}
