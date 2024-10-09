/*
Sequelize: È un ORM (Object-Relational Mapper) per Node.js che facilita l'interazione con database relazionali.
Esso fornisce un'interfaccia più amichevole per creare modelli di dati,
eseguire query e gestire le relazioni tra le tabelle.

DataTypes: È un oggetto che contiene tutti i tipi di dati supportati da Sequelize
(stringhe, numeri, date, booleani, ecc.). Questi tipi vengono utilizzati per
definire le colonne delle tabelle nel database.
*/
const { DataTypes } = require("sequelize");

/*
module.exports = (sequelize) => {...}:
Questa riga di codice sta esportando una funzione.
Questa funzione prende in input un parametro chiamato sequelize.

sequelize:
Questo parametro rappresenta un'istanza di Sequelize, ovvero una connessione al mio database.
In altre parole, è attraverso sequelize che interagisco con il mio database.

All'interno della funzione:
Definisco un modello (ad esempio, Goal) utilizzando sequelize.define.
Questo modello rappresenta una tabella nel mio database.
*/

module.exports = (sequelize) => {
  /*
   Questo metodo di Sequelize (define) viene usato per definire un nuovo modello.
   Un modello rappresenta una tabella nel database.

   "goal": È il nome del modello, che corrisponderà al nome della tabella nel database.

   il secondo obj passato al metodo define, definisce i campi della tabella.
  */
  sequelize.define("goal", {
    minute: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 150,
      },
    },
    // vengono generati automaticamente
    // id_player: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    // id_team: {
    //   type: DataTypes.INTEGER,
    // },
  });
};
