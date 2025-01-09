const express = require("express");
const router = express.Router();
const Management = require("../models/Management");

// Endpoint para criar uma nova gestão
router.post('/management/create', async (req, res) => {
  try {
    const { year, months, type, name, createdBy } = req.body;

    const formattedMonths = months.map((month) => ({
      month, // Apenas a string do mês
      bets: []
    }));

    const newManagement = new Management({
      year,
      months: formattedMonths,
      type,
      name,
      createdBy
    });

    await newManagement.save();

    res.status(201).json({ message: "Gestão criada com sucesso!", management: newManagement });
  } catch (error) {
    console.error("Erro ao criar gestão:", error);
    res.status(400).json({ message: "Erro ao criar gestão.", error });
  }
});


// Endpoint para buscar gestões do usuário logado
router.get('/management', async (req, res) => {
  try {
    // Supondo que o middleware de autenticação já adiciona o ID do usuário no req.user
    const userId = req.user.id; // Certifique-se de ter um middleware que popula req.user

    // Filtrar gestões pelo usuário logado
    const managements = await Management.find({ createdBy: userId });

    res.status(200).json({ managements });
  } catch (error) {
    console.error("Erro ao buscar gestões:", error);
    res.status(400).json({ message: "Erro ao buscar gestões.", error });
  }
});



module.exports = router;
