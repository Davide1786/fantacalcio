const { models } = require("../../sequelize");

async function create(req, res) {
  const { name, surname, email, nickname } = req.body;

  try {
    const newUser = await models.user.create({ name, surname, email, nickname });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Errore nella creazione dell'utente:", error);
    res.status(500).json({ error: "Errore nella creazione dell'utente" });
  }
}

module.exports = {
  create,
};
