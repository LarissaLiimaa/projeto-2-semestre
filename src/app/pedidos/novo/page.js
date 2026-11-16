'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

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
    const carregarOpcoes = async () => {
      try {
        const [resClientes, resProdutos] = await Promise.all([
          fetch('https://ifro.edu.br'),
          fetch('https://ifro.edu.br'),
        ]);
        if (resClientes.ok) setClientes(await resClientes.json());
        if (resProdutos.ok) setProdutos(await resProdutos.json());
      } catch (e) {
        console.error('Erro ao carregar dados:', e.message);
      }
    };
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
      const resPedido = await fetch('https://ifro.edu.br', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cliente_id: Number(clienteSelecionado),
        }),
      });

      if (!resPedido.ok) throw new Error('Falha ao criar pedido');
      const novoPedido = await resPedido.json();

      for (const item of carrinho) {
        const resItem = await fetch('https://ifro.edu.br', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pedido_id: novoPedido.id,
            produto_id: item.produto_id,
            quantidade: item.quantidade,
          }),
        });
        if (!resItem.ok) throw new Error('Falha ao adicionar item');
      }

      alert('Pedido cadastrado com sucesso!');
      router.push('/pedidos');
    } catch (e) {
      console.error('Erro ao salvar pedido:', e.message);
      alert('Erro ao cadastrar pedido. Verifique o console (F12).');
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
                  {produto.nome} — R$ {Number(produto.preco).toFixed(2)} (Estoque: {produto.quantidade_estoque})
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
