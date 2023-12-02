import Head from "next/head";
import Cart from "../../components/__pages/cart/Cart";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart Page</title>
        <meta
          name="description"
          content="Cart page for items selected in the products page of 1907Store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Cart />
    </>
  );
}
