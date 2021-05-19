import { useRouter } from "next/router";
import Grafico from "../../components/Grafico";

export default function Moeda({ parDeMoeda }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        {parDeMoeda} ≅ {parDeMoeda}
      </h1>
      <Grafico simbolo={parDeMoeda} />
    </div>
  );
}

export const getStaticPaths = async () => {
  const urlCoingecko = "http://localhost:3000/api/todosOsPares/";

  const response = await fetch(urlCoingecko);
  const data = await response.json();

  const paths = data["date"].map((moeda) => {
    return { params: { id: moeda.parDeMoeda } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  return {
    props: {
      parDeMoeda: id,
    },
    revalidate: 10000,
  };
};
