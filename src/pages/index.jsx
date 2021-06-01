import Grafico from "../components/Grafico";

import Select from "react-select";

import Link from "next/link";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { FaExchangeAlt } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";

import styles from "../styles.module.css";

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
  const valorUSD = cotacoesFiat.USDBRL.ask;
  const valorEUR = cotacoesFiat.EURBRL.ask;

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
        <div style={{ fontSize: "20px", marginTop: "3px", marginLeft: "12px" }}>
          &nbsp;&nbsp;
          <img
            src="/brl.svg"
            height="50px"
            width="50px"
            style={{ marginTop: "-3px" }}
          />{" "}
          &nbsp;
          {"BRL"}
        </div>
      ),
      labelSemLink: (
        <div style={{ fontSize: "20px", marginTop: "3px", marginLeft: "22px" }}>
          &nbsp;&nbsp;
          <img
            src="/brl.svg"
            height="50px"
            width="50px"
            style={{ marginTop: "-3px" }}
          />{" "}
          &nbsp;
          {"BRL"}
        </div>
      ),
    },
    {
      value: "USD",
      label: (
        <div style={{ fontSize: "20px", marginTop: "3px", marginLeft: "12px" }}>
          &nbsp;&nbsp;
          <img
            src="/usd.svg"
            height="50px"
            width="50px"
            style={{ marginTop: "-3px" }}
          />{" "}
          &nbsp;
          {"USD"}
        </div>
      ),
      labelSemLink: (
        <div style={{ fontSize: "20px", marginTop: "3px", marginLeft: "22px" }}>
          &nbsp;&nbsp;
          <img
            src="/usd.svg"
            height="50px"
            width="50px"
            style={{ marginTop: "-3px" }}
          />{" "}
          &nbsp;
          {"USD"}
        </div>
      ),
    },
    {
      value: "EUR",
      label: (
        <div style={{ fontSize: "20px", marginTop: "3px", marginLeft: "12px" }}>
          &nbsp;&nbsp;
          <img
            src="/eur.svg"
            height="50px"
            width="50px"
            style={{ marginTop: "-3px" }}
          />{" "}
          &nbsp;
          {"EUR"}
        </div>
      ),
      labelSemLink: (
        <div style={{ fontSize: "20px", marginTop: "3px", marginLeft: "22px" }}>
          &nbsp;&nbsp;
          <img
            src="/eur.svg"
            height="50px"
            width="50px"
            style={{ marginTop: "-3px" }}
          />{" "}
          &nbsp;
          {"EUR"}
        </div>
      ),
    },
  ];

  const handleChangeSelectMoedaCrypto = (e) => {
    console.log("FUNCIONOU", e.symbol);
    window.location.replace(`../${selectMoedaFiat}/${e.symbol.toUpperCase()}`);
  };

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
      height: 90,
      minHeight: 90,
      width: "100%",
      borderRadius: 0,
      paddingLeft: "1px",
      textAlign: "right",
      fontSize: "30px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "70px",
      paddingLeft: "1px",

      width: "100%",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      width: "100%",
      paddingLeft: "1px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "90px",
      width: "83px",
      paddingLeft: "1px",
    }),
  };

  propriedades.map((moeda, index) => {
    let imagem;
    if (moeda.symbol.toUpperCase() == "BTC") {
      imagem = (
        <img
          src="/BTC.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "ETH") {
      imagem = (
        <img
          src="/ETH.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "USDT") {
      imagem = (
        <img
          src="/USDT.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "ADA") {
      imagem = (
        <img
          src="/ADA.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "BNB") {
      imagem = (
        <img
          src="/BNB.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "XRP") {
      imagem = (
        <img
          src="/XRP.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (moeda.symbol.toUpperCase() == "DOGE") {
      imagem = (
        <img
          src="/DOGE.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "USDC") {
      imagem = (
        <img
          src="/USDC.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "DOT") {
      imagem = (
        <img
          src="/DOT.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "UNI") {
      imagem = (
        <img
          src="/UNI.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "BCH") {
      imagem = (
        <img
          src="/BCH.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (moeda.symbol.toUpperCase() == "LINK") {
      imagem = (
        <img
          src="/LINK.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "LTC") {
      imagem = (
        <img
          src="/LTC.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "XLM") {
      imagem = (
        <img
          src="/XLM.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "ETC") {
      imagem = (
        <img
          src="/ETC.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "SOL") {
      imagem = (
        <img
          src="/SOL.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "BUSD") {
      imagem = (
        <img
          src="/BUSD.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "VET") {
      imagem = (
        <img
          src="/VET.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "WBTC") {
      imagem = (
        <img
          src="/WBTC.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "THETA") {
      imagem = (
        <img
          src="/THETA.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "EOS") {
      imagem = (
        <img
          src="/EOS.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "TRX") {
      imagem = (
        <img
          src="/TRX.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else if (`${moeda.symbol}`.toUpperCase() == "FIL") {
      imagem = (
        <img
          src="/FIL.svg"
          height="50px"
          width="50px"
          style={{ marginTop: "-3px" }}
        />
      );
    } else {
      imagem = (
        <img
          src={`${moeda.image}`.replace("large", "small")}
          style={{ marginTop: "-3px" }}
        />
      );
    }

    const array = {
      value: moeda.name,
      label: (
        <Link
          href={`${selectMoedaFiat}/[id]`}
          as={`${selectMoedaFiat}/${moeda.symbol.toUpperCase()}`}
        >
          <div
            style={{ fontSize: "20px", marginTop: "3px", marginLeft: "20px" }}
          >
            &nbsp;&nbsp;
            {imagem}
            &nbsp;
            {moeda.name}
          </div>
        </Link>
      ),
      labelSemLink: (
        <div style={{ fontSize: "20px", marginTop: "3px", marginLeft: "30px" }}>
          &nbsp;&nbsp;
          {imagem}
          &nbsp;
          {moeda.name}
        </div>
      ),
      symbol: moeda.symbol,
    };

    options.push(array);
  });

  return (
    <div
      className="container"
      style={{
        maxWidth: "1640px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          paddingBottom: "40px",
          paddingTop: "50px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "lightslategray",
            fontSize: "25px",
          }}
        >
          1{`${propriedades[1].symbol}`.toUpperCase()} ≅{" "}
          {`${moedaFiat.toFixed(2)}`.replace(".", ",")} {selectMoedaFiat}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <img
          src="/ETH.svg"
          style={{ marginTop: "0px", marginBottom: "40px" }}
          height="8%"
          width="8%"
        />
      </div>

      <Segment>
        <Grid columns={2} relaxed="very" stackable verticalAlign="top">
          <Grid.Column>
            <div
              className="ui massive icon input"
              style={{
                width: "100%",
                maxWidth: "100%",
                borderRadius: 0,
              }}
            >
              <input
                value={moedaCrypto}
                className={styles.input}
                onChange={handleChangeValorMoedaCrypto}
                type="number"
                placeholder={propriedades[1].name}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  borderRadius: 0,
                  fontSize: "50px",
                  fontStyle: "italic",
                }}
              />
              <i
                style={{
                  marginLeft: "-90px",
                  marginTop: "40px",
                  color: "gray",
                  fontSize: "50px",
                }}
              >
                <FiDollarSign />
              </i>
            </div>

            <Select
              instanceId="0"
              placeholder={options[1].labelSemLink}
              options={options}
              styles={customStyles}
              onChange={handleChangeSelectMoedaCrypto}
            />
          </Grid.Column>

          <Grid.Column verticalAlign="bottom">
            <div
              className="ui massive icon input"
              style={{ width: "100%", maxWidth: "100%", borderRadius: 0 }}
            >
              <input
                value={moedaFiat}
                className={styles.input}
                onChange={handleChangeValorMoedaFiat}
                type="number"
                placeholder={selectMoedaFiat}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  borderRadius: 0,
                  fontSize: "50px",
                  fontStyle: "italic",
                }}
              />
              <i
                style={{
                  marginLeft: "-90px",
                  marginTop: "40px",
                  color: "gray",
                  fontSize: "50px",
                }}
              >
                <FiDollarSign />
              </i>
            </div>

            <Select
              instanceId="1"
              placeholder={options2[0].labelSemLink}
              options={options2}
              styles={customStyles}
              onChange={handleChangeSelectMoedaFiat}
            />
          </Grid.Column>
        </Grid>

        <Divider vertical hidden>
          <div
            style={{
              marginLeft: "0px",
              marginTop: "-16px",
              fontSize: "30px",
              color: "gray",
            }}
          >
            <FaExchangeAlt />
          </div>
        </Divider>
      </Segment>

      <div style={{ marginTop: "500px" }}>
        <Grafico
          simbolo={`${propriedades[0].symbol.toUpperCase()}${selectMoedaFiat}`}
        />
      </div>
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

  const urlCotacoesFiat =
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL";

  const responseCotacoesFiat = await fetch(urlCotacoesFiat);
  const dataCotacoesFiat = await responseCotacoesFiat.json();

  const cotacoesFiat = dataCotacoesFiat;

  return {
    props: {
      propriedades: arrayDadosBRL,
      cotacoesFiat: cotacoesFiat,
    },
    revalidate: 10000,
  };
};
