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
      {/* <div style={{ textAlign: "center" }}>
        <a
          className="twitter-timeline"
          data-lang="pt"
          data-width="700"
          data-dnt="true"
          href="https://twitter.com/i/communities/1506789406203695107"
        >
          A Twitter List by Ethereum Hoje
        </a>
      </div> */}

      <div
        className="container"
        style={{ maxWidth: "1300px", textAlign: "center" }}
      >
        <div
        /* className={styles.row}
          style={{ maxWidth: "1300px", textAlign: "center" }} */
        >
          <div
            /* className={styles.column1} */ style={{ backgroundColor: "#fff" }}
          >
            <div style={{ textAlign: "center" }}>
              <a
                className="twitter-timeline"
                data-lang="pt"
                data-width="1300"
                data-dnt="true"
                href="https://twitter.com/i/communities/1506789406203695107"
              >
                A Twitter List by EthereumHoje
              </a>
            </div>
          </div>

          {/* <div className={styles.column2} style={{ backgroundColor: "#fff" }}>
            <div
              style={{
                textAlign: "right",
                width: "100%",
                marginLeft: "-20px",
                marginTop: "23px",
              }}
            >
              <img src="/hotmart5.png" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default MyApp;
