import React, { useState } from "react";
import axios from "axios";

function NewManagement() {
  const [year, setYear] = useState("");
  const [months, setMonths] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = "ID_USUARIO"; // Substitua com o ID do usuário autenticado
  
    const monthsData = months.map((month) => ({
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
      alert(response.data.message);
    } catch (error) {
      console.error(error.response || error.message);
      alert("Erro ao criar gestão.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Nova Gestão</h2>
      <input
        type="number"
        placeholder="Ano"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <select
        multiple
        value={months}
        onChange={(e) => setMonths([...e.target.selectedOptions].map((o) => o.value))}
        required
      >
        {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map(
          (month) => (
            <option key={month} value={month}>
              {month}
            </option>
          )
        )}
      </select>
      <button type="submit">Criar Gestão</button>
    </form>
  );
}

export default NewManagement;
