const { models } = require("../../sequelize");

async function create(req, res) {
  const { name, total_player, initial_credits_team, final_credits_team, colors_home_team, colors_away_team, mailUser, nameLeague } = req.body;

  try {
    // Cerca l'utente per email
    const foundUser = await models.user.findOne({
      where: { email: mailUser.email },
    });

    if (!foundUser) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    // Cerca la lega per nome
    const foundLeague = await models.league.findOne({
      where: { name: nameLeague.name },
    });

    if (!foundLeague) {
      return res.status(404).json({ error: "Lega non trovata" });
    }

    // Crea la nuova squadra
    const newTeam = await models.team.create({
      name,
      total_player,
      initial_credits_team,
      final_credits_team,
      colors_home_team,
      colors_away_team,
      id_user: foundUser.id,
      id_league: foundLeague.id,
    });

    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Errore nella creazione del team:", error);
    res.status(500).json({ error: "Errore nella creazione del team" });
  }
}

module.exports = {
  create,
};
