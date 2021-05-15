async function tempo(req, res) {
  const apiSecret = process.env.COINMARKETCAP_API_SECRET;
  const dynamicDate = new Date();
  const dynamicDateString = dynamicDate.toGMTString();

  const data = await fetch(
    `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=${apiSecret}`
  );
  const dataJson = await data.json();

  res.json({
    date: dynamicDateString,
    inscritos: dataJson,
  });
}

export default tempo;
