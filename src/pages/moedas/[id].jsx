import { useRouter } from "next/router";

export default function Moeda({ parDeMoeda }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>
        {parDeMoeda.symbol} ≅ {parDeMoeda.price}
      </h1>
    </div>
  );
}

export const getStaticPaths = async () => {
  const response = await fetch(`https://api.binance.com/api/v3/exchangeInfo`);
  const data = await response.json();

  const paths = data["symbols"].map((moeda) => {
    return { params: { id: moeda.symbol } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  const response = await fetch(
    `https://api.binance.com/api/v3/ticker/price?symbol=${id}`
  );
  const data = await response.json();

  return {
    props: {
      parDeMoeda: data,
    },
    revalidate: 10,
  };
};
