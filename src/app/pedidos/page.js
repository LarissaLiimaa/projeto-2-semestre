'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const API_URL = 'https://ifro.edu.br';

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [itens, setItens] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resPedidos, resClientes, resItens, resProdutos] = await Promise.all([
          fetch(`${API_URL}/pedidos`),
          fetch(`${API_URL}/clientes`),
          fetch(`${API_URL}/itens_pedido`),
          fetch(`${API_URL}/produtos`),
        ]);

        const dadosPedidos = await resPedidos.json();
        const dadosClientes = await resClientes.json();
        const dadosItens = await resItens.json();
        const dadosProdutos = await resProdutos.json();

        setPedidos(Array.isArray(dadosPedidos) ? dadosPedidos : dadosPedidos.data || []);
        setClientes(Array.isArray(dadosClientes) ? dadosClientes : dadosClientes.data || []);
        setItens(Array.isArray(dadosItens) ? dadosItens : dadosItens.data || []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : dadosProdutos.data || []);
      } catch (erro) {
        console.error('Erro ao buscar pedidos:', erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const buscarNomeCliente = (id) => {
    const cliente = clientes.find((c) => c.id === id);
    return cliente ? cliente.nome : `Cliente #${id}`;
  };

  const buscarNomeProduto = (id) => {
    const produto = produtos.find((p) => p.id === id);
    return produto ? produto.nome : `Produto #${id}`;
  };

  return (
    <div>
      <div className={styles.topo}>
        <h1>Pedidos Cadastrados</h1>
        <Link href="/pedidos/novo" className="btn">+ Novo Pedido</Link>
      </div>

      {carregando ? (
        <p>Carregando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <div className={styles.card}>Nenhum pedido encontrado.</div>
      ) : (
        pedidos.map((pedido) => {
          const idCliente = pedido.cliente_id || pedido.clienteId;
          const itensDoPedido = itens.filter(
            (item) => (item.pedido_id || item.pedidoId) === pedido.id
          );

          return (
            <div key={pedido.id} className={styles.card}>
              <h2>Pedido #{pedido.id}</h2>
              <p><strong>Cliente:</strong> {buscarNomeCliente(idCliente)}</p>
              {pedido.data && (
                <p><strong>Data:</strong> {new Date(pedido.data).toLocaleDateString('pt-BR')}</p>
              )}

              <div className={styles.listaItens}>
                <strong>Itens do Pedido:</strong>
                {itensDoPedido.length === 0 ? (
                  <p className={styles.vazio}>Sem itens vinculados.</p>
                ) : (
                  <ul>
                    {itensDoPedido.map((item) => (
                      <li key={item.id}>
                        {buscarNomeProduto(item.produto_id || item.produtoId)} — Quantidade: {item.quantidade}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
