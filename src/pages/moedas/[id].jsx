import Grafico from "../../components/Grafico";

export default function Moeda({ parDeMoeda }) {
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
  let arrayDados = [];
  let arrayDados2 = [];

  var i;
  for (i = 1; i < 2; i++) {
    const urlCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    const response = await fetch(urlCoingecko);
    const data = await response.json();

    arrayDados = arrayDados.concat(data);

    const urlCoingecko2 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    const response2 = await fetch(urlCoingecko2);
    const data2 = await response2.json();

    arrayDados2 = arrayDados2.concat(data2);
  }

  let paths1 = arrayDados.map((moeda) => {
    return { params: { id: `${moeda.symbol.toUpperCase()}BRL` } };
  });

  let paths2 = arrayDados2.map((moeda) => {
    return { params: { id: `${moeda.symbol.toUpperCase()}USD` } };
  });

  const paths = paths1.concat(paths2);

  /* const paths = [
    {
      params: { id: "ETHBRL" },
    },
  ]; */

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
