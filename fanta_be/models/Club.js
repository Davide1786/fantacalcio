const { DataTypes } = require("sequelize");

/**
 * @param {sequelize.Sequelize} sequelize
 * @returns {import('sequelize').ModelCtor<Model<any, any>>}
 */

module.exports = function (sequelize) {
  const Club = sequelize.define(
    "Club",
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false, // indica se il campo è obbligatorio Ad esempio, un campo "username"
        // allowNull: true, // La data di nascita può essere null, quindi campo non obbligatorio
      },
      year_of_foundation: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      trophy_cabinet: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      value_club: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      number_of_fans: {
        type: DataTypes.INTEGER,
      },
      stadium: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      derby: {
        type: DataTypes.STRING(50),
      },
      ranking_position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      legends: {
        type: DataTypes.STRING(255),
      },
      colors_home: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      colors_away: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "Clubs", // Specifica esplicitamente il nome della tabella
    }
  );

  return Club;
};
