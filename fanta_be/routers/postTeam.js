const express = require("express");
const Team = require("../models/Team");
const User = require("../models/User");
const League = require("../models/League");

module.exports = (sequelize) => {
  const router = express.Router();
  const team = Team(sequelize);
  const user = User(sequelize);
  const league = League(sequelize);

  router.post("/teams", async (req, res) => {
    const { name, total_player, initial_credits_team, final_credits_team, colors_home_team, colors_away_team, mailUser, nameLeague } = req.body;

    try {
      // const foundNameUser = await user.findOne({
      //   where: { email: mailUser.email },
      // });

      // if (!foundNameUser) {
      //   return res.status(404).json({ error: "User non trovato" });
      // }

      // const foundNameLeague = await league.findOne({
      //   where: { name: nameLeague.name },
      // });

      // if (!foundNameLeague) {
      //   return res.status(404).json({ error: "Lega non trovata" });
      // }

      const teams = await team.create({
        name,
        total_player,
        initial_credits_team,
        final_credits_team,
        colors_home_team,
        colors_away_team,
        // id_user: foundNameUser.email,
        // id_league: foundNameLeague.league,
      });
      res.status(201).json(teams);
    } catch (error) {
      console.error("Errore nella creazione del team:", error);
      res.status(500).json({ error: "Errore nella creazione del team" });
    }
  });

  return router;
};
