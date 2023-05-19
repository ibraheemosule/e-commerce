import Head from "next/head";
import PaymentOptions from "../../components/__pages/payment-options/PaymentOptions";
import { GetServerSideProps } from "next";
import { calculateTotalPrice } from "../../utils/utilsFunctions";
import { CmsAllProductsType } from "../../utils/ts-types/contentful-types";
import {
  CartType,
  ProductType,
} from "../../utils/ts-types/__store/typesProduct";
import { allProductsQuery } from "../../lib/contentful/query";
import { fetchCall } from "../../lib/contentful/contentful";

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

  const { cartList } = context.query as unknown as Record<string, string>;
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

  const { data } = (await fetchCall(allProductsQuery)) as CmsAllProductsType;

  const formatData = data.productCollection.items.map((item) => {
    item.id = item.sys?.id;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sys, ...rest } = item;
    return rest;
  });

  const product = {
    cartList: JSON.parse(cartList) as CartType[],
    immutableProducts: formatData as ProductType[],
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
