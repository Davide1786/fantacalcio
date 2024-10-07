const express = require("express");
const User = require("../models/User"); // Importa il modello User

module.exports = (sequelize) => {
  const user = User(sequelize);
  const router = express.Router();

  router.get("/users", async (req, res) => {
    try {
      /*
      il findAll è un metodo per recuperare tutti i record da una tabella
      del database associata a questo modello.(User)
      */
      const users = await user.findAll();
      res.status(200).json(users);
    } catch (error) {
      console.error("Errore nel recupero degli utenti:", error);
      res.status(500).json({ error: "Errore nel recupero degli utenti" });
    }
  });

  return router;
};
