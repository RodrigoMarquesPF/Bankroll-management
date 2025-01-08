import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function Home() {
  const navigate = useNavigate();
  const [bankManagements, setBankManagements] = useState([]); // Estado para armazenar as gestões
  const [creating, setCreating] = useState(false); // Estado para controlar a criação
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    // Carregar gestões do backend
    const fetchManagements = async () => {
      try {
        const response = await axios.get("http://localhost:5000/management");
        setBankManagements(response.data.managements);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar gestões:", error);
        setLoading(false);
      }
    };

    fetchManagements();
  }, []);

  // Definindo corretamente a função handleCreateManagement
  const handleCreateManagement = () => {
    setCreating(true); // Ativa o formulário de criação
  };

  const handleSaveManagement = async (year, selectedMonths) => {
    const userId = "ID_USUARIO"; // Substitua com o ID do usuário autenticado

    const monthsData = selectedMonths.map((month) => ({
      month,
      bets: []  // Inicialmente as apostas estarão vazias
    }));

    const newManagement = {
      year,
      months: monthsData,
      type: "Finance",  // Tipo de gestão
      name: `Gestão ${year}`,  // Nome da gestão
      createdBy: userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/management/create",
        newManagement,
        {
          headers: {
            "Content-Type": "application/json", // Envia como JSON
          },
        }
      );
      setBankManagements([...bankManagements, response.data.management]);
      setCreating(false); // Fecha o formulário de criação
    } catch (error) {
      console.error("Erro ao criar gestão:", error.response || error.message);
      alert("Erro ao criar gestão.");
    }
  };

  if (loading) {
    return <div>Carregando gestões...</div>;
  }

  return (
    <div>
      <Header />

      <div className="p-6">
        <h2>Gestões de Banca</h2>
        <button
          onClick={handleCreateManagement}
          className="bg-green-500 text-white py-2 px-4 rounded mt-4"
        >
          Criar Nova Gestão
        </button>

        {/* Mostrar o formulário de criação de gestão */}
        {creating && (
          <div className="mt-4">
            <h3 className="text-lg">Criar Nova Gestão</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const year = e.target.year.value;
                const selectedMonths = Array.from(e.target.month.selectedOptions, option => option.value); // Obtém os meses selecionados como array
                handleSaveManagement(year, selectedMonths); // Passa os meses como array
              }}
            >
              <div>
                <label>Selecione o Ano:</label>
                <input
                  type="number"
                  name="year"
                  required
                  className="border p-2 mt-2"
                />
              </div>
              <div className="mt-4">
                <label>Selecione os Meses:</label>
                <select
                  name="month"
                  multiple // Permite selecionar múltiplos meses
                  required
                  className="border p-2 mt-2"
                >
                  {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map(
                    (month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    )
                  )}
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Criar Gestão
              </button>
            </form>

          </div>
        )}

        {/* Exibe as gestões de banca criadas */}
        <div className="mt-6">
          <h3 className="text-lg">Minhas Gestões de Banca</h3>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {bankManagements.map((management) => (
              <div
                key={management._id}
                className="border p-4 rounded cursor-pointer"
                onClick={() => navigate(`/management/${management._id}`)}
              >
                <h4>
                  {management.month} de {management.year}
                </h4>
                <p>Gestão ID: {management._id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
