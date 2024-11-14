const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");

const sequelize = new Sequelize("app_fantacalcio", "davide", "davide123", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

const modelDefiners = [
  require("./models/club.model"),
  require("./models/goal.model"),
  require("./models/league.model"),
  require("./models/player.model"),
  require("./models/statPlayer.model"),
  require("./models/team.model"),
  require("./models/teamPlayer.model"),
  require("./models/user.model"),
  require("./models/acutionBind.model"),
  require("./models/matchSelection.model"),
  require("./models/tactics.model"),
  require("./models/userLeague.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
