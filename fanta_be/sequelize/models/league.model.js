const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("league", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    session: {
      type: DataTypes.TEXT,
    },
  });
};
