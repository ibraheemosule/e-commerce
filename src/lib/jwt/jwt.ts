import { sign, verify } from "jsonwebtoken";

const signToken = process.env.JWT_SIGN_TOKEN as string;

export interface IUserAuth {
  email: string;
  password: string;
}

export const generateToken = (user: IUserAuth): string =>
  sign(user, signToken, {
    expiresIn: "1h",
  });

export const verifyToken = (token: string): Promise<IUserAuth | false> =>
  new Promise((resolve, reject) =>
    verify(token, signToken, (err, payload) => {
      if (err) return reject(false);
      return resolve(payload as IUserAuth);
    })
  );
