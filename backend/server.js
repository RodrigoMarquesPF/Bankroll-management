// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth"); // Importando as rotas
const managementRoutes = require("./routes/management");
dotenv.config(); // Carregar variáveis de ambiente

const app = express();
app.use(bodyParser.json());
// Middleware
app.use(cors()); // Middleware global
app.use(express.json()); // Aceitar JSON no body

// Registrar as rotas
app.use("/api/auth", authRoutes);
app.use("/management", managementRoutes);
// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado ao MongoDB Atlas");
}).catch((err) => {
  console.log("Erro ao conectar ao MongoDB:", err);
});

// Usar as rotas de autenticação
app.use("/api/auth", authRoutes); // Registrando as rotas de autenticação

// Iniciar o servidor
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
