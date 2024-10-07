const express = require("express");
const Club = require("../models/Club"); // Importa il modello User

module.exports = (sequelize) => {
  const club = Club(sequelize);
  const router = express.Router();

  router.post("/clubs", async (req, res) => {
    const { name, year_of_foundation, trophy_cabinet, city, value_club, number_of_fans, stadium, derby, ranking_position, legends, colors_home, colors_away } =
      req.body;

    try {
      const newClub = await club.create({
        name,
        year_of_foundation,
        trophy_cabinet,
        city,
        value_club,
        number_of_fans,
        stadium,
        derby,
        ranking_position,
        legends,
        colors_home,
        colors_away,
      });
      res.status(201).json(newClub);
    } catch (error) {
      console.error("Errore nella creazione della Club:", error);
      res.status(500).json({ error: "Errore nella creazione della Club" });
    }
  });

  return router;
};
