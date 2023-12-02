import Head from "next/head";
import About from "../../components/__pages/about/About";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Read About 1907Store</title>
        <meta
          name="description"
          content="1907Store is the one stop shop for leather wears"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <About />
    </>
  );
}
