import Grafico from "../components/Grafico";

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

export default function Home({ propriedades, cotacoesFiat }) {
  const valorUSD = cotacoesFiat.USD.buy;
  const valorEUR = cotacoesFiat.EUR.buy;

  const [selectMoedaFiat, setSelectMoedaFiat] = useState("BRL");
  const [moedaCrypto, setMoedaCrypto] = useState(1);
  const [moedaFiat, setMoedaFiat] = useState(propriedades[1].current_price);

  useEffect(() => {
    setMoedaFiat(propriedades[1].current_price);
  }, [propriedades]);

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
      const num = (moedaCrypto * propriedades[1].current_price) / valorUSD;
      setMoedaFiat(num);
    } else if (e.value.toUpperCase() === "EUR") {
      const num = (moedaCrypto * propriedades[1].current_price) / valorEUR;
      setMoedaFiat(num);
    } else {
      const num = moedaCrypto * propriedades[1].current_price;
      setMoedaFiat(num);
    }
  };

  const handleChangeValorMoedaCrypto = (e) => {
    setMoedaCrypto(e.target.value);

    if (selectMoedaFiat === "USD") {
      const num = (propriedades[1].current_price * e.target.value) / valorUSD;
      setMoedaFiat(num);
    } else if (selectMoedaFiat === "EUR") {
      const num = (propriedades[1].current_price * e.target.value) / valorEUR;
      setMoedaFiat(num);
    } else {
      const num = propriedades[1].current_price * e.target.value;
      setMoedaFiat(num);
    }
  };

  const handleChangeValorMoedaFiat = (e) => {
    setMoedaFiat(e.target.value);

    if (selectMoedaFiat === "USD") {
      const num = e.target.value / propriedades[1].current_price / valorUSD;
      setMoedaCrypto(num);
    } else if (selectMoedaFiat === "EUR") {
      const num = e.target.value / propriedades[1].current_price / valorEUR;
      setMoedaCrypto(num);
    } else {
      const num = e.target.value / propriedades[1].current_price;
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
        <Link
          href={`${selectMoedaFiat}/[id]`}
          as={`${selectMoedaFiat}/${moeda.symbol.toUpperCase()}`}
        >
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
      <h1>eae {propriedades[0].symbol}</h1>

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
                placeholder={propriedades[1].name}
                style={{ width: "100%", maxWidth: "100%", borderRadius: 0 }}
              />
              <i aria-hidden="true" className="dollar icon"></i>
            </div>

            <Select
              instanceId="0"
              defaultValue={options[1]}
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
              defaultValue={options2[0]}
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

      <Grafico
        simbolo={`${propriedades[0].symbol.toUpperCase()}${selectMoedaFiat}`}
      />
    </div>
  );
}

export const getStaticProps = async () => {
  let arrayDadosBRL = [];

  var i;
  for (i = 1; i < 2; i++) {
    const urlCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    const response = await fetch(urlCoingecko);
    const data = await response.json();

    arrayDadosBRL = arrayDadosBRL.concat(data);
  }

  const urlCotacoesFiat = "https://api.hgbrasil.com/finance?key=608dcb04";

  const responseCotacoesFiat = await fetch(urlCotacoesFiat);
  const dataCotacoesFiat = await responseCotacoesFiat.json();

  const cotacoesFiat = dataCotacoesFiat.results.currencies;

  const urlImgMoedaCrypto = `https://api.coinranking.com/v2/search-suggestions?query=ethereum`;

  const responseUrlImgMoedaCrypto = await fetch(urlImgMoedaCrypto);
  const dataUrlImgMoedaCrypto = await responseUrlImgMoedaCrypto.json();

  return {
    props: {
      propriedades: arrayDadosBRL,
      cotacoesFiat: cotacoesFiat,
    },
    revalidate: 10000,
  };
};
