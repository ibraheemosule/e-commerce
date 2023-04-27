import { NextApiRequest } from "next";

export interface IReq extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}
