async function paresBRL(req, res) {
  var arrayDados = [];

  var i;
  for (i = 1; i < 2; i++) {
    const urlImagensCoingecko = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=250&page=${i}&sparkline=false`;

    /* const responseUrlImagensCoingecko = await fetch(urlImagensCoingecko);
    const dataImagensCoingecko = await responseUrlImagensCoingecko.json(); */

    let data = [];
    let error = "";
    let paths = [];

    try {
      const res = await fetch(urlImagensCoingecko, {
        method: "GET",
        headers: {
          // update with your user-agent
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
          Accept: "application/json; charset=UTF-8",
        },
      });

      data = await res.json();
      arrayDados = arrayDados.concat(data);
    } catch (e) {
      error = e.toString();
    }

    //arrayDados = arrayDados.concat(dataImagensCoingecko);
  }

  res.setHeader("Cache-Control", "s-maxage=10000, stale-while-revalidate");

  res.json({
    date: arrayDados,
  });
}

export default paresBRL;
