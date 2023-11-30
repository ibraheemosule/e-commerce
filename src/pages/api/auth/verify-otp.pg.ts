import { NextApiResponse } from "next";
import { IVerifyOtpReq } from "../../../utils/ts-types/api-types";
import startRedis from "../../../lib/redis/redis";

export default async function verifyOtp(
  req: IVerifyOtpReq,
  res: NextApiResponse
) {
  try {
    const { otp, email } = req.body;
    if (otp.length !== 6) throw Error("OTP is invalid");

    const redis = await startRedis();
    const getOtp = await redis.get(email);
    if (!getOtp) throw Error("OTP session expired");
    if (getOtp !== otp) throw Error("Invalid OTP");

    res.status(200).json({ success: true });
    return;
  } catch (e) {
    let message = "Internal server error";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
