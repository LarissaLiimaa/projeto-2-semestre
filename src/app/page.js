import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div>
      <div className={styles.banner}>
        <h1>Sistema de Controle de Estoque</h1>
        <p>Projeto desenvolvido para a disciplina de Front-End II (4º Bimestre).</p>

        <h2 className={styles.Titulo}>Integrante</h2>
        <ul className={styles.integrante}>
          <li>Larissa Lima</li>
        </ul>
      </div>

      <div className={styles.gridAtalhos}>
        <div className={styles.cardAtalho}>
          <div>
            <h2>Pedidos</h2>
            <p>Consulte os pedidos realizados no sistema.</p>
          </div>
          <Link href="/pedidos" className="btn">Ver Pedidos</Link>
        </div>

        <div className={styles.cardAtalho}>
          <div>
            <h2>Novo Pedido</h2>
            <p>Cadastre um pedido selecionando cliente e produtos.</p>
          </div>
          <Link href="/pedidos/novo" className="btn">Criar Pedido</Link>
        </div>

        <div className={styles.cardAtalho}>
          <div>
            <h2>Produtos</h2>
            <p>Confira os produtos e quantidades em estoque.</p>
          </div>
          <Link href="/produtos" className="btn">Ver Produtos</Link>
        </div>
      </div>
    </div>
  );
}
