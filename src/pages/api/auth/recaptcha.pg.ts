import { NextApiResponse } from "next";
import {
  IServerRecaptchaReq,
  IServerRecaptchaResponse,
} from "../../../utils/ts-types/api-types";

const actions = [
  "signupFrom1907",
  "signinFrom1907",
  "editProfileFrom1907",
  "changePasswordFrom1907",
  "forgotPasswordFrom1907",
  "contactFrom1907",
  "verifyOtpFrom1907",
];

const secretKey = process.env.RECAPTCHA_SECRET_KEY;
const recaptchaUrl = process.env.RECAPTCHA_URL;

export default async function recaptcha(
  req: IServerRecaptchaReq,
  res: NextApiResponse
) {
  try {
    const { token } = req.body;
    if (!token) throw Error("Human verification Failed");

    const verify = await fetch(
      `${recaptchaUrl}secret=${secretKey}&response=${token}`,
      { method: "POST" }
    );
    const data = (await verify.json()) as unknown as IServerRecaptchaResponse;

    if (!data?.success || !actions.includes(data.action))
      throw Error("Human verification Failed");

    return res.status(200).json({ success: data.success });
  } catch (e) {
    let message = "Internal server error";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
