import Link from "next/link";
import Grafico from "../components/grafico";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/sobre">
        <a>Ir para Sobre</a>
      </Link>
      <Grafico />
    </>
  );
}
