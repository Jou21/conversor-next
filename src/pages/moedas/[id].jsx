import { useRouter } from "next/router";
import Grafico from "../../components/Grafico";

import { server } from "../../config";

import axios from "axios";

export default function Moeda({ parDeMoeda }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {parDeMoeda} ≅ {parDeMoeda}
      </h1>
      <Grafico simbolo={parDeMoeda} />
    </div>
  );
}

export const getStaticPaths = async () => {
  //const urlVercel = process.env.URL_VERCEL;
  //const urlLocalHost = process.env.URL_LOCAL_HOST;
  const urlCoingecko = `${server}/api/todosOsPares/`;

  /* const response = await fetch(urlCoingecko);
  const data = await response.json(); */

  let data = [];
  let error = "";
  let paths = [];

  try {
    const res = await fetch(urlCoingecko, {
      method: "GET",
      headers: {
        // update with your user-agent
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
        Accept: "application/json; charset=UTF-8",
      },
    });

    data = await res.json();
    paths = data["date"].map((moeda) => {
      return { params: { id: moeda.parDeMoeda } };
    });
  } catch (e) {
    error = e.toString();
  }

  /* const paths = data["date"].map((moeda) => {
    return { params: { id: moeda.parDeMoeda } };
  }); */

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  return {
    props: {
      parDeMoeda: id,
    },
    revalidate: 10000,
  };
};
