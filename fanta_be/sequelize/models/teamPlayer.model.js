const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "teamPlayer"

    /*
    le key vengono generate automaticamente da sequelize
    */

    // {
    //   id_team: {
    //     type: DataTypes.INTEGER,
    //   },
    //   id_player: {
    //     type: DataTypes.INTEGER,
    //   },
    // }
  );
};
