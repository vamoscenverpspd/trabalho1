import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import "./Product.css";

const Product = () => {
  const [produtos, setProdutos] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);
  const [novoProduto, setNovoProduto] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://192.168.0.13:5000/product');
        const produtosFormatados = response.data.map(p => ({
          id: p.productId,
          nome: p.productName
        }));
        setProdutos(produtosFormatados);
      } catch (error) {
        alert('Erro ao buscar produtos.');
        console.error(error);
      }
    };

    fetchProdutos();
  }, []);

  const handleAddProduto = async () => {
    if (novoProduto == "") {
      alert("O nome do produto não pode ser vazio!");
      return;
    }
    try {
      // Exemplo de requisição POST
      await axios.post("http://192.168.0.13:5000/product", {
        productName: novoProduto,
      });
      setProdutos([...produtos, { id: Date.now(), nome: novoProduto }]);
      setShowAddModal(false);
      setNovoProduto("");
    } catch (err) {
      alert("Erro ao adicionar produto.");
    }
  };

  const handleDeleteProduto = async () => {
    try {
      await axios.delete(`http://192.168.0.13:5000/product/${produtoToDelete.id}`);
      setProdutos(produtos.filter((p) => p.id !== produtoToDelete.id));
      setShowDeleteModal(false);
      setProdutoToDelete(null);
    } catch (err) {
      alert("Erro ao excluir produto.");
    }
  };

  return (
    <div className="produtos-page">
      <header className="produtos-header">
        <Link to="/produtos">Produtos</Link>
        <Link to="/pedidos">Pedidos</Link>
      </header>

      <h1 className="produtos-title">Produtos</h1>

      <div className="produtos-toolbar">
        <button className="adicionar-btn" onClick={() => setShowAddModal(true)}>
          <FaPlus style={{ marginRight: "8px" }} />
          Adicionar Produto
        </button>
      </div>

      <div className="produtos-lista">
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-card">
            <span className="preto">{produto.nome}</span>
          </div>
        ))}
      </div>

      {/* Modal Adicionar */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-header">Adicionar Produto</h2>
            <label for="nomeProduto" className="modal-label">
              Nome do Produto
            </label>
            <input
              type="text"
              value={novoProduto}
              onChange={(e) => setNovoProduto(e.target.value)}
              id="nomeProduto"
              required
            />
            <div className="modal-buttons-container">
              <button
                className="modal-cancel-button"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </button>
              <button className="modal-add-button" onClick={handleAddProduto}>
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Deletar */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 className="modal-header">
              Deseja realmente excluir o produto?
            </h2>
            <div className="modal-actions">
              <button
                className="modal-cancel-button"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                className="modal-delete-button"
                onClick={handleDeleteProduto}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
