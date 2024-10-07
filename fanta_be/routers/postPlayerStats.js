const express = require("express");
const PlayerStat = require("../models/Player_Stat"); // Importa il modello User
const Player = require("../models/Player");

module.exports = (sequelize) => {
  const playerStat = PlayerStat(sequelize);
  const player = Player(sequelize);
  const router = express.Router();

  router.post("/playerStats", async (req, res) => {
    const {
      match_vote,
      average_rating,
      injuries,
      red_card,
      yellow_card,
      available_for_selection,
      number_of_match,
      number_goal_conceded,
      number_goal,
      number_assist,
      playerNameAndSurname,
    } = req.body;

    try {
      const foundPlayer = await player.findOne({
        where: {
          name: playerNameAndSurname.name,
          surname: playerNameAndSurname.surname,
        },
      });

      if (!foundPlayer) {
        return res.status(404).json({ error: "Giocatore non trovato" });
      }

      const playerStats = await playerStat.create({
        match_vote,
        average_rating,
        injuries,
        red_card,
        yellow_card,
        available_for_selection,
        number_of_match,
        number_goal_conceded,
        number_goal,
        number_assist,
        id_player: foundPlayer.id,
      });
      res.status(201).json(playerStats);
    } catch (error) {
      console.error("Errore nella creazione della lega:", error);
      res.status(500).json({ error: "Errore nella creazione della lega" });
    }
  });

  return router;
};
