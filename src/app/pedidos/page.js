'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [itens, setItens] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resPedidos, resClientes, resItens, resProdutos] = await Promise.all([
          fetch('/api/pedidos'),
          fetch('/api/clientes'),
          fetch('/api/itens_pedido'),
          fetch('/api/produtos'),
        ]);

        if (resPedidos.ok) setPedidos(await resPedidos.json());
        if (resClientes.ok) setClientes(await resClientes.json());
        if (resItens.ok) setItens(await resItens.json());
        if (resProdutos.ok) setProdutos(await resProdutos.json());
      } catch (e) {
        console.error('Erro ao buscar pedidos:', e.message);
      }
    };
    carregarDados();
  }, []);

  const getNomeCliente = (id) => {
    const cliente = clientes.find((c) => c.id === id);
    return cliente ? cliente.nome : `Cliente #${id}`;
  };

  const getNomeProduto = (id) => {
    const produto = produtos.find((p) => p.id === id);
    return produto ? produto.nome : `Produto #${id}`;
  };

  return (
    <div>
      <div className={styles.topo}>
        <h1>Pedidos Cadastrados</h1>
        <Link href="/pedidos/novo" className="btn">+ Novo Pedido</Link>
      </div>

      {pedidos === null ? (
        <p>Carregando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <div className={styles.card}>Nenhum pedido encontrado.</div>
      ) : (
        pedidos.map((pedido) => {
          const itensDoPedido = itens.filter((item) => item.pedido_id === pedido.id);

          return (
            <div key={pedido.id} className={styles.card}>
              <h2>Pedido #{pedido.id}</h2>
              <p><strong>Cliente:</strong> {getNomeCliente(pedido.cliente_id)}</p>
              {pedido.status && <p><strong>Status:</strong> {pedido.status}</p>}
              {pedido.data_pedido && (
                <p><strong>Data:</strong> {new Date(pedido.data_pedido).toLocaleDateString('pt-BR')}</p>
              )}

              <div className={styles.listaItens}>
                <strong>Itens do Pedido:</strong>
                {itensDoPedido.length === 0 ? (
                  <p className={styles.vazio}>Sem itens vinculados.</p>
                ) : (
                  <ul>
                    {itensDoPedido.map((item) => (
                      <li key={item.id}>
                        {getNomeProduto(item.produto_id)} — Quantidade: {item.quantidade}
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
