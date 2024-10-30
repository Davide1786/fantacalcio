const { models } = require("../../sequelize"); // Assicurati di importare i modelli
// const { getIdParam } = require("../helpers"); // Assicurati di avere questa funzione per gestire gli ID

async function create(req, res) {
  const { minute, playerName, playerSurname, teamId, clubId } = req.body;

  try {
    // Trova il giocatore reale nel club reale
    const foundPlayer = await models.player.findOne({
      where: {
        name: playerName, // Cristiano
        surname: playerSurname, // Ronaldo
        id_club: clubId, // Juventus (o altro club reale)
      },
    });

    if (!foundPlayer) {
      return res.status(404).json({ error: "Giocatore non trovato nel club specificato" });
    }

    // Crea un nuovo goal per il giocatore reale e il team fantasy
    const newGoal = await models.goal.create({
      minute,
      id_player: foundPlayer.id, // ID del giocatore trovato
      id_team: teamId, // ID del team fantasy
    });

    // Trova il team fantasy che ha acquistato questo giocatore
    const owningFantasyTeam = await models.teamPlayer.findOne({
      where: {
        id_player: foundPlayer.id, // Cristiano Ronaldo
      },
      include: [models.team], // Associa il team fantasy
    });

    if (owningFantasyTeam) {
      // Incrementa il numero di gol segnati per il team fantasy
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
