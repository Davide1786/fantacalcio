const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("club", {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    stadium: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    derby: {
      type: DataTypes.STRING(50),
    },
    colors_home: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    colors_away: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  });
};
