import styles from "./page.module.css";

export const metadata = {
  title: "Personagens | O Rei Leão",
};

const personagens = [
  {
    nome: "Simba",
    cor: "#eaa22f",
    descricao:
      "O jovem príncipe leão, filho de Mufasa. Sua jornada de exílio e amadurecimento é o coração da história.",
  },
  {
    nome: "Mufasa",
    cor: "#e07b2e",
    descricao:
      "O sábio e poderoso rei das Terras do Reino, pai de Simba e símbolo de liderança e responsabilidade.",
  },
  {
    nome: "Scar",
    cor: "#a985c9",
    descricao:
      "Irmão invejoso de Mufasa. Seu desejo pelo trono desencadeia a tragédia que muda o destino de Simba.",
  },
  {
    nome: "Nala",
    cor: "#e8d2a2",
    descricao:
      "Amiga de infância de Simba, corajosa e determinada, que o reencontra e o incentiva a retornar ao reino.",
  },
  {
    nome: "Timão",
    cor: "#86b36c",
    descricao:
      'Suricato bem-humorado que resgata Simba e o apresenta à filosofia despreocupada do "Hakuna Matata".',
  },
  {
    nome: "Pumba",
    cor: "#d98f7a",
    descricao:
      "Javali de bom coração e melhor amigo de Timão, leal companheiro de Simba durante seu exílio.",
  },
];

export default function Personagens() {
  return (
    <main className={styles.pagina}>
      <header className={styles.topo}>
        <h1>Os Habitantes das Terras do Reino</h1>
        <p>
          Conheça os principais personagens que dão vida à história de Simba e
          ao Ciclo da Vida nas savanas africanas.
        </p>
      </header>

      <div className={styles.grade}>
        {personagens.map((p) => (
          <article
            key={p.nome}
            className={styles.personagem}
            style={{ "--cor": p.cor }}
          >
            <h2>{p.nome}</h2>
            <p>{p.descricao}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
