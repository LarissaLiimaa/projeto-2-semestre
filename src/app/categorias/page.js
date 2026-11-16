"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const resposta = await fetch("https://ifro.edu.br");
        if (!resposta.ok) {
          throw new Error("Erro ao buscar categorias");
        }
        const dados = await resposta.json();
        setCategorias(Array.isArray(dados) ? dados : dados.data || []);
      } catch (e) {
        console.log(e.message);
        setErro("Não foi possível carregar as categorias.");
      } finally {
        setCarregando(false);
      }
    }

    carregarCategorias();
  }, []);

  return (
    <div>
      <h1 className={styles.titulo}>Categorias</h1>

      {carregando && <p>Carregando categorias...</p>}
      {erro && <p className={styles.erro}>{erro}</p>}

      <div className={styles.grade}>
        {categorias.map((cat, index) => (
          <div key={cat.id || index} className={styles.card}>
            <span className={styles.etiqueta}>Categoria #{cat.id ?? index + 1}</span>
            <h2>{cat.nome || cat.descricao}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
