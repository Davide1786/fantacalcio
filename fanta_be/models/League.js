const { DataTypes } = require("sequelize");

/**
 * @param {sequelize.Sequelize} sequelize
 * @returns {import('sequelize').ModelCtor<Model<any, any>>}
 */

module.exports = function (sequelize) {
  const League = sequelize.define(
    "League",
    {
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
    },
    {
      tableName: "Leagues", // Specifica esplicitamente il nome della tabella
    }
  );

  return League;
};
