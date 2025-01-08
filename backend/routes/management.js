const express = require("express");
const router = express.Router();
const Management = require("../models/Management");

// Endpoint para criar uma nova gestão
router.post("/create", async (req, res) => {
  const { year, months, createdBy, type, name } = req.body;

  // Validar se os campos obrigatórios estão presentes
  if (!year || !months || !Array.isArray(months) || !type || !name) {
    return res.status(400).json({ message: "Ano, meses, tipo e nome são obrigatórios!" });
  }

  console.log("Dados recebidos:", req.body); // Log dos dados recebidos

  try {
    // Criar a gestão
    const newManagement = new Management({
      year,
      months: months.map((month) => ({
        month,
        bets: [],
      })),
      type,  // Passando o tipo
      name,  // Passando o nome
      createdBy,
    });

    console.log("Novo objeto de gestão:", newManagement); // Log do objeto antes de salvar

    const savedManagement = await newManagement.save();
    console.log("Gestão salva:", savedManagement); // Log após salvar

    res.status(201).json({
      message: "Gestão criada com sucesso!",
      management: savedManagement,
    });
  } catch (error) {
    console.error("Erro ao criar gestão:", error);
    res.status(500).json({ message: "Erro ao criar gestão." });
  }
});


module.exports = router;
