import axios from "axios";

async function moedas(req, res) {
  var arrayDados = [];
  var i;
  for (i = 1; i < 25; i++) {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`
    );
    const data = await response.data;
    arrayDados = arrayDados.concat(data);
  }
  /* const response = await axios.get(
    "https://api.tvmaze.com/search/shows?q=batman"
  );
  const data = await response.data; */

  /* var i;
  for (i = 1; i < 3; i++) {
    const urlImagensCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    const responseUrlImagensCoingecko = await fetch(urlImagensCoingecko);
    const dataImagensCoingecko = await responseUrlImagensCoingecko.json();

    arrayDados = arrayDados.concat(dataImagensCoingecko);
  } */

  res.setHeader("Cache-Control", "s-maxage=10000, stale-while-revalidate");

  res.json({
    data: arrayDados,
  });
}

export default moedas;
