import Grafico from "../../components/Grafico";

import Select from "react-select";

import Link from "next/link";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Input,
  Dropdown,
  Icon,
} from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

export default function Moeda({
  qualEhACrypto,
  propriedades,
  cotacoesFiat,
  stringImgMoedaCrypto,
}) {
  const valorUSD = cotacoesFiat.USD.buy;
  const valorEUR = cotacoesFiat.EUR.buy;

  let precoDaMoedaCrypto = "0";
  let propriedadesMoedaCryptoAtual = [];
  let indexOptions = 0;

  const qualEhOValorDaMoedaFiat = function () {
    propriedades.map((moeda, index) => {
      if (qualEhACrypto == moeda.symbol.toUpperCase()) {
        //console.log("ENTROU1");
        indexOptions = index;
        propriedadesMoedaCryptoAtual = moeda;
        precoDaMoedaCrypto = moeda.current_price / valorEUR;
      }
    });
    return precoDaMoedaCrypto;
  };

  const [selectMoedaFiat, setSelectMoedaFiat] = useState("EUR");
  const [moedaCrypto, setMoedaCrypto] = useState(1);
  const [moedaFiat, setMoedaFiat] = useState(qualEhOValorDaMoedaFiat);

  const options = [];

  const options2 = [
    {
      value: "BRL",
      label: (
        <div>
          &nbsp;&nbsp;
          <img src="/brl.svg" height="30px" width="30px" /> &nbsp;
          {"BRL"}
        </div>
      ),
    },
    {
      value: "USD",
      label: (
        <div>
          &nbsp;&nbsp;
          <img src="/usd.svg" height="30px" width="30px" /> &nbsp;
          {"USD"}
        </div>
      ),
    },
    {
      value: "EUR",
      label: (
        <div>
          &nbsp;&nbsp;
          <img src="/eur.svg" height="30px" width="30px" /> &nbsp;
          {"EUR"}
        </div>
      ),
    },
  ];

  const handleChangeSelectMoedaFiat = (e) => {
    setSelectMoedaFiat(e.value.toUpperCase());

    if (e.value.toUpperCase() === "USD") {
      const num = (moedaCrypto * precoDaMoedaCrypto) / valorUSD;
      setMoedaFiat(num);
    } else if (e.value.toUpperCase() === "EUR") {
      const num = (moedaCrypto * precoDaMoedaCrypto) / valorEUR;
      setMoedaFiat(num);
    } else {
      const num = moedaCrypto * precoDaMoedaCrypto;
      setMoedaFiat(num);
    }
  };

  const handleChangeValorMoedaCrypto = (e) => {
    setMoedaCrypto(e.target.value);

    if (selectMoedaFiat === "USD") {
      const num = (precoDaMoedaCrypto * e.target.value) / valorUSD;
      setMoedaFiat(num);
    } else if (selectMoedaFiat === "EUR") {
      const num = (precoDaMoedaCrypto * e.target.value) / valorEUR;
      setMoedaFiat(num);
    } else {
      const num = precoDaMoedaCrypto * e.target.value;
      setMoedaFiat(num);
    }
  };

  const handleChangeValorMoedaFiat = (e) => {
    setMoedaFiat(e.target.value);

    if (selectMoedaFiat === "USD") {
      const num = e.target.value / precoDaMoedaCrypto / valorUSD;
      setMoedaCrypto(num);
    } else if (selectMoedaFiat === "EUR") {
      const num = e.target.value / precoDaMoedaCrypto / valorEUR;
      setMoedaCrypto(num);
    } else {
      const num = e.target.value / precoDaMoedaCrypto;
      setMoedaCrypto(num);
    }
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 70,
      minHeight: 70,
      borderRadius: 0,
    }),
  };

  propriedades.map((moeda) => {
    const array = {
      value: moeda.name,
      label: (
        <Link href={`${moeda.symbol.toUpperCase()}`}>
          <div>
            &nbsp;&nbsp;
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
      <h1>eae {propriedadesMoedaCryptoAtual.symbol}</h1>

      <Segment>
        <Grid columns={2} relaxed="very" stackable verticalAlign="top">
          <Grid.Column>
            <div
              className="ui massive icon input"
              style={{ width: "100%", maxWidth: "100%", borderRadius: 0 }}
            >
              <input
                value={moedaCrypto}
                onChange={handleChangeValorMoedaCrypto}
                type="number"
                placeholder={propriedadesMoedaCryptoAtual.name}
                style={{ width: "100%", maxWidth: "100%", borderRadius: 0 }}
              />
              <i aria-hidden="true" className="dollar icon"></i>
            </div>

            <Select
              instanceId="0"
              defaultValue={options[indexOptions]}
              options={options}
              styles={customStyles}
            />
          </Grid.Column>

          <Grid.Column verticalAlign="bottom">
            <div
              className="ui massive icon input"
              style={{ width: "100%", maxWidth: "100%", borderRadius: 0 }}
            >
              <input
                value={moedaFiat}
                onChange={handleChangeValorMoedaFiat}
                type="number"
                placeholder={selectMoedaFiat}
                style={{ width: "100%", maxWidth: "100%", borderRadius: 0 }}
              />
              <i aria-hidden="true" className="dollar icon"></i>
            </div>

            <Select
              instanceId="1"
              defaultValue={options2[2]}
              options={options2}
              styles={customStyles}
              onChange={handleChangeSelectMoedaFiat}
            />
          </Grid.Column>
        </Grid>

        <Divider vertical hidden>
          <div
            style={{
              marginLeft: "4px",
              marginTop: "-2px",
              fontSize: "30px",
            }}
          >
            <i aria-hidden="false" className="exchange icon grey"></i>
          </div>
        </Divider>
      </Segment>

      <Grafico simbolo={`${qualEhACrypto.toUpperCase()}${selectMoedaFiat}`} />
    </div>
  );
}

export const getStaticPaths = async () => {
  let arrayDados = [];
  let arrayDados2 = [];
  let arrayDados3 = [];

  var i;
  for (i = 1; i < 2; i++) {
    const urlCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=50&page=${i}&sparkline=false`;

    const response = await fetch(urlCoingecko);
    const data = await response.json();

    arrayDados = arrayDados.concat(data);

    const urlCoingecko2 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${i}&sparkline=false`;

    const response2 = await fetch(urlCoingecko2);
    const data2 = await response2.json();

    arrayDados2 = arrayDados2.concat(data2);

    const urlCoingecko3 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=${i}&sparkline=false`;

    const response3 = await fetch(urlCoingecko3);
    const data3 = await response3.json();

    arrayDados3 = arrayDados3.concat(data3);
  }

  let paths1 = arrayDados.map((moeda) => {
    return { params: { id: `${moeda.symbol.toUpperCase()}BRL` } };
  });

  let paths2 = arrayDados2.map((moeda) => {
    return { params: { id: `${moeda.symbol.toUpperCase()}USD` } };
  });

  let paths3 = arrayDados3.map((moeda) => {
    return { params: { id: `${moeda.symbol.toUpperCase()}EUR` } };
  });

  const paths = paths1.concat(paths2.concat(paths3));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  let arrayDadosBRL = [];

  var i;
  for (i = 1; i < 2; i++) {
    const urlCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    const response = await fetch(urlCoingecko);
    const data = await response.json();

    arrayDadosBRL = arrayDadosBRL.concat(data);
  }

  const urlCotacoesFiat = "https://api.hgbrasil.com/finance?key=6fe79203";

  const responseCotacoesFiat = await fetch(urlCotacoesFiat);
  const dataCotacoesFiat = await responseCotacoesFiat.json();

  const cotacoesFiat = dataCotacoesFiat.results.currencies;

  const urlImgMoedaCrypto = `https://api.coinranking.com/v2/search-suggestions?query=ethereum`;

  const responseUrlImgMoedaCrypto = await fetch(urlImgMoedaCrypto);
  const dataUrlImgMoedaCrypto = await responseUrlImgMoedaCrypto.json();

  const stringImgMoedaCrypto = dataUrlImgMoedaCrypto.data.coins[0].iconUrl;

  return {
    props: {
      qualEhACrypto: id,
      propriedades: arrayDadosBRL,
      cotacoesFiat: cotacoesFiat,
      stringImgMoedaCrypto,
    },
    revalidate: 10000,
  };
};
