const { models } = require("../../sequelize");

async function create(req, res) {
  const { minute, playerName, playerSurname, teamId, clubId } = req.body;

  try {
    const foundPlayer = await models.player.findOne({
      where: {
        name: playerName,
        surname: playerSurname,
        id_club: clubId,
      },
    });

    if (!foundPlayer) {
      return res.status(404).json({ error: "Giocatore non trovato nel club specificato" });
    }

    const newGoal = await models.goal.create({
      minute,
      id_player: foundPlayer.id,
      id_team: teamId,
    });

    // Trova il team fantasy che ha acquistato questo giocatore
    const owningFantasyTeam = await models.teamPlayer.findOne({
      where: {
        id_player: foundPlayer.id, // Cristiano Ronaldo
      },
      include: [models.team], // Associo team fantasy
    });

    if (owningFantasyTeam) {
      await owningFantasyTeam.team.increment("goals_scored", { by: 1 });

      res.status(201).json({
        message: `Gol segnato da ${foundPlayer.name} ${foundPlayer.surname} al minuto ${minute} per il team fantasy ${owningFantasyTeam.team.name}`,
        goal: newGoal,
      });
    } else {
      res.status(200).json({
        message: `Gol segnato da ${foundPlayer.name} ${foundPlayer.surname} al minuto ${minute}, ma il giocatore non appartiene a nessun team fantasy.`,
        goal: newGoal,
      });
    }
  } catch (error) {
    console.error("Errore nella creazione del goal:", error);
    res.status(500).json({ error: "Errore nella creazione del goal" });
  }
}

module.exports = {
  create,
};
