async function todosOsPares(req, res) {
  var arrayDados = [];

  var array1 = [];
  var array2 = [];

  /*  var i;
  for (i = 1; i < 2; i++) {
    const urlImagensCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    const responseUrlImagensCoingecko = await fetch(urlImagensCoingecko);
    const dataImagensCoingecko = await responseUrlImagensCoingecko.json();

    dataImagensCoingecko.map((moeda) => {
      //array1.push(moeda)
      moeda["parDeMoeda"] = `${moeda.symbol.toUpperCase()}USD`;
    });

    const urlImagensCoingecko2 = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    const responseUrlImagensCoingecko2 = await fetch(urlImagensCoingecko2);
    const dataImagensCoingecko2 = await responseUrlImagensCoingecko2.json();

    dataImagensCoingecko2.map((moeda) => {
      //array1.push(moeda)
      moeda["parDeMoeda"] = `${moeda.symbol.toUpperCase()}BRL`;
    });

    arrayDados = arrayDados
      .concat(dataImagensCoingecko)
      .concat(dataImagensCoingecko2);
  } */

  res.setHeader("Cache-Control", "s-maxage=10000, stale-while-revalidate");

  res.json({
    date: arrayDados,
  });
}

export default todosOsPares;
