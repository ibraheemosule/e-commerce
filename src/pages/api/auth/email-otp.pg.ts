import { NextApiResponse } from "next";
import startRedis from "../../../lib/redis/redis";
import otp from "../../../lib/otp-generator/otp-generator";
import { ICreateOtpReq } from "../../../utils/ts-types/api-types";
import { sendOtp } from "../../../lib/email-notification/messages";
import { sendEmail } from "../../../lib/email-notification/email";

export default async function createOtp(
  req: ICreateOtpReq,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;
    if (!email) throw Error("No email provided");

    const client = await startRedis();

    const getOtp =
      (await client.get(email)) ||
      (await client
        .setEx(email, 60 * 5, JSON.stringify(otp()))
        .then(() => client.get(email)));

    if (getOtp) {
      await sendEmail("OTP from 1907Store", "Customer", email, sendOtp(getOtp));
      res.status(200).json({ otp_sent: true });
      return;
    }
    throw Error("OTP service temporarily unavailable");
  } catch (e) {
    let message = "Internal server error";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
