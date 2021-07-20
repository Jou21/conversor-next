import Head from "next/head";
import CookieConsent, { Cookies } from "react-cookie-consent";
import Link from "next/link";
import styles from "../styles.module.scss";

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
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <div
        style={{
          zIndex: "99",
          position: "fixed",
          right: "0",
          bottom: "0",
          justifyContent: "space-between",
          width: "100%",
          background: "white",
        }}
      >
        <CookieConsent
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            marginBottom: "14px",
            marginRight: "40px",
            marginLeft: "40px",
          }}
          disableStyles={true}
          location="bottom"
          buttonText="Compreendo!"
          cookieName="myAwesomeCookieName2"
          buttonClasses={styles.myHoveringButton}
          expires={150}
        >
          <span style={{ color: "gray", fontSize: "15px" }}>
            Este site usa cookies para garantir que você obtenha a melhor
            experiência em nosso site. {"    "}
          </span>

          <Link href="/sobre">
            <a style={{ textDecorationLine: "underline", fontSize: "15px" }}>
              Leia mais
            </a>
          </Link>
        </CookieConsent>
      </div>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
