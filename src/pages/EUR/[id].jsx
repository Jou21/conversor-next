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
  precoDaMoedaCrypto,
  propriedadesMoedaCryptoAtual,
  indexOptions,
}) {
  const valorUSD = cotacoesFiat.USD.buy;
  const valorEUR = cotacoesFiat.EUR.buy;

  const [selectMoedaFiat, setSelectMoedaFiat] = useState("EUR");
  const [moedaCrypto, setMoedaCrypto] = useState(1);
  const [moedaFiat, setMoedaFiat] = useState(precoDaMoedaCrypto / valorEUR);

  useEffect(() => {
    setMoedaFiat(precoDaMoedaCrypto / valorEUR);
  }, [precoDaMoedaCrypto]);

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
        <Link
          href={`../${selectMoedaFiat}/[id]`}
          as={`../${selectMoedaFiat}/${moeda.symbol.toUpperCase()}`}
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

  var i;
  for (i = 1; i < 2; i++) {
    const urlCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=5&page=${i}&sparkline=false`;

    const response = await fetch(urlCoingecko);
    const data = await response.json();

    arrayDados = arrayDados.concat(data);
  }

  let paths1 = arrayDados.map((moeda) => {
    return { params: { id: `${moeda.symbol.toUpperCase()}BRL` } };
  });

  const paths = paths1;

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

  const urlCotacoesFiat = "https://api.hgbrasil.com/finance?key=608dcb04";

  const responseCotacoesFiat = await fetch(urlCotacoesFiat);
  const dataCotacoesFiat = await responseCotacoesFiat.json();

  const cotacoesFiat = dataCotacoesFiat.results.currencies;

  const urlImgMoedaCrypto = `https://api.coinranking.com/v2/search-suggestions?query=ethereum`;

  const responseUrlImgMoedaCrypto = await fetch(urlImgMoedaCrypto);
  const dataUrlImgMoedaCrypto = await responseUrlImgMoedaCrypto.json();

  let precoDaMoedaCrypto = "0";
  let propriedadesMoedaCryptoAtual = [];
  let indexOptions = 0;

  arrayDadosBRL.map((moeda, index) => {
    if (id == moeda.symbol.toUpperCase()) {
      indexOptions = index;
      propriedadesMoedaCryptoAtual = moeda;
      precoDaMoedaCrypto = moeda.current_price;
    }
  });

  return {
    props: {
      qualEhACrypto: id,
      propriedades: arrayDadosBRL,
      cotacoesFiat: cotacoesFiat,
      precoDaMoedaCrypto,
      propriedadesMoedaCryptoAtual,
      indexOptions,
    },
    revalidate: 10000,
  };
};
