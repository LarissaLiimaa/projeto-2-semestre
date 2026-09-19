"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const links = [
  { href: "/", label: "Início" },
  { href: "/personagens", label: "Personagens" },
  { href: "/trilhaSonora", label: "Trilha Sonora" },
];

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
          onClick={() => setAberto(false)}
        >
          O Rei Leão
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto(!aberto)}
        >
          <span className={`${styles.bar} ${aberto ? styles.barAberta : ""}`} />
        </button>

        <nav
          id="menu-principal"
          aria-label="Principal"
          className={`${styles.nav} ${aberto ? styles.navAberto : ""}`}
        >
          <ul>
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${
                    pathname === item.href ? styles.ativo : ""
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setAberto(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
