async function tempo(req, res) {
  const apiSecret = process.env.COINMARKETCAP_API_SECRET;
  const chaveTesteApi = process.env.COINMARKETCAP_CHAVE_TESTE;
  const dynamicDate = new Date();
  const dynamicDateString = dynamicDate.toGMTString();

  const query = "start=1&limit=5000&convert=USD";

  const data = await fetch(
    //`https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=${apiSecret}`
    `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?${query}&CMC_PRO_API_KEY=${chaveTesteApi}`
  );
  const dataJson = await data.json();

  res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

  res.json({
    date: dynamicDateString,
    //inscritos: dataJson,
  });
}

export default tempo;
