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
    const playerId = getIdParam(req); // Ottieni l'ID del giocatore dalla richiesta
    const stats = await models.statPlayer.findAll({
      where: { playerId },
    });

    if (stats.length > 0) {
      res.status(200).json(stats); // Ritorna un array di statistiche
    } else {
      res.status(404).send("404 - Nessuna statistica trovata per questo giocatore");
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
    playerId, // ora usiamo playerId
  } = req.body;

  if (req.body.id !== id) {
    return res.status(400).send(`Richiesta non valida: l'ID del parametro (${id}) non corrisponde all'ID del corpo (${req.body.id}).`);
  }

  try {
    // Array dei campi obbligatori, ora senza playerName e playerSurname
    const requiredFields = [
      "match_vote",
      "average_rating",
      "injuries",
      "red_card",
      "yellow_card",
      "available_for_selection",
      "number_of_match",
      "number_goal_conceded",
      "number_goal",
      "number_assist",
      "playerId",
    ];

    // Verifica i campi mancanti
    const missingFields = requiredFields.filter((field) => req.body[field] === undefined);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Tutti i campi sono obbligatori",
        missingFields,
      });
    }

    const stats = await models.statPlayer.findByPk(id);
    if (!stats) {
      return res.status(400).json({ message: "Statistica non trovata!" });
    }

    const foundPlayer = await models.player.findByPk(playerId); // cerca il giocatore con playerId

    if (!foundPlayer) {
      return res.status(400).json({ message: "Giocatore non trovato!" });
    }

    await stats.update({
      id: id,
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
        id: id,
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
        playerName: foundPlayer.name, // nome del giocatore trovato
        playerSurname: foundPlayer.surname, // cognome del giocatore trovato
      },
    });
  } catch (error) {
    console.error("Errore durante l'aggiornamento:", error);
    res.status(500).json({ message: "Errore del server" });
  }
}

async function remove(req, res) {
  const id = getIdParam(req);
  await models.statPlayer.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
