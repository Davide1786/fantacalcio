const express = require("express");

function load(sequelize) {
  const router = express.Router();

  // const updateUserRoute = require('./routes/user/updateUser')(sequelize);
  // const deleteUserRoute = require('./routes/user/deleteUser')(sequelize);

  /*
  Le parentesi (sequelize) indicano che chiamo una funzione.
  Che è quella che sto esportando dal modulo "getUser".
  sequelize è l'argomento che viene passato alla funzione esportata
  */
  const getUserRoute = require("./getUser")(sequelize);
  const createUserRoute = require("./postUser")(sequelize); // ok
  const createPlayerRoute = require("./postPlayer")(sequelize); // ok
  const createClubRoute = require("./postClub")(sequelize); // ok
  const createPlayerStatRoute = require("./postPlayerStats")(sequelize); // ok
  const createTeamRoute = require("./postTeam")(sequelize); // ok
  const createGoalRoute = require("./postGoal")(sequelize); // ok
  const createLeagueRoute = require("./postLeague")(sequelize); // ok

  // router.use('/users', updateUserRoute);  // PUT /users/:id
  // router.use('/users', deleteUserRoute);  // DELETE /users/:id
  /*
  router.use(getUserRoute); è un Middleware a cui passo solo 1 parametro
  "getUserRoute".
  ma volendo posso passare anche altri 2 par:
  i parametri sono: req, res, next
    router.use((getUserRoute, res, next) => {
    next();
  });
  */

  router.use(getUserRoute); // GET /users
  router.use(createUserRoute); // POST /users
  router.use(createPlayerRoute); // POST /player
  router.use(createClubRoute); // POST /club
  router.use(createPlayerStatRoute); // POST /club
  router.use(createTeamRoute); // POST /club
  router.use(createGoalRoute); // POST /club
  router.use(createLeagueRoute); // POST /club

  // Rotta per gestione 404
  router.all("*", (req, res) => {
    console.log(req);

    res.status(404).send(`<h1>Pagina non trovata</h1>`);
  });

  return router;
}

module.exports = { load };
