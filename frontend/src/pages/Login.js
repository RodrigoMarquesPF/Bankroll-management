import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Verifica token imediatamente
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 bg-gray-100 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Entrar"}
        </button>
        <div className="mt-4 text-center">
          <p>
            Não tem uma conta?{" "}
            <button
              type="button"
              className="text-blue-500"
              onClick={() => navigate("/register")}
            >
              Registre-se
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;