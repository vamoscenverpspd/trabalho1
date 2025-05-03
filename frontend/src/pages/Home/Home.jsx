import React from "react";
import { Link } from "react-router-dom";
import { FaBox, FaClipboardList } from "react-icons/fa"; // Ícones adicionados
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-header">O que deseja ver no sistema?</h1>
      <div className="home-container-buttons">
        <Link to={"/pedidos"}>
          <button className="home-button">
            <FaBox className="home-icon" style={{ marginRight: "12px", marginTop: "2px" }} />
            <span>Pedidos</span>
          </button>
        </Link>
        <Link to={"/produtos"}>
          <button className="home-button">
            <FaClipboardList className="home-icon" style={{ marginRight: "12px", marginTop: "2px" }} />
            <span>Produtos</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
