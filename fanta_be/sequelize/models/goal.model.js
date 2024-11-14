const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("goal", {
    minute: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 150,
      },
    },
  });
};
