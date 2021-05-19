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

  propriedades.date.map((moeda) => {
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
      <h1>eae {propriedades.date[0].symbol}</h1>
      <Grafico simbolo={`${propriedades.date[0].symbol.toUpperCase()}BRL`} />

      <Select options={options} />
    </div>
  );
}

export const getStaticProps = async () => {
  //const urlVercel = process.env.URL_VERCEL;
  //const urlLocalHost = process.env.URL_LOCAL_HOST;
  const urlCoingecko = `${server}/api/paresBRL/`;

  const response = await fetch(urlCoingecko);
  const data = await response.json();

  return {
    props: {
      propriedades: data,
    },
    revalidate: 10000,
  };
};
