const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  sequelize.define("team", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_player: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
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
};
