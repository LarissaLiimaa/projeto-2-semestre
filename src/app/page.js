import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        <Image
          src="/imgSite2Semestre.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImg}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1>O Rei Leão</h1>
          <p>Acompanhe a jornada de Simba rumo ao Trono Real</p>

          <div className={styles.acoes}>
            <Link href="/personagens" className={styles.botaoPrimario}>
              Conhecer os personagens
            </Link>
            <Link href="/trilhaSonora" className={styles.botaoSecundario}>
              Ouvir a trilha sonora
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.conteudo}>
        <section className={styles.bloco}>
          <h2>A Obra-Prima da Disney</h2>
          <p>
            Lançado originalmente em 1994, <strong>O Rei Leão</strong> tornou-se
            um dos maiores fenômenos da cultura pop mundial e a maior bilheteria
            de animação tradicional da história do cinema. O filme mistura
            drama, comédia e lições profundas sobre amadurecimento e
            responsabilidade social.
          </p>
        </section>

        <section className={styles.bloco}>
          <h2>A Trama e Inspirações</h2>
          <p>
            Fortemente inspirada na tragédia literária <em>Hamlet</em>, de
            William Shakespeare, a narrativa acompanha o jovem leão Simba. Após
            sofrer uma grande perda arquitetada por seu tio invejoso, o filhote
            foge do reino. Ele cresce no exílio sob a filosofia livre e sem
            preocupações do “Hakuna Matata”, até que o passado o convoca a
            retornar e restaurar o equilíbrio do Ciclo da Vida.
          </p>
        </section>

        <section className={styles.bloco}>
          <h2>Legado e Prêmios</h2>
          <p>
            Além de aclamação crítica universal, o filme conquistou dois prêmios
            Oscar (Melhor Trilha Sonora e Melhor Canção Original). Seu impacto
            estendeu-se para além das telas, gerando o musical mais lucrativo
            da Broadway e uma grandiosa versão em computação gráfica lançada em
            2019.
          </p>
        </section>
      </div>

      <section className={styles.atalhos}>
        <Link href="/personagens" className={styles.atalho}>
          <h2>Personagens</h2>
          <p>Simba, Mufasa, Scar, Nala, Timão e Pumba.</p>
        </Link>

        <Link href="/trilhaSonora" className={styles.atalho}>
          <h2>Trilha Sonora</h2>
          <p>As canções de Elton John e Tim Rice e a música de Hans Zimmer.</p>
        </Link>
      </section>
    </main>
  );
}
