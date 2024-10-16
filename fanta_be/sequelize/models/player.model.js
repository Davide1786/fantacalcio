const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("player", {
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    nationality: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    price_player: { type: DataTypes.INTEGER },
    info: { type: DataTypes.TEXT },
    clubName: { type: DataTypes.TEXT },
  });
};
