const express = require("express");
const League = require("../models/League");

module.exports = (sequelize) => {
  const router = express.Router();
  const league = League(sequelize);

  router.post("/leagues", async (req, res) => {
    const { name, description, start_date, end_date, status, session } = req.body;

    try {
      const newLeague = await league.create({
        name,
        description,
        start_date,
        end_date,
        status,
        session,
      });
      res.status(201).json(newLeague);
    } catch (error) {
      console.error("Errore nella creazione della lega:", error);
      res.status(500).json({ error: "Errore nella creazione della lega" });
    }
  });

  return router;
};
