const express = require("express"); //  importo Express, il framework per creare server Node.js.
const cors = require("cors");
/*
Body-parser, è un middleware che permette di analizzare il corpo delle richieste HTTP,
utile per gestire dati inviati tramite POST, PUT, ecc.
Utilizzato per estrarre il corpo delle richieste JSON o URL-encoded.
*/
const bodyParser = require("body-parser");

/*
il file app richiede i vari moduli e l'importa nella const routes
attraverso la funzione require.
ciascun file contiene le funzioni per gestire le operazioni su queste entità
(come ottenere, creare, aggiornare o eliminare dati).
*/
const routes = {
  user: require("./routes/user"),
  club: require("./routes/club"),
  goal: require("./routes/goal"),
  league: require("./routes/league"),
  player: require("./routes/player"),
  playerStats: require("./routes/playerStats"),
  team: require("./routes/team"),
};

// crea istanza di express. ora posso accedere a tutti i metodi
const app = express();

app.use(cors());

/*
Queste righe configurano il middleware body-parser:
bodyParser.json(): Analizza i dati del corpo delle richieste in formato JSON e li trasforma in oggetti JavaScript.
bodyParser.urlencoded({ extended: true }): Consente di analizzare i dati del corpo delle richieste quando sono URL-encoded, come nei form HTML.
trasformano i dati JSON in oggetti JavaScript accessibili tramite req.body.

*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Analizza i dati del corpo delle richieste in formato JSON e li trasforma in oggetti JavaScript accessibili tramite req.body.
// app.use(express.json());

// Creiamo un wrapper per aggirare il problema degli errori asincroni che non vengono trasmessi correttamente.
/*
Questa funzione serve per gestire eventuali errori nelle funzioni asincrone.
Ogni volta che viene chiamata una funzione di routing (come getAll o create),
questa funzione cattura eventuali errori e li passa al middleware degli errori di Express.


Questa funzione è un wrapper che avvolge ogni handler (funzione che gestisce una rotta)
e si assicura che, se si verifica un errore asincrono, l'errore venga correttamente passato
al middleware di gestione degli errori di Express.

Normalmente, se si verifica un errore all'interno di getAll (Club), l'errore non verrebbe
catturato da Express, perché le funzioni async non gestiscono automaticamente gli errori.
La funzione makeHandlerAwareOfAsyncErrors risolve questo problema.
*/
function makeHandlerAwareOfAsyncErrors(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res); // Chiama la funzione effettiva
    } catch (error) {
      next(error); // Passa l'errore al middleware di gestione degli errori di Express
    }
  };
}

// We provide a root route just as an example

// Forniamo un percorso radice solo come esempio
app.get("/", (req, res) => {
  res.send(`
		<h2>Hello, Sequelize + Express!</h2>
		<p>Make sure you have executed <b>npm run setup-example-db</b> once to have a populated example database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/users'>/api/users</a> or <a href='/api/orchestras?includeInstruments'>/api/orchestras?includeInstruments</a>!</p>
		<p>To experiment with POST/PUT/DELETE requests, use a tool for creating HTTP requests such as <a href='https://github.com/jakubroztocil/httpie#readme'>HTTPie</a>, <a href='https://www.postman.com/downloads/'>Postman</a>, or even <a href='https://en.wikipedia.org/wiki/CURL'>the curl command</a>, or write some JS code for it with <a href='https://github.com/sindresorhus/got#readme'>got</a>, <a href='https://github.com/sindresorhus/ky#readme'>ky</a> or <a href='https://github.com/axios/axios#readme'>axios</a>.</p>
	`);
});

// Definiamo le API REST standard per ogni percorso (se esistono).
/*
Questa parte del codice è la chiave per collegare i moduli di routing come club.js e goal.js al server.
Per ciascuno dei moduli importati (ad esempio, club e goal), il ciclo for esamina le operazioni disponibili
(ad esempio, getAll, getById, create, update, remove) e associa le funzioni ai corrispondenti percorsi API.

Questo ciclo itera su tutte le rotte definite nell'oggetto routes.
Ogni chiave (routeName) rappresenta il nome della rotta (ad esempio, "club", "goal", "user", ecc.),
Ogni valore (routeController) è l'oggetto che contiene le funzioni per gestire quelle rotte
(ad esempio, getAll, getById, create, update, remove).

Esempio per club.js:
Se club.js ha una funzione getAll, viene creata una rotta GET su /api/club per ottenere tutti i club.
Se ha una funzione create, viene creata una rotta POST su /api/club per creare un nuovo club.

Esempio per goal.js:
Se goal.js ha una funzione create, viene creata una rotta POST su /api/goal per registrare un nuovo goal.
*/
for (const [routeName, routeController] of Object.entries(routes)) {
  if (routeController.getAll) {
    app.get(`/api/${routeName}`, makeHandlerAwareOfAsyncErrors(routeController.getAll));
  }
  if (routeController.getById) {
    app.get(`/api/${routeName}/:id`, makeHandlerAwareOfAsyncErrors(routeController.getById));
  }
  if (routeController.create) {
    app.post(`/api/${routeName}`, makeHandlerAwareOfAsyncErrors(routeController.create));
  }
  if (routeController.update) {
    app.put(`/api/${routeName}/:id`, makeHandlerAwareOfAsyncErrors(routeController.update));
  }
  if (routeController.remove) {
    app.delete(`/api/${routeName}/:id`, makeHandlerAwareOfAsyncErrors(routeController.remove));
  }
}

module.exports = app;
