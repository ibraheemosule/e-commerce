import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import Layout from "../components/reusables/Layout";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <Provider store={store()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
