import { NextApiRequest } from "next";
import { IRecaptchaPayload } from "./__store/typesUser";

export interface IReq extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export interface IServerRecaptchaReq extends NextApiRequest {
  body: IRecaptchaPayload;
}

export interface IServerRecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: number[];
}

export interface ICreateOtpReq extends NextApiRequest {
  body: {
    email: string;
  };
}

export interface IVerifyOtpReq extends NextApiRequest {
  body: {
    otp: string;
    email: string;
  };
}
