const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("eventCalendar", {
    gol_team_home: {},
    gol_team_away: {},
    date_event: {},
  });
};
