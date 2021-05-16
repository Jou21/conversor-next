export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
      {
        params: {
          id: "2",
        },
      },
    ],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  //await delay(5000);
  const id = context.params.id;

  return {
    props: {
      id: id,
    },
  };
}

function Moedas(props) {
  return <div>Id do produto: {props.id}</div>;
}

export default Moedas;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
