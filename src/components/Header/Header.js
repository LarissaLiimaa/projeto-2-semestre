'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className={styles.header}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo} onClick={fecharMenu}>
          Lima
        </Link>

        <button
          className={styles.menuBtn}
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          {menuAberto ? '✕ Fechar' : '☰ Menu'}
        </button>

        <ul className={`${styles.navLinks} ${menuAberto ? styles.navLinksAberto : ''}`}>
          <li>
            <Link href="/" onClick={fecharMenu}>Home</Link>
          </li>
          <li>
            <Link href="/categorias" onClick={fecharMenu}>Categorias</Link>
          </li>
          <li>
            <Link href="/produtos" onClick={fecharMenu}>Produtos</Link>
          </li>
          <li>
            <Link href="/clientes" onClick={fecharMenu}>Clientes</Link>
          </li>
          <li>
            <Link href="/pedidos" onClick={fecharMenu}>Listar Pedidos</Link>
          </li>
          <li>
            <Link href="/pedidos/novo" onClick={fecharMenu}>Criar Pedido</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
