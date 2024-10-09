const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("acutionBind", {
    // id_player: {}, // giocatore
    // id_team: {}, // vari team possono fare un asta per lo stesso giocatore
    bid_amount: { type: DataTypes.INTEGER }, //  Importo offerto da ogni singolo team
    // bid_amount: { type: EN}, //  Importo offerto da ogni singolo team
    winner: { type: DataTypes.BOOLEAN, defaultValue: false }, // team che si aggiudica il player
    status: {
      type: DataTypes.ENUM(["available", "notAvailable"]), // "disponibile", "nonDisponibile"
      allowNull: false,
      defaultValue: "available", // disponibile
    },

    // bid_date: { type: DataTypes.INTEGER }, // Data e ora dell'offerta di ogni singolo team.
    // statusAsta: {
    //   type: Enum(["active", "closed"]), // "aperto", "chiuso"
    //   allowNull: false,
    //   defaultValue: "active", // aperta
    // },
  });
};
