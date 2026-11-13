'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('https://ifro.edu.br')
      .then((res) => res.json())
      .then((dados) => {
        setCategorias(Array.isArray(dados) ? dados : dados.data || []);
      })
      .catch((err) => console.error('Erro ao buscar categorias:', err))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div>
      <h1 className={styles.titulo}>Categorias</h1>

      {carregando ? (
        <p>Carregando categorias...</p>
      ) : (
        <div className={styles.grid}>
          {categorias.map((cat) => (
            <div key={cat.id} className={styles.card}>
              <h2>{cat.nome}</h2>
              {cat.descricao && <p>{cat.descricao}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
