const { models } = require("../../sequelize");

async function create(req, res) {
  const { name, description, start_date, end_date, status, session } = req.body;

  try {
    const newLeague = await models.league.create({
      name,
      description,
      start_date,
      end_date,
      status,
      session,
    });
    res.status(201).json(newLeague);
  } catch (error) {
    console.error("Errore nella creazione della lega:", error);
    res.status(500).json({ error: "Errore nella creazione della lega" });
  }
}

module.exports = {
  create,
};
