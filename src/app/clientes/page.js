'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Clientes() {
  const [clientes, setClientes] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('https://ifro.edu.br');
        if (!response.ok) {
          throw new Error(`Erro ao buscar Clientes: ${response.statusText}`);
        }
        const data = await response.json();
        setClientes(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div>
      <h1 className={styles.titulo}>Clientes Cadastrados</h1>

      {clientes === null ? (
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
