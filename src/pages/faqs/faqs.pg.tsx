import Head from "next/head";
import Faqs from "../../components/__pages/faqs/Faqs";

export default function FaqsPage() {
  return (
    <>
      <Head>
        <title>1907Store Frequently Asked Questions</title>
        <meta
          name="description"
          content="Questions often asked frequently on 1907Store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Faqs />
    </>
  );
}
