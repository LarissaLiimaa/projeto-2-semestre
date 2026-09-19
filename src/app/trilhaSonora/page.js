import styles from "./page.module.css";

export const metadata = {
  title: "Trilha Sonora | O Rei Leão",
};

const faixas = [
  {
    titulo: "O Ciclo Sem Fim (Circle of Life)",
    texto: "A música de abertura que dita o tom espiritual e imponente do filme.",
  },
  {
    titulo: "O Que Eu Quero Mais É Ser Rei",
    texto: "Uma canção divertida e colorida sobre a infância de Simba.",
  },
  {
    titulo: "Se Preparem (Be Prepared)",
    texto: "O tema sombrio e teatral do vilão Scar.",
  },
  {
    titulo: "Hakuna Matata",
    texto: "O hino da filosofia de vida descontraída de Timão e Pumba.",
  },
  {
    titulo: "Nesta Noite o Amor Chegou",
    texto: "A balada romântica que venceu o Oscar de Melhor Canção Original.",
  },
];

export default function TrilhaSonora() {
  return (
    <main className={styles.pagina}>
      <section className={styles.topo}>
        <h1>As Músicas das Terras do Reino</h1>
        <p>
          A trilha sonora de <strong>O Rei Leão</strong> é uma das mais
          icônicas e premiadas da história do cinema mundial. Lançada em 1994,
          ela combina perfeitamente o pop sofisticado com os ritmos
          tradicionais e corais do continente africano.
        </p>
      </section>

      <section className={styles.secao}>
        <h2>Gênios por Trás das Canções</h2>
        <div className={styles.autores}>
          <div className={styles.autor}>
            <h3>Elton John e Tim Rice</h3>
            <p>
              As músicas foram criadas por uma parceria de peso entre o
              compositor e cantor britânico <strong>Elton John</strong> e o
              letrista <strong>Tim Rice</strong>.
            </p>
          </div>
          <div className={styles.autor}>
            <h3>Hans Zimmer</h3>
            <p>
              A parte instrumental e as canções de fundo do filme ficaram sob a
              responsabilidade do maestro <strong>Hans Zimmer</strong>, que
              trouxe arranjos épicos e emocionantes para a animação.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.secao}>
        <h2>Faixas Inesquecíveis</h2>
        <p className={styles.intro}>
          O filme conta com clássicos que atravessam gerações, como:
        </p>
        <ul className={styles.faixas}>
          {faixas.map((f) => (
            <li key={f.titulo} className={styles.faixa}>
              <h3>{f.titulo}</h3>
              <p>{f.texto}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
