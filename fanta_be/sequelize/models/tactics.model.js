const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tactics", {
    tactics_name: {
      type: DataTypes.STRING(10),
    },
    goalkeepers: {
      type: DataTypes.INTEGER,
    },
    defenders: {
      type: DataTypes.INTEGER,
    },
    midfielders: {
      type: DataTypes.INTEGER,
    },
    attackers: {
      type: DataTypes.INTEGER,
    },
  });
};
