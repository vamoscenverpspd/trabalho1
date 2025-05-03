import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [pedidos, setPedidos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [produtosSelecionados, setProdutosSelecionados] = useState([{ produtoId: '', quantidade: 1 }]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);

  useEffect(() => {
    // Carrega pedidos
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://192.168.0.13:5000/order');
        const dados = response.data;
        const pedidosAgrupados = dados.reduce((acc, pedido) => {
          const existente = acc.find(p => p.id === pedido.id);
          if (existente) {
            existente.produtos.push({ nome: pedido.product, quantidade: pedido.quantity });
          } else {
            acc.push({
              id: pedido.id,
              produtos: [{ nome: pedido.product, quantidade: pedido.quantity }]
            });
          }
          return acc;
        }, []);
        setPedidos(pedidosAgrupados);
      } catch (err) {
        console.error('Erro ao carregar pedidos:', err);
      }
    };

    // Carrega produtos (opcional)
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://192.168.0.13:5000/product');
        setProdutosDisponiveis(response.data.map(p => ({
          id: p.productId,
          nome: p.productName
        })));
      } catch (err) {
        console.error('Erro ao carregar produtos:', err);
      }
    };

    fetchPedidos();
    fetchProdutos();
  }, []);

  const handleAddLinha = () => {
    setProdutosSelecionados([...produtosSelecionados, { produtoId: '', quantidade: 1 }]);
  };

  const handleProdutoChange = (index, value) => {
    const atualizados = [...produtosSelecionados];
    atualizados[index].produtoId = value;
    setProdutosSelecionados(atualizados);
  };

  const handleQuantidadeChange = (index, value) => {
    const atualizados = [...produtosSelecionados];
    atualizados[index].quantidade = parseInt(value);
    setProdutosSelecionados(atualizados);
  };

  const handleAddPedido = async () => {
    try {
      for (const p of produtosSelecionados.filter(p => p.produtoId)) {
        const produtoSelecionado = produtosDisponiveis.find(prod => prod.id === p.produtoId);
        await axios.post('http://192.168.0.13:5000/order', {
          product: produtoSelecionado?.nome, // Enviar NOME do produto, não o ID
          quantity: p.quantidade
        });
      }
  
      // Recarrega os pedidos após adicionar
      setShowAddModal(false);
      setProdutosSelecionados([{ produtoId: '', quantidade: 1 }]);
  
      const response = await axios.get('http://192.168.0.13:5000/order');
      const dados = response.data;
      const pedidosAgrupados = dados.reduce((acc, pedido) => {
        const existente = acc.find(p => p.id === pedido.id);
        if (existente) {
          existente.produtos.push({ nome: pedido.product, quantidade: pedido.quantity });
        } else {
          acc.push({
            id: pedido.id,
            produtos: [{ nome: pedido.product, quantidade: pedido.quantity }]
          });
        }
        return acc;
      }, []);
      setPedidos(pedidosAgrupados);
    } catch (error) {
      alert('Erro ao adicionar pedido.');
    }
  };
  

  return (
    <div className="pedidos-page">
      <header className="pedidos-header">
        <Link to="/produtos">Produtos</Link>
        <Link to="/pedidos">Pedidos</Link>
      </header>

      <h1 className="pedidos-title">Pedidos</h1>

      <div className="pedidos-toolbar">
        <button className="adicionar-btn" onClick={() => setShowAddModal(true)}>
          <FaPlus style={{ marginRight: '8px' }} />
          Adicionar Pedido
        </button>
      </div>

      <div className="pedidos-lista">
        {pedidos.map((pedido, index) => (
          <div key={pedido.id} className="pedido-card">
            <h3>Pedido #{index + 1}</h3>
            <ul>
              {pedido.produtos.map((prod, i) => (
                <li key={i}>{prod.nome} — {prod.quantidade}x</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className='modal-header'>Adicionar Pedido</h2>
            {produtosSelecionados.map((item, index) => (
              <div key={index} className="pedido-item">
                <select
                  className='pedido-select'
                  value={item.produtoId}
                  onChange={(e) => handleProdutoChange(index, e.target.value)}
                >
                  <option value="">Selecione um produto</option>
                  {produtosDisponiveis.map((prod) => (
                    <option key={prod.id} value={prod.id}>{prod.nome}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={item.quantidade}
                  onChange={(e) => handleQuantidadeChange(index, e.target.value)}
                />
              </div>
            ))}
            <div className='pedidos-botoes-container'>
              <button className='pedido-modal-botao modal-cancel-button' onClick={() => setShowAddModal(false)}>Cancelar</button>
              <button className='pedido-modal-botao modal-add-button' onClick={handleAddPedido}>Salvar Pedido</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
