const { DataTypes } = require("sequelize");

/**
 * @param {sequelize.Sequelize} sequelize
 * @returns {import('sequelize').ModelCtor<Model<any, any>>}
 */

module.exports = function (sequelize) {
  /*
  Sequelize.define() è un metodo che serve a definire
  un modello (o un'entità) che rappresenta una tabella nel database.
  In altre parole, crea una rappresentazione in codice di una tabella
  che esiste (o che verrà creata) nel database.

  Questo codice crea un modello Sequelize chiamato User che rappresenta una tabella nel database.
  La tabella avrà le seguenti colonne:
  name (stringa) surname (stringa) email (stringa) nickname (stringa)
  Il nome della tabella nel database sarà "Users".

  un modello è come uno stampo, (biscotti).
  il nome "User" è il nome che decido di dare al mio stampo (PanDiStelle)
  name, surname etc sono gli ingredienti
  tableName: "Users" e il nome che assegno sul mio DB, il libro di ricette
  */
  const User = sequelize.define(
    "User",
    {
      name: { type: DataTypes.STRING },
      surname: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      nickname: { type: DataTypes.STRING },
    },
    {
      tableName: "Users", // Specifica esplicitamente il nome della tabella
    }
  );

  return User;
};
