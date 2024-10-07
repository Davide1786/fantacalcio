const express = require("express");
const User = require("../models/User"); // Importa il modello User

module.exports = (sequelize) => {
  const user = User(sequelize);
  const router = express.Router();

  router.post("/users", async (req, res) => {
    const { name, surname, email, nickname } = req.body;

    try {
      const newUser = await user.create({ name, surname, email, nickname });
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Errore nella creazione dell'utente:", error);
      res.status(500).json({ error: "Errore nella creazione dell'utente" });
    }
  });

  return router;
};
