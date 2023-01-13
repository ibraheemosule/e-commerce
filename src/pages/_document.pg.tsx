/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import theme, { roboto } from "../utils/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { EmotionCache } from "@emotion/utils";

// eslint-disable-next-line @typescript-eslint/unbound-method
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={roboto.className}>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="emotion-insertion-point" content="" />
          {(this.props as unknown as Record<string, string>).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
// eslint-disable-next-line @typescript-eslint/unbound-method
MyDocument.getInitialProps = async (ctx) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { renderPage: originalRenderPage } = ctx;

  const cache = createEmotionCache() as unknown as EmotionCache;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/unbound-method
  const { extractCriticalToChunks } = createEmotionServer(cache);

  // eslint-disable-next-line @typescript-eslint/unbound-method
  ctx.renderPage = () =>
    // eslint-disable-next-line @typescript-eslint/unbound-method
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          // @ts-ignore
          return <App emotionCache={cache} {...props} />;
        },
    });
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      key={style.key}
      // eslint-disable-next-line react/no-danger, @typescript-eslint/no-unsafe-member-access
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
