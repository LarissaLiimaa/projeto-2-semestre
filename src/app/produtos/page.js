'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('https://ifro.edu.br')
      .then((res) => res.json())
      .then((dados) => {
        setProdutos(Array.isArray(dados) ? dados : dados.data || []);
      })
      .catch((err) => console.error('Erro ao buscar produtos:', err))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div>
      <h1 className={styles.titulo}>Produtos em Estoque</h1>

      {carregando ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className={styles.grid}>
          {produtos.map((prod) => (
            <div key={prod.id} className={styles.card}>
              <h2>{prod.nome}</h2>
              {prod.preco !== undefined && (
                <p className={styles.info}>
                  <strong>Preço:</strong> R$ {Number(prod.preco).toFixed(2)}
                </p>
              )}
              {prod.estoque !== undefined && (
                <span className={styles.estoque}>Estoque: {prod.estoque} un.</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
