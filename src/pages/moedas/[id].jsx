import Grafico from "../../components/Grafico";

export default function Moeda({ parDeMoeda }) {
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
  const paths = [
    {
      params: { id: "ETHBRL" },
    },
  ];

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
