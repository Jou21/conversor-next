import Grafico from "../components/Grafico";

import Select from "react-select";

import Link from "next/link";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { FaExchangeAlt } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";

import styles from "../styles.module.scss";

import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Input,
  Dropdown,
  Icon,
  Header,
} from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
//import axios from "axios";

import content from "../pages/api/frontaid.content.json";
import Parser from "html-react-parser";

export default function Home({ propriedades, cotacoesFiat }) {
  const valorUSD = cotacoesFiat.USDBRL.ask;
  const valorEUR = cotacoesFiat.EURBRL.ask;

  const [selectMoedaFiat, setSelectMoedaFiat] = useState("BRL");
  const [moedaCrypto, setMoedaCrypto] = useState(1);
  const [moedaFiat, setMoedaFiat] = useState(propriedades[1].current_price);

  useEffect(() => {
    setMoedaFiat(propriedades[1].current_price);
  }, [propriedades]);

  function handleScroll() {
    window.scroll({
      top: 1100,
      left: 0,
      behavior: "smooth",
    });
  }

  const options = [];

  const options2 = [
    {
      value: "BRL",
      label: (
        <div style={{ fontSize: "22px", marginTop: "3px", marginLeft: "0px" }}>
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
        <div style={{ fontSize: "22px", marginTop: "3px", marginLeft: "0px" }}>
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
        <div style={{ fontSize: "22px", marginTop: "3px", marginLeft: "0px" }}>
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
    //console.log("FUNCIONOU", e.symbol);
    window.location.replace(`../${selectMoedaFiat}/${e.symbol.toUpperCase()}`);
  };

  const handleChangeSelectMoedaFiat = (e) => {
    setSelectMoedaFiat(e.value.toUpperCase());

    if (e.value.toUpperCase() === "USD") {
      const num = (moedaCrypto * propriedades[1].current_price) / valorUSD;
      setMoedaFiat(num.toFixed(2));
    } else if (e.value.toUpperCase() === "EUR") {
      const num = (moedaCrypto * propriedades[1].current_price) / valorEUR;
      setMoedaFiat(num.toFixed(2));
    } else {
      const num = moedaCrypto * propriedades[1].current_price;
      setMoedaFiat(num.toFixed(2));
    }
  };

  const handleChangeValorMoedaCrypto = (e) => {
    setMoedaCrypto(e.target.value);

    if (selectMoedaFiat === "USD") {
      const num = (propriedades[1].current_price * e.target.value) / valorUSD;
      setMoedaFiat(num.toFixed(2));
    } else if (selectMoedaFiat === "EUR") {
      const num = (propriedades[1].current_price * e.target.value) / valorEUR;
      setMoedaFiat(num.toFixed(2));
    } else {
      const num = propriedades[1].current_price * e.target.value;
      setMoedaFiat(num.toFixed(2));
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
      height: "10vw",
      maxHeight: "100px",
      minHeight: "65px",
      width: "100%",
      borderRadius: 0,
      padding: "0px 0px 0px 10px",
      textAlign: "right",
      fontSize: "30px",
      marginBottom: "3px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "100%",
      padding: "0px",
      width: "100%",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      width: "100%",
      padding: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "100%",
      width: "9.7%",
      padding: "0px",
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
          passHref={true}
          href={`${selectMoedaFiat}/[id]`}
          as={`${selectMoedaFiat}/${moeda.symbol.toUpperCase()}`}
        >
          <div
            style={{
              fontSize: "22px",
              marginTop: "3px",
              marginLeft: "0px",
              padding: "0px",
              position: "absolut",
              zIndex: "10",
            }}
          >
            {imagem}
            &nbsp;
            {moeda.name}
          </div>
        </Link>
      ),
      labelSemLink: (
        <div
          style={{
            fontSize: "22px",
            marginTop: "3px",
            marginLeft: "0px",
            padding: "0px",
            position: "absolut",
            zIndex: "10",
          }}
        >
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
    <div className="container" style={{ maxWidth: "1300px" }}>
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
            fontFamily: "arial",
          }}
        >
          1 {`${propriedades[1].symbol}`.toUpperCase()} ≅{" "}
          {selectMoedaFiat == "BRL"
            ? `${propriedades[1].current_price.toFixed(2)}`.replace(".", ",")
            : selectMoedaFiat == "USD"
            ? `${(propriedades[1].current_price / valorUSD).toFixed(
                2
              )}`.replace(".", ",")
            : `${(propriedades[1].current_price / valorEUR).toFixed(
                2
              )}`.replace(".", ",")}{" "}
          {selectMoedaFiat}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <img
          src="/ETH.svg"
          style={{
            marginTop: "0px",
            marginBottom: "40px",
            minWidth: "100px",
          }}
          height="8%"
          width="8%"
        />
      </div>

      <Segment
        basic
        style={{
          padding: "0px 0px 0px 0px",
          marginLeft: "0px",
          marginRight: "0px",
        }}
      >
        <Grid columns={2} relaxed="very" stackable verticalAlign="top">
          <Grid.Column>
            <div
              className="ui input"
              style={{
                marginTop: "3px",
                width: "100%",
                maxWidth: "100%",
                borderRadius: 0,
              }}
            >
              <input
                value={moedaCrypto}
                className={(styles.ui.icon, styles.input)}
                onChange={handleChangeValorMoedaCrypto}
                type="number"
                placeholder={propriedades[1].name}
                style={{
                  borderRadius: 0,
                  fontFamily: "sans-serif",
                  padding: "14px 42px 14px 19px",
                }}
              />
              <i
                className={styles.tamanho}
                style={{
                  marginInlineStart: "-10%",
                  marginTop: "25px",
                  color: "gray",
                }}
              >
                <FiDollarSign />
              </i>
            </div>
            <Select
              className={styles.frente}
              instanceId="0"
              placeholder={options[1].labelSemLink}
              options={options}
              styles={customStyles}
            />
          </Grid.Column>

          <Grid.Column verticalAlign="bottom">
            <div
              className="ui input"
              style={{
                marginTop: "3px",
                width: "100%",
                maxWidth: "100%",
                borderRadius: 0,
              }}
            >
              <input
                value={moedaFiat}
                className={styles.input}
                onChange={handleChangeValorMoedaFiat}
                type="number"
                placeholder={selectMoedaFiat}
                style={{
                  borderRadius: 0,
                  fontFamily: "sans-serif",
                  padding: "14px 42px 14px 19px",
                }}
              />
              <i
                className={styles.tamanho}
                style={{
                  marginInlineStart: "-10%",
                  marginTop: "25px",
                  color: "gray",
                }}
              >
                <FiDollarSign />
              </i>
            </div>

            <Select
              instanceId="1"
              placeholder={options2[0].label}
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
              marginTop: "-18px",
              fontSize: "33px",
              color: "gray",
              zIndex: "1",
              position: "relative",
            }}
          >
            <FaExchangeAlt />
          </div>
        </Divider>
      </Segment>

      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        <div>
          <button
            onClick={handleScroll}
            style={{ width: "280px" }}
            className={styles.button}
          >
            <span>
              <div style={{ textAlign: "center" }}>
                <img
                  src="/TradingViewBranco.svg"
                  style={{
                    width: "50px",
                    marginTop: "-7px",
                  }}
                  height="8%"
                  width="8%"
                />{" "}
                TradingView
              </div>
            </span>
          </button>
        </div>
      </div>

      <div style={{ marginTop: "250px" }}>
        <Grafico
          simbolo={`${propriedades[1].symbol.toUpperCase()}${selectMoedaFiat}`}
        />

        <>{Parser(content.pages[3].description.brl)}</>
      </div>
      <div style={{ height: "60px" }}></div>
    </div>
  );
}

export const getStaticProps = async () => {
  let arrayDadosBRL = [];
  /* const URL = process.env.URL;

  const response = await axios.get(`${URL}/api/moedas`);
  const data = await response.data;
  console.log(data.data[1]);
  arrayDadosBRL = arrayDadosBRL.concat(data.data); */

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
