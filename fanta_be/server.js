const express = require("express"); // importa express che è un framework!
// const mysql = require("mysql2"); // importa mysql2
const app = express(); // crea istanza di express. ora posso accedere a tutti i metodi
const port = 3001; // porta del mio DB
const cors = require("cors");

const { Sequelize } = require("sequelize"); // Importa Sequelize ORM, serve per la gestione delle query
// const routes = require("./router"); // Importa le route. questo ("./router") indica che sto entrando nelle cartelle
const routes = require("./routers/router"); // Importa le route. questo ("./router") indica che sto entrando nelle cartelle

// Abilita CORS per tutte le richieste
app.use(cors());
app.use(express.json()); // Aggiungo questo middleware per gestire JSON

// Configura il database con Sequelize
const sequelize = new Sequelize("app_fantacalcio", "davide", "davide123", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

// Verifica la connessione
sequelize
  .authenticate()
  .then(() => console.log("Connessione a MySQL con Sequelize riuscita"))
  .catch((error) => console.error("Errore di connessione:", error));

// Utilizza le route importate tramite express.js, monto il router nell'applicazione: attraverso il percorso /
/*
In pratica, sta dicendo all'applicazione:
"Per qualsiasi richiesta che arrivi, controlla prima se corrisponde a una delle route
definite nel router che sto per fornire, ovvero load()."
*/
app.use("/", routes.load(sequelize));

app.listen(port, () => {
  // ascolta la porta
  // Ascoltare sulla porta
  console.log("serveAttivo");

  // sincronizzo tutte le operazioni sul DB
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log("Database e tabelle sincronizzate!");
    })
    .catch((error) => console.error("Errore durante la sincronizzazione:", error));
});

// ===================================================

// const express = require("express"); // importa express
// const mysql = require("mysql2"); // importa mysql2
// const app = express(); // crea istanza di express. ora posso accedere a tutti i metodi
// const port = 3001;
// const cors = require("cors");

// const { Sequelize } = require("sequelize"); // Importa Sequelize
// const routes = require("./router"); // Importa le route. questo ("./router") indica che sto entrando nelle cartelle

// // Abilita CORS per tutte le richieste
// app.use(cors());
// app.use(express.json()); // Aggiungi questo middleware per gestire JSON

// // Configura il database con Sequelize
// const sequelize = new Sequelize("app_fantacalcio", "davide", "davide123", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
// });

// // Verifica la connessione
// sequelize
//   .authenticate()
//   .then(() => console.log("Connessione a MySQL con Sequelize riuscita"))
//   .catch((error) => console.error("Errore di connessione:", error));

// // Sincronizza i modelli con il database
// // sequelize
// //   .sync()
// //   .then(() => {
// //     console.log("Database e tabelle sincronizzate!");
// //   })
// //   .catch((error) => console.error("Errore durante la sincronizzazione:", error));

// // sequelize
// //   .sync({ force: true }) // Forza la ricreazione delle tabelle
// //   .then(() => console.log("Database e tabelle sincronizzate!"))
// //   .catch((error) => console.error("Errore durante la sincronizzazione:", error));

// // const db = mysql.createConnection({
// //   host: "localhost", // Assicurati che l'host sia 'localhost'
// //   user: "root", // root di default
// //   password: "supremoBoss123", // Password definita sul file docker-compose
// //   database: "app_fantacalcio", // Il nome del database che ho creato
// // });

// // Utilizza le route importate
// app.use("/", routes.load(sequelize));

// app.listen(port, () => {
//   // Ascoltare sulla porta
//   console.log("serveAttivo");
//   sequelize
//     .sync()
//     .then(() => {
//       console.log("Database e tabelle sincronizzate!");
//     })
//     .catch((error) => console.error("Errore durante la sincronizzazione:", error));

//   // Connetti a MySQL
//   // db.connect((err) => {
//   //   if (err) {
//   //     console.error("Errore di connessione al database:", err);
//   //     return;
//   //   }
//   //   console.log("Connesso al database MySQL");
//   // });
// });
