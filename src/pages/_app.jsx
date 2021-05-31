import Head from "next/head";

import "font-awesome/css/font-awesome.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta httpEquiv="Content-Language" content="pt-br" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
