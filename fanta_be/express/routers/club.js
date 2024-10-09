const { models } = require("../../sequelize"); // Importa i modelli
const { getIdParam } = require("../helpers"); // Assicurati di avere questa funzione per gestire gli ID

async function getAll(req, res) {
  const clubs = await models.club.findAll(); // Assicurati che il nome del modello sia corretto
  res.status(200).json(clubs);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const club = await models.club.findByPk(id);
  if (club) {
    res.status(200).json(club);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function create(req, res) {
  // Controlla se è stato fornito un ID
  if (req.body.id) {
    res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`);
  } else {
    try {
      const newClub = await models.club.create(req.body);
      res.status(201).json(newClub); // Restituisce il club creato
    } catch (error) {
      console.error("Errore nella creazione del Club:", error);
      res.status(500).json({ error: "Errore nella creazione del Club" });
    }
  }
}

async function update(req, res) {
  const id = getIdParam(req);
  // Accetta l'UPDATE solo se il parametro `:id` corrisponde all'ID nel corpo
  if (req.body.id === id) {
    await models.club.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).end();
  } else {
    res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
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
