'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const API_URL = 'https://ifro.edu.br';

export default function CriarPedido() {
  const router = useRouter();
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    async function carregarOpcoes() {
      try {
        const [resClientes, resProdutos] = await Promise.all([
          fetch(`${API_URL}/clientes`),
          fetch(`${API_URL}/produtos`),
        ]);
        const dadosClientes = await resClientes.json();
        const dadosProdutos = await resProdutos.json();

        setClientes(Array.isArray(dadosClientes) ? dadosClientes : dadosClientes.data || []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : dadosProdutos.data || []);
      } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
      }
    }
    carregarOpcoes();
  }, []);

  const adicionarProduto = () => {
    if (!produtoSelecionado || quantidade <= 0) return;

    const prodObj = produtos.find((p) => String(p.id) === String(produtoSelecionado));
    if (!prodObj) return;

    setCarrinho([
      ...carrinho,
      {
        produto_id: prodObj.id,
        nome: prodObj.nome,
        quantidade: Number(quantidade),
      },
    ]);

    setProdutoSelecionado('');
    setQuantidade(1);
  };

  const removerItem = (index) => {
    setCarrinho(carrinho.filter((_, i) => i !== index));
  };

  const salvarPedido = async (e) => {
    e.preventDefault();
    if (!clienteSelecionado || carrinho.length === 0) {
      alert('Selecione um cliente e adicione pelo menos um produto.');
      return;
    }

    setEnviando(true);
    try {
      const resPedido = await fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: Number(clienteSelecionado),
        }),
      });

      if (!resPedido.ok) throw new Error('Falha ao criar pedido');
      const novoPedido = await resPedido.json();
      const pedidoId = novoPedido.id || novoPedido.data?.id;

      for (const item of carrinho) {
        await fetch(`${API_URL}/itens_pedido`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pedido_id: pedidoId,
            produto_id: item.produto_id,
            quantidade: item.quantidade,
          }),
        });
      }

      alert('Pedido cadastrado com sucesso!');
      router.push('/pedidos');
    } catch (erro) {
      console.error('Erro ao salvar pedido:', erro);
      alert('Erro ao cadastrar pedido. Verifique o console.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <h1 className={styles.titulo}>Criar Novo Pedido</h1>

      <form onSubmit={salvarPedido} className={styles.formulario}>
        <div className={styles.grupo}>
          <label>Selecione o Cliente:</label>
          <select
            value={clienteSelecionado}
            onChange={(e) => setClienteSelecionado(e.target.value)}
            required
          >
            <option value="">-- Escolha um cliente --</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        <hr className={styles.divisor} />

        <h2 className={styles.subtitulo}>Adicionar Produtos</h2>
        <div className={styles.linhaProduto}>
          <div className={styles.grupo}>
            <label>Produto:</label>
            <select
              value={produtoSelecionado}
              onChange={(e) => setProdutoSelecionado(e.target.value)}
            >
              <option value="">-- Escolha um produto --</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} {produto.preco ? `(R$ ${produto.preco})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.grupo}>
            <label>Quantidade:</label>
            <input
              type="number"
              min="1"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />
          </div>
        </div>

        <button type="button" onClick={adicionarProduto} className={styles.btnAdicionar}>
          + Adicionar Item
        </button>

        <div className={styles.carrinhoBox}>
          <h2 className={styles.subtitulo}>Itens Adicionados ({carrinho.length})</h2>
          {carrinho.length === 0 ? (
            <p>Nenhum produto adicionado ainda.</p>
          ) : (
            <ul className={styles.listaCarrinho}>
              {carrinho.map((item, index) => (
                <li key={index} className={styles.itemCarrinho}>
                  <span>
                    {item.nome} — <strong>Qtd: {item.quantidade}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => removerItem(index)}
                    className={styles.btnRemover}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.acoesFinais}>
          <button type="submit" className="btn" disabled={enviando}>
            {enviando ? 'Salvando...' : 'Finalizar Pedido'}
          </button>
        </div>
      </form>
    </div>
  );
}
