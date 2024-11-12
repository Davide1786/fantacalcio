const { models } = require("../../sequelize"); // Assicurati di importare i modelli
const { getIdParam } = require("../helpers"); // Assicurati di avere questa funzione per gestire gli ID

// recupera tutti i player
async function getAll(req, res) {
  try {
    const players = await models.player.findAll({
      include: [
        {
          model: models.club,
          attributes: ["name"], // Prendi solo il nome del club
        },
      ],
    });
    res.status(200).json(players);
  } catch (error) {
    console.error("Errore durante il recupero dei giocatori:", error);
    res.status(500).json({ error: "Si è verificato un errore durante il recupero dei giocatori" });
  }
}

// crea un singolo player
async function create(req, res) {
  // Log per vedere cosa arriva nel body
  console.log("Body della richiesta:", req.body);

  const { name, surname, age, nationality, role, price_player, info, clubName } = req.body;

  // 1. Verifica che l'ID non sia stato fornito manualmente
  if (req.body.id) {
    return res.status(400).send("Bad request: L'ID non deve essere fornito, poiché viene determinato automaticamente dal database.");
  }

  try {
    // 2. Validazione dei campi
    if (!name || !surname || !age || !nationality || !role || !price_player || !info || clubName === undefined) {
      return res.status(400).json({ message: "Campi mancanti" });
    }

    let clubId = null;

    // 3. Se il club non è "Svincolato", cerchiamo il club per nome
    if (clubName !== "Svincolato") {
      const foundClub = await models.club.findOne({ where: { name: clubName } });

      if (!foundClub) {
        return res.status(404).json({ error: "Club non trovato" });
      }

      // Imposta l'ID del club trovato
      clubId = foundClub.id;
    }

    // 4. Creazione del giocatore con clubId null se "Svincolato"
    const newPlayer = await models.player.create({
      name,
      surname,
      age,
      nationality,
      role,
      price_player,
      info,
      clubId: clubId,
    });

    // 5. Risposta con il giocatore creato
    res.status(201).json(newPlayer);
  } catch (error) {
    console.error("Errore nella creazione del giocatore:", error);
    res.status(500).json({ error: "Errore nella creazione del giocatore" });
  }
}

// Recupera un singolo giocatore in base al suo id
async function getById(req, res) {
  // const { id } = req.params;
  const id = getIdParam(req);

  try {
    // Usa findByPk per trovare il giocatore con l'id specificato
    const player = await models.player.findByPk(id);

    if (!player) {
      return res.status(404).json({ message: "Giocatore non trovato" });
    }

    res.status(200).json(player);
  } catch (error) {
    console.error("Errore durante il recupero del giocatore:", error);
    res.status(500).json({ error: "Si è verificato un errore durante il recupero del giocatore" });
  }
}

// Funzione per aggiornare un giocatore
async function update(req, res) {
  const id = getIdParam(req);
  const { name, surname, age, nationality, role, price_player, info, clubId, clubName } = req.body;

  if (req.body.id && req.body.id !== id) {
    return res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
  }

  try {
    const player = await models.player.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: "Giocatore non trovato!" });
    }

    // Se `clubId` è un numero valido, cerca il club. Altrimenti, salta questo controllo.
    if (clubId !== undefined && clubId !== null && clubId !== "svincolato") {
      const foundClub = await models.club.findOne({ where: { id: clubId } });
      if (!foundClub) {
        return res.status(404).json({ error: "Club non trovato" });
      }
    }

    // Costruisci l'oggetto di aggiornamento dinamicamente
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (surname !== undefined) updateData.surname = surname;
    if (age !== undefined) updateData.age = age;
    if (nationality !== undefined) updateData.nationality = nationality;
    if (role !== undefined) updateData.role = role;
    if (price_player !== undefined) updateData.price_player = price_player;
    if (info !== undefined) updateData.info = info;
    if (clubId === "svincolato") {
      updateData.clubId = null; // Imposta `clubId` a `null` se è "svincolato"
    } else if (clubId !== undefined) {
      updateData.clubId = clubId; // Imposta `clubId` se è un valore numerico
    }
    if (clubName !== undefined) updateData.clubName = clubName;

    await player.update(updateData);

    res.status(200).json({
      message: "Giocatore aggiornato con successo!",
      data: player,
    });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del giocatore:", error.message, error.stack);
    res.status(500).json({ message: "Errore del server", error: error.message });
  }
}

// Funzione per eliminare un giocatore
async function remove(req, res) {
  const id = getIdParam(req); // Recupera l'ID dai parametri della richiesta

  try {
    // Trova il giocatore con l'id specificato
    const player = await models.player.findByPk(id);

    // Controlla se il giocatore esiste
    if (!player) {
      return res.status(404).json({ message: "Giocatore non trovato!" });
    }

    // Elimina tutte le statistiche associate al giocatore
    await models.statPlayer.destroy({
      where: { playerId: id },
    });

    await player.destroy();

    // Restituisci una risposta di successo
    res.status(200).json({ message: "Giocatore eliminato con successo!" });
  } catch (error) {
    console.error("Errore durante l'eliminazione del giocatore:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
