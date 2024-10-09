const { request } = require("express");

module.exports = (sequelize) => {
  sequelize.define("userLeague");
};
