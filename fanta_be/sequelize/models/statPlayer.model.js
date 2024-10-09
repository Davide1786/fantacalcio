const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  sequelize.define("statPlayer", {
    match_vote: {
      type: DataTypes.INTEGER,
      // allowNull: false, // Rende il campo obbligatorio (non può essere null)
      defaultValue: 0, // Imposta 0 come valore predefinito
      validate: {
        min: 0, // Convalida che il valore non sia negativo (almeno 0)
        // max: 10, // Convalida che il valore non superi 10
      },
    },
    average_rating: {
      type: DataTypes.DOUBLE(10, 2),
      defaultValue: 0, // Imposta 0 come valore predefinito
      validate: {
        min: 0,
      },
    },
    injuries: {
      type: DataTypes.BOOLEAN,
    },
    red_card: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    yellow_card: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    available_for_selection: {
      type: DataTypes.BOOLEAN,
    },
    number_of_match: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    number_goal_conceded: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    number_goal: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    number_assist: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Imposta 0 come valore predefinito
      validate: {
        min: 0, // Convalida che il valore non sia negativo (almeno 0)
      },
    },
    // id_player: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });
};
