const { models } = require("../../sequelize"); // Assicurati di importare i modelli
const { getIdParam } = require("../helpers"); // Assicurati di avere questa funzione per gestire gli ID

// recupera tutti i player
async function getAll(req, res) {
  try {
    const players = await models.player.findAll();
    res.status(200).json(players);
  } catch (error) {
    console.error("Errore durante il recupero dei giocatori:", error);
    res.status(500).json({ error: "Si è verificato un errore durante il recupero dei giocatori" });
  }
}

// crea un singolo player
async function create(req, res) {
  const { name, surname, age, nationality, role, price_player, info } = req.body; // clubName

  // 1. Verifica che l'ID non sia stato fornito manualmente
  if (req.body.id) {
    return res.status(400).send("Bad request: L'ID non deve essere fornito, poiché viene determinato automaticamente dal database.");
  }

  try {
    // 2. Validazione dei campi
    if (!name || !surname || !age || !nationality || !role || !price_player || !info) {
      // || !clubName
      return res.status(400).json({ message: "Campi mancanti" });
    }

    // 3. Cerca il club per nome (commentato perché da te disabilitato)
    // const foundClub = await models.club.findOne({ where: { name: clubName } });

    // if (!foundClub) {
    //   return res.status(404).json({ error: "Club non trovato" });
    // }

    // 4. Creazione del giocatore
    const newPlayer = await models.player.create({
      name,
      surname,
      age,
      nationality,
      role,
      price_player,
      info,
      // id_club: foundClub.id, // Associa il club trovato (commentato per ora)
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

// Funzione per aggiornare un giocatore esistente
async function update(req, res) {
  const id = getIdParam(req); // Recupera l'ID dai parametri della richiesta

  // Verifica che l'ID nel corpo della richiesta corrisponda all'ID del parametro
  if (req.body.id && req.body.id !== id) {
    return res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
  }

  const { name, surname, age, nationality, role, price_player, info } = req.body; // Dati del giocatore da aggiornare

  // Verifica che tutti i campi obbligatori siano presenti
  if (!name || !surname || !age || !nationality || !role || !price_player || !info) {
    return res.status(400).json({ message: "Tutti i campi sono obbligatori!" });
  }

  try {
    // Trova il giocatore con l'id specificato
    const player = await models.player.findByPk(id);

    // Controlla se il giocatore esiste
    if (!player) {
      return res.status(404).json({ message: "Giocatore non trovato!" });
    }

    // Aggiorna i campi del giocatore
    await player.update({
      name,
      surname,
      age,
      nationality,
      role,
      price_player,
      info,
    });

    // Restituisci una risposta con i dati aggiornati
    res.status(200).json({
      message: "Giocatore aggiornato con successo!",
      data: {
        id: Number(id), // Puoi includere l'ID se necessario
        name,
        surname,
        age,
        nationality,
        role,
        price_player,
        info,
      },
    });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del giocatore:", error);
    res.status(500).json({ message: "Errore del server", error });
  }
}

// Funzione per eliminare un giocatore esistente
async function remove(req, res) {
  const id = getIdParam(req); // Recupera l'ID dai parametri della richiesta

  try {
    // Trova il giocatore con l'id specificato
    const player = await models.player.findByPk(id);

    // Controlla se il giocatore esiste
    if (!player) {
      return res.status(404).json({ message: "Giocatore non trovato!" });
    }

    // Elimina il giocatore
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
