const createTeamModel = require("./Team");
const createPlayerModel = require("./Player");

module.exports = function (sequelize) {
  const Team = createTeamModel(sequelize);
  const Player = createPlayerModel(sequelize);

  // Tabella ponte che rappresenta la relazione molti-a-molti tra giocatori e team-fantasy
  const Player_Team = sequelize.define(
    "Player_Team",
    // {
    // purchase_price: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // purchase_date: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    // }
    {
      id_team: {
        type: DataTypes.INTEGER,
      },
      id_player: {
        type: DataTypes.INTEGER,
      },
    }
  );

  // Definizione delle relazioni
  Team.belongsToMany(Player, { through: Player_Team, foreignKey: "id_team" });
  Player.belongsToMany(Team, { through: Player_Team, foreignKey: "id_player" });

  return Player_Team;
};
