import emailjs from "@emailjs/nodejs";
import nodemailer from "nodemailer";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY as string;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string;

emailjs.init({
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ADMIN_EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmail = async (
  title: string,
  name: string,
  email: string,
  message: string
) => {
  const mailParams = {
    from: "1907 Store",
    to: email,
    subject: title,
    html: message,
  };

  try {
    await transporter.sendMail(mailParams);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      return e.message;
    }
    return e;
  }
};
