import Head from "next/head";
import Checkout from "../../components/__pages/checkout/Checkout";
import { GetServerSideProps } from "next";

export default function CheckoutPage() {
  return (
    <>
      <Head>
        <title>Checkout page</title>
        <meta name="description" content="Checkout page for payment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Checkout />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referrer = await Promise.resolve(context.req.headers.referer || "/");
  if (!referrer.endsWith("/cart")) {
    return {
      redirect: {
        destination: "/cart",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
