const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("acutionBind", {
    bid_amount: { type: DataTypes.INTEGER }, //  Importo offerto da ogni singolo team
    winner: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: {
      type: DataTypes.ENUM(["available", "notAvailable"]),
      allowNull: false,
      defaultValue: "available",
    },
  });
};
