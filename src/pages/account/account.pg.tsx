import Head from "next/head";
import Account from "../../components/__pages/account/Account";

export default function AccountPage() {
  return (
    <>
      <Head>
        <title>1907Store User Account</title>
        <meta
          name="description"
          content="1907Store User Account Information and orders history"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Account />
    </>
  );
}
