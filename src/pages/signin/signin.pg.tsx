import Head from "next/head";
import Signin from "../../components/__pages/signin/Signin";

export default function SigninPage() {
  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Sign in to your 1907Store Account<" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Signin />
    </>
  );
}
