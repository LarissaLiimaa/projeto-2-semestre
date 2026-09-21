import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.marca}>O Rei Leão</p>

        <nav aria-label="Rodapé">
          <ul className={styles.links}>
            <li>
              <Link href="/">Início</Link>
            </li>
            <li>
              <Link href="/personagens">Personagens</Link>
            </li>
            <li>
              <Link href="/trilhaSonora">Trilha Sonora</Link>
            </li>
          </ul>
        </nav>

        <p className={styles.texto}>
          &copy; 2026 - Site tributo a <span>O Rei Leão</span>
        </p>
        <p className={styles.texto}>
          Atividade acadêmica - Desenvolvimento Front-End
        </p>
      </div>
    </footer>
  );
}
