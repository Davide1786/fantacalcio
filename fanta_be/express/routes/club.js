const { models } = require("../../sequelize"); // Importa i modelli
const { getIdParam } = require("../helpers"); // Assicurati di avere questa funzione per gestire gli ID

// recupera tutti i club
async function getAll(req, res) {
  try {
    const club = await models.club.findAll({
      // include: [
      //   {
      //     model: models.player,
      //     attributes: ["name", "surname"], // Prendi le tabelle che servono
      //   },
      // ],
    });
    res.status(200).json(club);
  } catch (error) {
    console.error("Errore durante il recupero dei club:", error);
    res.status(500).json({ error: "Si è verificato un errore durante il recupero dei club" });
  }
}

// crea il club
async function create(req, res) {
  const { name, stadium, derby, colors_home, colors_away } = req.body;
  // Controlla se è stato fornito un ID
  if (req.body.id) {
    return res.status(400).send("Bad request: L'ID non deve essere fornito, poiché viene determinato automaticamente dal database.");
  }

  try {
    if (!name || !stadium || !derby || !colors_home || !colors_away) {
      return res.status(400).json({ message: "Campi mancanti 111" });
    }
    // const newClub = await models.club.create(req.body);
    // res.status(201).json(newClub); // Restituisce il club creato

    const normalizedName = name ? name.trim().toLowerCase() : "";

    // Verifica se un altro giocatore esiste con lo stesso nome e cognome
    const existingClub = await models.club.findOne({
      where: {
        name: normalizedName,
        // id: { [Op.ne]: id }, // Esclude l'ID del giocatore correntes
      },
    });

    // Controlla se esiste già un club con lo stesso nome
    // const existingClub = await models.club.findOne({ where: { name } });

    if (existingClub) {
      return res.status(409).json({ message: "Un club con lo stesso nome esiste già" });
    }

    // Creazione del club
    const newClub = await models.club.create({
      name,
      stadium,
      derby,
      colors_home,
      colors_away,
    });

    // Risposta con il club creato
    res.status(201).json(newClub);
  } catch (error) {
    console.error("Errore nella creazione del Club:", error);
    res.status(500).json({ error: "Errore nella creazione del Club" });
  }
}

// recupera il singolo club
async function getById(req, res) {
  try {
    const id = getIdParam(req);
    const club = await models.club.findByPk(id, {
      include: [
        {
          model: models.player,
          attributes: ["name", "surname"], // Prendi i campi che ti servono dai giocatori
        },
      ],
    });

    if (club) {
      res.status(200).json(club);
    } else {
      res.status(404).send("404 - Not found");
    }
  } catch (error) {
    console.error("Errore durante il recupero del club:", error);
    res.status(500).json({ error: "Si è verificato un errore durante il recupero del club" });
  }
}

// aggiorna il singolo club
async function update(req, res) {
  const id = getIdParam(req);
  // Accetta l'UPDATE solo se il parametro `:id` corrisponde all'ID nel corpo
  const { name, stadium, derby, colors_home, colors_away } = req.body;

  if (req.body.id === id) {
    return res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
  }

  try {
    if (!name || !stadium || !derby || !colors_home || !colors_away) {
      return res.status(400).json({ message: "Tutti i campi sono obbligatori" });
    }

    const club = await models.club.findByPk(id);

    if (!club) {
      return res.status(400).json({ message: "Club non torvato!" });
    }

    const foundClub = await models.club.findOne({ where: { name: name } });

    if (foundClub && foundClub.id !== club.id) {
      return res.status(400).json({ message: "Esiste già un club con questo nome." });
    }

    await club.update({
      name,
      stadium,
      derby,
      colors_home,
      colors_away,
    });

    res.status(200).json({
      message: "Club aggiornato",
      data: {
        name,
        stadium,
        derby,
        colors_home,
        colors_away,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "non ci sonon!!!" });
  }
}

async function remove(req, res) {
  const id = getIdParam(req);
  await models.club.destroy({
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
