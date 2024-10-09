const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("calendar", {
    date_match: {
      type: DataTypes.DATE,
    },
    goals_club_home: {
      type: DataTypes.INTEGER,
    },
    goals_club_away: {
      type: DataTypes.INTEGER,
    },
  });
};
