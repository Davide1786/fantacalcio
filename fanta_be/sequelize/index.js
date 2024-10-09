const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");

/*
In un'app reale, devo mantenere l'URL di connessione al
database come variabile di ambiente.
*/
const sequelize = new Sequelize("app_fantacalcio", "davide", "davide123", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

// array che contiene i miei modelli, ovvero le mie funzioni
const modelDefiners = [
  require("./models/club.model"), // prendo il modello
  require("./models/goal.model"),
  require("./models/league.model"),
  require("./models/player.model"),
  require("./models/statPlayer.model"),
  require("./models/team.model"),
  require("./models/teamPlayer.model"),
  require("./models/user.model"),
];

/*
definisco tt i modelli(tabelle sul db) in base al loro file(contenuto)

Riassumendo:
Il ciclo for prende ogni funzione contenuta nell'array modelDefiners e la esegue,
passando come argomento l'oggetto sequelize. In questo modo, vengono creati tutti
i modelli di dati necessari per l'applicazione.

Un esempio più concreto:
Immagina che modelDefiners contenga due funzioni: una per creare il modello User
e un'altra per creare il modello Product. Il ciclo for eseguirà entrambe le funzioni,
creando così le tabelle users e products nel database.

Ad ogni iterazione, l'elemento corrente viene assegnato alla variabile modelDefiner.
Poiché gli elementi di modelDefiners sono delle funzioni, modelDefiner diventerà a
sua volta una funzione.
*/

for (const modelDefiner of modelDefiners) {
  /*
  La funzione riceve come input un oggetto chiamato sequelize,
  che è un'interfaccia per interagire con il database.
  */
  modelDefiner(sequelize);
}

// Eseguo qualsiasi configurazione extra dopo che i modelli sono definiti, come l'aggiunta di associazioni.
applyExtraSetup(sequelize);

module.exports = sequelize;
