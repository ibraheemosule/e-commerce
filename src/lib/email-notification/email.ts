import emailjs from "@emailjs/nodejs";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_EMAIL_PRIVATE_KEY as string;
const WELCOME_TEMPLATE = process.env.SERVER_EMAIL_WELCOME_TEMPLATE as string;
const SERVICE_ID = process.env.SERVER_SERVICE_ID as string;

emailjs.init({
  publicKey: PUBLIC_KEY,
  privateKey: PRIVATE_KEY,
});

export const sendEmail = async (
  title: string,
  name: string,
  email: string,
  message: string
) => {
  const emailParams = {
    title,
    from_name: "1907 Store",
    to_name: name,
    to_email: email,
    message,
  };

  try {
    await emailjs.send(SERVICE_ID, WELCOME_TEMPLATE, emailParams);
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      return e.message;
    }
    return e;
  }
};
