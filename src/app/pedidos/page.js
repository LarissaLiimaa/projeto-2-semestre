"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function ListarPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [itens, setItens] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarTudo() {
      try {
        const [resPedidos, resItens, resClientes, resProdutos] = await Promise.all([
          fetch("https://ifro.edu.br"),
          fetch("https://ifro.edu.br"),
          fetch("https://ifro.edu.br"),
          fetch("https://ifro.edu.br"),
        ]);

        if (!resPedidos.ok || !resItens.ok || !resClientes.ok || !resProdutos.ok) {
          throw new Error("Erro ao consultar a API de pedidos");
        }

        const dadosPedidos = await resPedidos.json();
        const dadosItens = await resItens.json();
        const dadosClientes = await resClientes.json();
        const dadosProdutos = await resProdutos.json();

        setPedidos(Array.isArray(dadosPedidos) ? dadosPedidos : dadosPedidos.data || []);
        setItens(Array.isArray(dadosItens) ? dadosItens : dadosItens.data || []);
        setClientes(Array.isArray(dadosClientes) ? dadosClientes : dadosClientes.data || []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : dadosProdutos.data || []);
      } catch (e) {
        console.log(e.message);
        setErro("Não foi possível carregar os pedidos.");
      } finally {
        setCarregando(false);
      }
    }

    carregarTudo();
  }, []);

  function obterNomeCliente(id) {
    const cliente = clientes.find((c) => c.id === id);
    return cliente ? cliente.nome : `Cliente #${id}`;
  }

  function obterNomeProduto(id) {
    const produto = produtos.find((p) => p.id === id);
    return produto ? produto.nome : `Produto #${id}`;
  }

  return (
    <div>
      <div className={styles.cabecalhoPagina}>
        <h1 className={styles.titulo}>Pedidos Cadastrados</h1>
        <Link href="/pedidos/novo" className={styles.botaoNovo}>
          Novo Pedido
        </Link>
      </div>

      {carregando && <p>Carregando pedidos...</p>}
      {erro && <p className={styles.erro}>{erro}</p>}

      <div className={styles.grade}>
        {pedidos.map((pedido) => {
          const itensDestePedido = itens.filter(
            (i) => i.pedido_id === pedido.id
          );

          return (
            <div key={pedido.id} className={styles.card}>
              <span className={styles.etiqueta}>Pedido #{pedido.id}</span>
              <h2>{obterNomeCliente(pedido.cliente_id)}</h2>

              <h4 className={styles.tituloItens}>Itens do Pedido</h4>

              {itensDestePedido.length > 0 ? (
                <ul className={styles.listaItens}>
                  {itensDestePedido.map((item, idx) => (
                    <li key={item.id || idx} className={styles.itemLinha}>
                      <span>{obterNomeProduto(item.produto_id)}</span>
                      <strong>{item.quantidade} un.</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.semItens}>Nenhum item vinculado.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
