import Head from "next/head";
import Payment from "../../components/__pages/payment-status/PaymentStatus";
import { GetServerSideProps } from "next";

export default function PaymentStatusPage() {
  return (
    <>
      <Head>
        <title>Payment Status Page</title>
        <meta name="description" content="Payment status for order" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Payment />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referrer = await Promise.resolve(context.req.headers.referer || "/");

  if (!referrer.endsWith("/payment-options")) {
    return {
      redirect: {
        destination: "/payment-options",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
