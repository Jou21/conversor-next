async function api(req, res) {
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

  //const stringImgEUR = "https://cdn.coinranking.com/fz3P5lsJY/eur.svg"

  //Usar para buscar imagem caso mudem a api
  /* 
  const urlImgMoedaFiat = `https://api.coinranking.com/v2/reference-currencies`;
  const responseUrlImgMoedaFiat = await fetch(urlImgMoedaFiat);
  const dataUrlImgMoedaFiat = await responseUrlImgMoedaFiat.json();

  const stringImgMoedaFiat = dataUrlImgMoedaFiat;

  console.log(stringImgMoedaFiat);
  */

  res.setHeader("Cache-Control", "s-maxage=10000, stale-while-revalidate");

  res.json({
    propriedades: arrayDadosBRL,
    cotacoesFiat: cotacoesFiat,
    stringImgMoedaCrypto,
  });
}

export default api;
