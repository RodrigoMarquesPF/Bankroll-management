import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Adicionando o estado para o email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validação simples dos campos
    if (!username || !email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Envia a requisição para o backend
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email, // Envia o email agora
        password,
      });

      alert(response.data.message); 
      navigate("/login"); // Exibe a resposta do backend
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao registrar o usuário.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="p-6 bg-gray-100 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Registrar</h2>
        
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border"
          disabled={loading}
        />
        
        <input
          type="email"  // Alterando para "email"
          placeholder="Email"
          value={email}  // Agora gerenciando o estado do email
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border"
          disabled={loading}
        />
        
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border"
          disabled={loading}
        />
        
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
        {loading ? "Carregando..." : "Registrar"}
        </button>
        <div className="mt-4 text-center">
          <p>
            Já tem uma conta?{" "}
            <button
              type="button"
              className="text-blue-500"
              onClick={() => navigate("/login")}
            >
              Faça login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
