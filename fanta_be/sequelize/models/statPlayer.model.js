const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  sequelize.define("statPlayer", {
    match_vote: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    average_rating: {
      type: DataTypes.DOUBLE(10, 2),
      defaultValue: 0,
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
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  });
};
