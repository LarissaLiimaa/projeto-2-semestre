'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Categorias() {
  const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('https://ifro.edu.br');
        if (!response.ok) {
          throw new Error(`Erro ao buscar Categorias: ${response.statusText}`);
        }
        const data = await response.json();
        setCategorias(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchCategorias();
  }, []);

  return (
    <div>
      <h1 className={styles.titulo}>Categorias</h1>

      {categorias === null ? (
        <p>Carregando categorias...</p>
      ) : (
        <div className={styles.grid}>
          {categorias.map((cat) => (
            <div key={cat.id} className={styles.card}>
              <h2>{cat.nome}</h2>
              <p>ID: #{cat.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
