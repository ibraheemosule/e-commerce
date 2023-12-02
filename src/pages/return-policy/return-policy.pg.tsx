import Head from "next/head";
import ReturnPolicy from "../../components/__pages/return-policy/ReturnPolicy";

export default function ReturnPolicyPage() {
  return (
    <>
      <Head>
        <title>1907 Return Policy</title>
        <meta
          name="description"
          content="1907 Return Policy for products purchased on our platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ReturnPolicy />
    </>
  );
}
