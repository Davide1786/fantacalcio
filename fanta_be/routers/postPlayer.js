const express = require("express");
const Player = require("../models/Player"); // Importa il modello Player
const Club = require("../models/Club"); // Importa il modello Club

module.exports = (sequelize) => {
  const player = Player(sequelize);
  const club = Club(sequelize);
  const router = express.Router();

  router.post("/players", async (req, res) => {
    const { name, surname, age, nationality, role, price_player, info, clubName } = req.body; // Aggiungi clubName al body

    try {
      // Cerca il club per nome

      /*
      await: aspetta la risoluzione della promessa.
      club: è il modello Sequelize per la tabella "Clubs".
      findOne: metodo di sequelize e cerca una riga nella tabella.
      { where: { name: clubName } }:
      specifica la condizione di ricerca, in questo caso name = clubName.
      */
      const foundClub = await club.findOne({ where: { name: clubName } });

      if (!foundClub) {
        return res.status(404).json({ error: "Club non trovato" });
      }

      // Crea il giocatore con l'id_club associato
      const newPlayer = await player.create({
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
  });

  return router;
};
