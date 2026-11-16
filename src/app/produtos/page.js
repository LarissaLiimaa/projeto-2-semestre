'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

export default function Produtos() {
  const [prods, setProds] = useState(null);
  const [cats, setCats] = useState(null);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const fetchProds = async () => {
      try {
        const response = await fetch('https://ifro.edu.br');
        if (!response.ok) {
          throw new Error(`Erro ao buscar Produtos: ${response.statusText}`);
        }
        const data = await response.json();
        setProds(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchProds();
  }, []);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch('https://ifro.edu.br');
        if (!response.ok) {
          throw new Error(`Erro ao buscar Categorias: ${response.statusText}`);
        }
        const data = await response.json();
        setCats(data);
      } catch (e) {
        console.error(e.message);
      }
    };
    fetchCats();
  }, []);

  const getNomeCategoria = (id_categoria) => {
    const categoria = cats?.find((cat) => cat.id === id_categoria);
    return categoria ? categoria.nome : 'Sem categoria';
  };

  const produtosFiltrados = prods?.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <h1 className={styles.titulo}>Produtos em Estoque</h1>

      <input
        type="text"
        placeholder="Busque um produto pelo nome..."
        className={styles.campoBusca}
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {prods === null ? (
        <p>Carregando lista de produtos...</p>
      ) : (
        <div className={styles.grid}>
          {produtosFiltrados.map((prod) => (
            <div key={prod.id} className={styles.card}>
              <span className={styles.badgeCategoria}>
                {getNomeCategoria(prod.categoria_id)}
              </span>
              <h2>{prod.nome}</h2>
              {prod.descricao && <p className={styles.descricao}>{prod.descricao}</p>}
              <p className={styles.preco}>
                <strong>Preço:</strong> R$ {Number(prod.preco).toFixed(2)}
              </p>
              <span className={styles.estoque}>
                Estoque: {prod.quantidade_estoque} un.
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
