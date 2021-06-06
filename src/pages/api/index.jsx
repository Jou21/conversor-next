async function api(req, res) {
  var arrayDados = [];

  var i;
  for (i = 1; i < 35; i++) {
    const urlImagensCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    const responseUrlImagensCoingecko = await fetch(urlImagensCoingecko);
    const dataImagensCoingecko = await responseUrlImagensCoingecko.json();

    arrayDados = arrayDados.concat(dataImagensCoingecko);
  }

  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

  res.json({
    date: arrayDados,
  });
}

export default api;
