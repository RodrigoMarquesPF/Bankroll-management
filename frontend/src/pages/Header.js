// Header.js
import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ setBankManagements = () => {} }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setBankManagements([]); // Limpa gestões, se fornecido
    navigate("/login");
  };
  

  const handleGoHome = () => {
    navigate("/home"); // Redireciona para a Home
  };

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl">Banco de Gestão</h1>
      <div>
        <button
          onClick={handleGoHome}
          className="bg-green-500 text-white py-2 px-4 rounded mx-2"
        >
          Home
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;
