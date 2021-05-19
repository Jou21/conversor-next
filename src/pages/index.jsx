import Grafico from "../components/Grafico";

import Select from "react-select";

import Link from "next/link";

export default function Home({ propriedades }) {
  const options = [];

  propriedades.map((moeda) => {
    const array = {
      value: moeda.name,
      label: (
        <Link
          href="/moedas/[id]"
          as={`/moedas/${moeda.symbol.toUpperCase()}BRL`}
        >
          <div>
            <img src={moeda.image} height="30px" width="30px" /> &nbsp;
            {moeda.name}
          </div>
        </Link>
      ),
    };

    options.push(array);
  });

  return (
    <div className="container">
      <h1>eae {propriedades[0].symbol}</h1>
      <Grafico simbolo={`${propriedades[0].symbol.toUpperCase()}BRL`} />

      <Select options={options} />
    </div>
  );
}

export const getStaticProps = async () => {
  let arrayDados = [];

  const urlCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=1&sparkline=false`;

  const response = await fetch(urlCoingecko);
  const data = await response.json();

  return {
    props: {
      propriedades: data,
    },
    revalidate: 10000,
  };
};
