import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function Home() {
  const navigate = useNavigate();
  const [bankManagements, setBankManagements] = useState([]);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Extrair o token do localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirecionar para login se não estiver autenticado
      return;
    }
  
    // Carregar gestões do backend
    const fetchManagements = async () => {
      try {
        const response = await axios.get("http://localhost:5000/management", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBankManagements(response.data.managements);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar gestões:", error);
        setLoading(false);
      }
    };
  
    fetchManagements();
  }, [navigate]);

  const handleCreateManagement = () => {
    setCreating(true);
  };

  const handleSaveManagement = async (year, selectedMonths) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado.");
      return;
    }
  
    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id; // Certifique-se de que o ID está no token
  
      const newManagement = {
        year,
        months: selectedMonths,
        type: "Finance",
        name: `Gestão ${year}`,
        createdBy: userId,
      };
  
      const response = await axios.post(
        "http://localhost:5000/management/create",
        newManagement,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );
      setBankManagements([...bankManagements, response.data.management]);
      setCreating(false);
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
        {creating && (
          <div className="mt-4">
            <h3 className="text-lg">Criar Nova Gestão</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const year = e.target.year.value;
                const selectedMonths = Array.from(
                  e.target.month.selectedOptions,
                  (option) => option.value
                );
                handleSaveManagement(year, selectedMonths);
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
                  multiple
                  required
                  className="border p-2 mt-2"
                >
                  {[
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro",
                  ].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
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
        <div className="mt-6">
          <h3 className="text-lg">Minhas Gestões de Banca</h3>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {bankManagements.map((management) => (
              <div
                key={management._id}
                className="border p-4 rounded cursor-pointer"
                onClick={() => navigate(`/management/${management._id}`)}
              >
                <h4>{management.year}</h4>
                <p>Meses:</p>
                <ul>
                  {management.months.map((monthObj, index) => (
                    <li key={index}>{monthObj.month}</li>
                  ))}
                </ul>
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
