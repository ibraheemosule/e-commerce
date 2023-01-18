import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Layout from "../components/reusables/Layout";
import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store()}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <>
              <Component {...pageProps} />
            </>
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
