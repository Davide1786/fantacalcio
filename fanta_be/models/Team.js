const { DataTypes } = require("sequelize");
const createUserModel = require("./User");
const createLeagueModel = require("./League");

module.exports = function (sequelize) {
  const User = createUserModel(sequelize);
  const League = createLeagueModel(sequelize);

  const Team = sequelize.define("Team", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_player: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0, // Assicurarsi che il numero di giocatori sia positivo
        max: 25,
      },
    },
    initial_credits_team: {
      type: DataTypes.INTEGER,
      default: 0,
      validate: {
        min: 0,
        max: 5000,
      },
    },
    final_credits_team: {
      type: DataTypes.INTEGER,
      default: 0,
      validate: {
        min: 0,
        max: 5000,
      },
    },
    colors_home_team: {
      type: DataTypes.STRING,
      default: "white",
    },
    colors_away_team: {
      type: DataTypes.STRING,
      default: "black",
    },
  });

  // User.hasMany(Team, { foreignKey: "id_user" });
  // Team.belongsTo(User, { foreignKey: "id_user" });

  // League.hasMany(Team, { foreignKey: "id_league" });
  // Team.belongsTo(League, { foreignKey: "id_league" });

  // Team.hasMany(Player, { foreignKey: "id_player" });
  // Team.belongsTo(League, { foreignKey: "id_league" });

  return Team;
};
