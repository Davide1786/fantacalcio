const { DataTypes } = require("sequelize");
const createTeamModel = require("./Team");
const createPlayerModel = require("./Player"); // Corretto il nome della funzione

module.exports = function (sequelize) {
  console.log("TEAM:", createTeamModel);
  console.log("PLAYER:", createPlayerModel);
  const Team = createTeamModel(sequelize);
  const Player = createPlayerModel(sequelize); // Utilizza il nome corretto

  const Goal = sequelize.define("Goal", {
    minute: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 150,
      },
    },
    id_player: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Player, // Il modello corretto
        key: "id", // Assumiamo che l'id del giocatore sia la chiave primaria
      },
    },
    id_team: {
      type: DataTypes.INTEGER,
      references: {
        model: Team, // Nome del modello associato
        key: "id",
      },
    },
  });

  Player.hasMany(Goal, { foreignKey: "id_player" });
  Goal.belongsTo(Player, { foreignKey: "id_player" });

  Team.hasMany(Goal, { foreignKey: "id_team" });
  Goal.belongsTo(Team, { foreignKey: "id_team" });

  return Goal;
};
