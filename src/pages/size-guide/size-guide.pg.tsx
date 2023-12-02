import Head from "next/head";
import SizeGuide from "../../components/__pages/size-guide/SizeGuide";

export default function SizeGuidePage() {
  return (
    <>
      <Head>
        <title>1907Store Products Size Guide</title>
        <meta
          name="description"
          content="1907Store Products Size Guide for all wears and accessories"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SizeGuide />
    </>
  );
}
