import { useState } from "react";
import { useRouter } from "next/router";
import Grafico from "../components/Grafico";

import { server } from "../config";

import React, { Component } from "react";
import Select from "react-select";

import Link from "next/link";

export default function Home({ propriedades }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando....</p>;
  }

  const options = [];

  propriedades.data.map((moeda) => {
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
      <h1>eae {propriedades.data[0].symbol}</h1>
      <Grafico simbolo={`${propriedades.data[0].symbol.toUpperCase()}BRL`} />

      <Select options={options} />
    </div>
  );
}

export const getStaticProps = async () => {
  //const urlVercel = process.env.URL_VERCEL;
  //const urlLocalHost = process.env.URL_LOCAL_HOST;
  //const urlCoingecko = `${server}/api/paresBRL/`;

  let arrayDados = [];
  var i;
  for (i = 1; i < 2; i++) {
    const urlCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    const response = await fetch(urlCoingecko);
    const data = await response.json();

    arrayDados = arrayDados.concat(data);
  }

  /* let data = [];
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
  } catch (e) {
    error = e.toString();
  } */

  return {
    props: {
      propriedades: arrayDados,
    },
    revalidate: 10000,
  };
};
