import Head from "next/head";
import Signup from "../../components/__pages/signup/Signup";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Open a 1907Store Account<" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Signup />
    </>
  );
}
