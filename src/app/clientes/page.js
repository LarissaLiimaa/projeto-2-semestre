'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('https://ifro.edu.br')
      .then((res) => res.json())
      .then((dados) => {
        setClientes(Array.isArray(dados) ? dados : dados.data || []);
      })
      .catch((err) => console.error('Erro ao buscar clientes:', err))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div>
      <h1 className={styles.titulo}>Clientes Cadastrados</h1>

      {carregando ? (
        <p>Carregando clientes...</p>
      ) : (
        <div className={styles.grid}>
          {clientes.map((cli) => (
            <div key={cli.id} className={styles.card}>
              <h2>{cli.nome}</h2>
              {cli.email && <p className={styles.detalhe}><strong>Email:</strong> {cli.email}</p>}
              {cli.telefone && <p className={styles.detalhe}><strong>Telefone:</strong> {cli.telefone}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
