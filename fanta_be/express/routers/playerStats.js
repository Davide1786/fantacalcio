const { models } = require("../../sequelize"); // Assicurati di importare i modelli

async function create(req, res) {
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
    // Cerca il giocatore per nome e cognome
    const foundPlayer = await models.player.findOne({
      where: {
        name: playerNameAndSurname.name,
        surname: playerNameAndSurname.surname,
      },
    });

    if (!foundPlayer) {
      return res.status(404).json({ error: "Giocatore non trovato" });
    }

    // Crea le statistiche del giocatore
    const playerStats = await models.statPlayer.create({
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
      id_player: foundPlayer.id, // Associa l'id del giocatore trovato
    });

    res.status(201).json(playerStats);
  } catch (error) {
    console.error("Errore nella creazione delle statistiche del giocatore:", error);
    res.status(500).json({ error: "Errore nella creazione delle statistiche del giocatore" });
  }
}

module.exports = {
  create,
};
