import Head from "next/head";
import PaymentOptions from "../../components/__pages/payment-options/PaymentOptions";
import { GetServerSideProps } from "next";
import { calculateTotalPrice } from "../../utils/utilsFunctions";
import {
  CartType,
  ProductType,
} from "../../utils/ts-types/__store/typesProduct";

export default function PaymentMethodPage({ amount, cart, list }: PropType) {
  return (
    <>
      <Head>
        <title>Payment options</title>
        <meta
          name="description"
          content="Payment options for the products to be bought"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PaymentOptions amount={amount} cart={cart} list={list} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const referrer = await Promise.resolve(context.req.headers.referer || "/");

  const { cartList, immutableProducts } = context.query as unknown as Record<
    string,
    string
  >;

  if (
    (!referrer.endsWith("/checkout") &&
      !referrer.endsWith("/payment-status")) ||
    !cartList
  ) {
    return {
      redirect: {
        destination: "/checkout",
        permanent: false,
      },
    };
  }

  const product = {
    cartList: JSON.parse(cartList) as CartType[],
    immutableProducts: JSON.parse(immutableProducts) as ProductType[],
  };

  const amount = calculateTotalPrice(product);

  return {
    props: { amount, list: product.immutableProducts, cart: product.cartList },
  };
};

type PropType = {
  amount: number;
  cart: CartType[];
  list: ProductType[];
};
