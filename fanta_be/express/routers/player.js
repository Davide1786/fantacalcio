const { models } = require("../../sequelize"); // Assicurati di importare i modelli

async function create(req, res) {
  const { name, surname, age, nationality, role, price_player, info, clubName } = req.body; // Aggiungi clubName al body

  try {
    // Cerca il club per nome
    const foundClub = await models.club.findOne({ where: { name: clubName } });

    if (!foundClub) {
      return res.status(404).json({ error: "Club non trovato" });
    }

    // Crea il giocatore con l'id_club associato
    const newPlayer = await models.player.create({
      name,
      surname,
      age,
      nationality,
      role,
      price_player,
      info,
      id_club: foundClub.id, // Associa l'id del club trovato
    });

    res.status(201).json(newPlayer);
  } catch (error) {
    console.error("Errore nella creazione del giocatore:", error);
    res.status(500).json({ error: "Errore nella creazione del giocatore" });
  }
}

module.exports = {
  create,
};
