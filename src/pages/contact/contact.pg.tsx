import Head from "next/head";
import Contact from "../../components/__pages/contact/Ccontact";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact page</title>
        <meta name="description" content="1907Store contact page " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Contact />
    </>
  );
}
