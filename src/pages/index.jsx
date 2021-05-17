import Link from "next/link";
import Grafico from "../components/grafico";

export default function Home({ propriedades }) {
  return (
    <div>
      <h1>Cotação ETH {propriedades.price}</h1>
    </div>
  );
}

export const getStaticProps = async () => {
  let urlBinance = "https://api.binance.com/api/v3/ticker/price?symbol=ETHBRL";

  const response = await fetch(urlBinance);
  const data = await response.json();

  /* const response = await fetch(urlBinance)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const temp2 = json['price'];
      const temp = parseFloat(temp2);
      const temp3 = temp.toFixed(2);
      this.moedaB_value = temp3;
      this.moedaA_value = "1";
      this.cotacaoEthComMask = temp3.replace(".",",");
      this.cotacaoBinance = temp3.replace(".",",");
    }); */

  return {
    props: {
      propriedades: data,
    },
    revalidate: 10,
  };
};
