// AddBet.js
import React, { useState } from "react";
import axios from "axios";

function AddBet({ managementId }) {
  const [bet, setBet] = useState({
    date: "",
    championship: "",
    method: "",
    team1: "",
    team2: "",
    amountBet: "",
    amountWon: "",
    result: "",
  });
  const [month, setMonth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/management/${managementId}/add-bet`, {
        month,
        bet,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar aposta.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Aposta</h2>
      {/* Campos para as informações da aposta */}
      <select value={month} onChange={(e) => setMonth(e.target.value)} required>
        <option value="">Selecione o mês</option>
        {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map(
          (month) => (
            <option key={month} value={month}>
              {month}
            </option>
          )
        )}
      </select>
      <input
        type="text"
        placeholder="Campeonato"
        value={bet.championship}
        onChange={(e) => setBet({ ...bet, championship: e.target.value })}
        required
      />
      {/* Adicione os demais campos aqui */}
      <button type="submit">Adicionar Aposta</button>
    </form>
  );
}

export default AddBet;
