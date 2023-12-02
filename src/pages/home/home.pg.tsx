import Head from "next/head";
import Home from "../../components/__pages/home/Home";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Welcome to 1907Store</title>
        <meta
          name="description"
          content="1907Store is your one-stop online store to get variety of leather wears and accessories"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </>
  );
}
