import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="icon"
          href="/resources/icon-tab/favicon-32x32.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          sizes="48x48"
          href="/resources/icon-tab/icon-48x48.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/resources/icon-tab/icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="96x96"
          href="/resources/icon-tab/icon-96x96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/resources/icon-tab/icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/resources/icon-tab/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="256x256"
          href="/resources/icon-tab/icon-256x256.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="384x384"
          href="/resources/icon-tab/icon-384x384.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/resources/icon-tab/favicon-512x512.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
