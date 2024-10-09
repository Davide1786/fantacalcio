const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("matchSelection", {
    is_starter: {
      type: DataTypes.BOOLEAN,
    },
  });
};
