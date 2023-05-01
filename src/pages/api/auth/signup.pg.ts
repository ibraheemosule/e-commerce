import { NextApiResponse, NextApiRequest } from "next";
import { authenticate } from "./auth";
import { UserType } from "../../../utils/ts-types/__store/typesUser";
import { UserModel, IUserModel } from "../../../lib/db/models/user";

export interface ISignup extends NextApiRequest {
  body: UserType & { password: string };
}

export default async function signup(req: ISignup, res: NextApiResponse) {
  try {
    await authenticate(req, res);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newUser: IUserModel = await UserModel.create(req.body).catch((e) => {
      let message = "An error occurred";

      if (e instanceof Error) {
        e.message.includes("duplicate")
          ? (message = "email already exists")
          : (message = e.message);
      }

      throw new Error(message);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = newUser;

    delete data._id;
    delete data.id;
    delete data.__v;

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
