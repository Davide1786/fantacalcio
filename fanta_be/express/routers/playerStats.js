const { models } = require("../../sequelize"); // Assicurati di importare i modelli
const { getIdParam } = require("../helpers"); // Assicurati di avere questa funzione per gestire gli ID
const { Op, Sequelize } = require("sequelize");
// recupera tutti le statistiche
async function getAll(req, res) {
  try {
    const stats = await models.statPlayer.findAll({
      include: [
        {
          model: models.player,
          attributes: ["name", "surname"], // Prendi le tabelle che servono
        },
      ],
    });
    console.log("Statistiche trovate:", stats);
    res.status(200).json(stats);
  } catch (error) {
    // console.log("Statistiche trovate:", stats);
    console.error("Errore durante il recupero delle statistiche dei giocatori:", error);
    res.status(500).json({ error: "Si è verificato un errore durante il recupero delle statistiche dei giocatori" });
  }
}

async function getById(req, res) {
  try {
    const id = getIdParam(req);
    const stats = await models.statPlayer.findByPk(id);

    if (stats) {
      res.status(200).json(stats);
    } else {
      res.status(404).send("404 - Not found");
    }
  } catch (error) {
    console.error("Errore durante il recupero delle statistiche:", error);
    res.status(500).json({ error: "Si è verificato un errore durante il recupero delle statistiche" });
  }
}

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
    playerName,
    playerSurname,
  } = req.body;

  // Verifica che non ci siano campi mancanti
  if (
    !match_vote ||
    !average_rating ||
    injuries === undefined ||
    !red_card ||
    !yellow_card ||
    available_for_selection === undefined ||
    !number_of_match ||
    !number_goal_conceded ||
    !number_goal ||
    !number_assist ||
    !playerName ||
    !playerSurname
  ) {
    return res.status(400).json({ message: "Campi mancanti" });
  }

  try {
    // Cerca il giocatore per nome e cognome con case-insensitive
    const foundPlayer = await models.player.findOne({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("name")), "LIKE", `%${playerName.toLowerCase()}%`),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("surname")), "LIKE", `%${playerSurname.toLowerCase()}%`),
        ],
      },
    });

    if (!foundPlayer) {
      console.log("Giocatore non trovato:", playerName, playerSurname);
      return res.status(404).json({ error: "Giocatore non trovato" });
    }

    // Crea le statistiche del giocatore
    const playerStat = await models.statPlayer.create({
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
      playerId: foundPlayer.id, // Associa l'id del giocatore trovato
    });

    res.status(201).json(playerStat);
  } catch (error) {
    console.error("Errore nella creazione delle statistiche del giocatore:", error);
    res.status(500).json({ error: "Errore nella creazione delle statistiche del giocatore", details: error.message });
  }
}

async function update(req, res) {
  const id = getIdParam(req);

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
    playerName,
    playerSurname,
  } = req.body;

  if (req.body.id !== id) {
    return res.status(400).send(`
      Richiesta non valida: l'ID del parametro (${id}) non corrisponde all'ID del corpo
    (${req.body.id}).`);
  }

  try {
    if (
      match_vote === undefined ||
      average_rating === undefined ||
      injuries === undefined ||
      red_card === undefined ||
      yellow_card === undefined ||
      available_for_selection === undefined ||
      number_of_match === undefined ||
      number_goal_conceded === undefined ||
      number_goal === undefined ||
      number_assist === undefined ||
      playerName === undefined ||
      playerSurname === undefined
    ) {
      return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
    }

    const stats = await models.statPlayer.findByPk(id);

    if (!stats) {
      return res.status(400).json({ message: "Statistica non trovata!" });
    }

    const foundPlayer = await models.player.findOne({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("name")), "LIKE", `%${playerName.toLowerCase()}%`),
          Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("surname")), "LIKE", `%${playerSurname.toLowerCase()}%`),
        ],
      },
    });

    if (!foundPlayer) {
      return res.status(400).json({ message: "Giocatore non trovato!" });
    }

    await stats.update({
      match_vote: Number(match_vote),
      average_rating: Number(average_rating),
      injuries,
      red_card: Number(red_card),
      yellow_card: Number(yellow_card),
      available_for_selection,
      number_of_match: Number(number_of_match),
      number_goal_conceded: Number(number_goal_conceded),
      number_goal: Number(number_goal),
      number_assist: Number(number_assist),
    });

    res.status(200).json({
      message: "Statistiche aggiornate",
      data: {
        match_vote: Number(match_vote),
        average_rating: Number(average_rating),
        injuries,
        red_card: Number(red_card),
        yellow_card: Number(yellow_card),
        available_for_selection,
        number_of_match: Number(number_of_match),
        number_goal_conceded: Number(number_goal_conceded),
        number_goal: Number(number_goal),
        number_assist: Number(number_assist),
        playerName: foundPlayer.name,
        playerSurname: foundPlayer.surname,
      },
    });
  } catch (error) {
    console.error("Errore durante l'aggiornamento:", error);
    res.status(500).json({ message: "Errore del server" });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
};
