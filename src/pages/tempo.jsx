function Tempo(props) {
  const dynamicDate = new Date();
  const dynamicDateString = dynamicDate.toGMTString();

  return (
    <div>
      {dynamicDateString} (dinâmico)
      <p />
      {props.staticDateString} (estático)
    </div>
  );
}

export async function getStaticProps() {
  const staticDate = new Date();
  const staticDateString = staticDate.toGMTString();

  return {
    props: {
      staticDateString,
    },
    revalidate: 10,
  };
}

export default Tempo;
