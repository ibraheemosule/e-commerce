import Head from "next/head";
import Products from "../../components/__pages/products/Products";

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>1907 Products Page</title>
        <meta name="description" content="Details for 1907Store products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Products />
    </>
  );
}
