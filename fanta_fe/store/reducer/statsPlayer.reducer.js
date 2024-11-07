/*
un reducer e una funzione che inizializzerà una piccola porzione di store,
in questo caso statsPlayer, è lo modificherà sulla base di un azione

-----------------------------------QUESTO é IL VECCHIO MODO--------------------------------------

un reducer viene invocato ad ogni dispatch, infatti inserendo un console.log, nella funzione,
sarà stampato è processato 3 volte.

export function statsPlayer(state, action) {
  console.log("reducer");
  return [];
}

Oltre ad essere processato, riceverà 2 valori: state-attuale(state) e l'azione(action).

Effettuando nuovamente un log, vediamo che all'avvio ci sono 3 azioni dove lo stato
ancora non è definito. In questo caso se invoco il reducer, vedrò un array vuoto
perchè è cio che mi ritorna.

export function statsPlayer(state, action) {
  console.log(state, action);
  return [];
}

Inoltre posso anche inizializzare lo state direttamente per non ricevere lo stato iniziale
non definito:

export function statsPlayer(state = [], action) {
  console.log("reducer", state, action);
  return state;
}

Tuttavia, invocando l'azione statsPlayer, lo stato rimane sempre un array vuoto,
perchè viene restituito sempre il valore di default. Qui entra in gioco lo switch:
ES: switch(action.type) {case esempio.type: return state + action.payload} etc...

-----------------------------------QUESTO é IL NUOVO MODO TOOLKIT--------------------------------------

creo un nuovo reducer, come costante e uso la funzionalita createReducer, che riceverà come primo paramentro
il valore di inizializzazione dello stato, in questo caso un [] e come secondo paramentro, vuole un obj di
configurazione, in cui abbiamo un key, che è il nostro tipo di azione e il valore è la funzione che verrà invocata
quando viene dispacciata quell'azione:

export const statsPlayer = createReducer([], {
  [esempio.type]: (state, action) => state + action.payload
  })

  Questo è un modo molto valido per eseguire i reducer...ma si può fare di meglio:
  si crea sempre 1 const dove salvare il nostro reduce, usiamo sempre il metodo createReducer
  dove passiamo come 1° par, sempre il nostro valore iniziale, ma come 2° par, passiamo una funzione
  dalla quale otteniamo un obj builder, che ci permette tramite degli .addCase(), di definire l'azione che
  dobbiamo intercettare e invocare la funzione di aggiornameto, che riceve (state, action) ed esegue la modifica
  -----------------------------------QUESTO é IL NUOVO MODO TOOLKIT OTTIMIZZATO--------------------------------------

export const statsPlayer = createReducer([], builder =>
  builder
  .addCase('esempio', (state, action) => state + action.payload)
)
*/

// export const statsPlayer = createReducer([], (builder) => builder.addCase("recoverStats", (state, action) => state + action.payload));

import { createReducer, createSlice } from "@reduxjs/toolkit";
// import { fetchPlayerStats } from "../actions/statsPlayer.action";

// export const statsPlayer = createReducer(
//   [],
//   (builder) => builder.addCase(fetchPlayerStats.fulfilled, (state, action) => state + action.payload) // Aggiorna lo state con i dati recuperati
// );

// export const statsPlayer = createReducer([], (builder) =>
//   builder.addCase(fetchPlayerStats.fulfilled, (state, action) => {
//     return action.payload; // Sostituisci lo stato precedente con i nuovi dati
//   })
// );

const playerStatsSlice = createSlice({
  // serve per definire facilmente una porzione di stato in Redux con reducers e actions.
  name: "statsSlice", // Definisce il nome della slice, usato per identificare actions e reducers.
  /*
  Definisce lo stato iniziale della slice con 3 proprietà:
    data: []: Array vuoto per contenere i dati dei players.
    status: "idle": Indica lo stato iniziale (inattivo).
    error: null: Nessun errore iniziale.
  */
  initialState: {
    data: [],
    // isShowCardStats: false,
    isShowCardStats: { id: "", boolean: false },
    isEditStats: { id: "", boolean: true },
    selectedPlayerStatsId: null,
    status: "idle",
    error: null,
  },
  reducers: {
    // ============== show ======================
    setIsShow: (state, action) => {
      // state.isShowCardStats = action.payload;
      state.isShowCardStats = { id: action.payload.id, boolean: action.payload.boolean };
    },
    setIsEditStats: (state, action) => {
      state.isEditStats = { id: action.payload.id, boolean: action.payload.boolean };
    },
    setSelectedPlayerStatsId: (state, action) => {
      state.selectedPlayerStatsId = action.payload;
    },
    // ============================== RECUPERA LISTA STATISTICHE =========================
    // Funzioni che modificano lo stato della slice in base alle azioni.
    fetchListStatsPlayerStart: (state) => {
      // Cambia lo stato in "loading" quando si inizia a recuperare i dati.
      state.status = "loading";
    },
    fetchListStatsPlayerSuccess: (state, action) => {
      // Aggiorna lo stato con i dati ricevuti dall'API e cambia lo stato in "succeeded".
      state.status = "succeeded";
      state.data = action.payload;
      // ========== prova
      // state.status = "succeeded";
      // state.data = action.payload.map((stat) => ({
      //   ...stat,
      //   playerId: stat.playerId, // Verifica che ogni statistica abbia il suo playerId
      // }));
    },

    fetchListStatsPlayerFailure: (state, action) => {
      // Aggiorna lo stato con l'errore e cambia lo stato in "failed".
      state.status = "failed";
      state.error = action.payload;
    },
    // ============================== RECUPERA SINGOLA STATISTICA =========================
    singlePlayerStatsStart: (state) => {
      state.status = "loading";
    },
    singlePlayerStatsSuccess: (state, action) => {
      console.log(action.payload, "000");

      state.status = "succeeded";
      state.data = action.payload.length > 0 ? action.payload : [];
    },
    singlePlayerStatsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // ============================== EDIT SINGOLA STATISTICA =========================

    editPlayerStatsStart: (state) => {
      state.status = "loading";
    },
    editPlayerStatsSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = state.data.map((stats) => (stats.id === action.payload.data.id ? { ...stats, ...action.payload.data } : stats));
      state.isEditStats = { id: "", boolean: false };
    },
    editPlayerStatsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // ============================== ADD SINGOLA STATISTICA =========================
    addPlayerStatsStart: (state) => {
      state.status = "loading";
    },
    addPlayerStatsSuccess: (state, action) => {
      state.status = "succeeded";
      // prendi tutte le vecchie e aggiungici anche la nuova!
      state.data = [...state.data, action.payload];
    },
    addPlayerStatsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // ============================== DELETE SINGOLA STATISTICA =========================
    deletePlayerStatsStart: (state) => {
      state.status = "loading";
    },
    deletePlayerStatsSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = state.data.filter((el) => el.id !== action.payload);
    },
    deletePlayerStatsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

// Queste azioni sono usate per comunicare con il reducer e indicare quale operazione deve compiere.
export const {
  fetchListStatsPlayerStart,
  fetchListStatsPlayerSuccess,
  fetchListStatsPlayerFailure,
  setIsShow,
  singlePlayerStatsStart,
  singlePlayerStatsSuccess,
  singlePlayerStatsFailure,
  addPlayerStatsStart,
  addPlayerStatsSuccess,
  addPlayerStatsFailure,
  setIsEditStats,
  editPlayerStatsStart,
  editPlayerStatsSuccess,
  editPlayerStatsFailure,
  setSelectedPlayerStatsId,
  deletePlayerStatsStart,
  deletePlayerStatsSuccess,
  deletePlayerStatsFailure,
} = playerStatsSlice.actions;

// Il reducer è la funzione principale che riceve lo stato attuale e un'azione, aggiornando lo stato in base all'azione ricevuta.
export default playerStatsSlice.reducer;

// const initState = {
//   listPlayer: [],
//   listStats: [],
// };

// createSlice({
//   name: "stats", // il nome dello slice, utile per distinguere le parti di stato.
//   initialState: initState, // lo stato iniziale.
//   reducers: { // gli aggiornamenti di stato definiti tramite funzioni riduttore
//     addPlayerToList: (state, action) => {
//       state.listPlayer = "newList"; // questo assegna un new stato e non si puo fare in redux normale
//  in toolkit si perchè ha sotto il cofano la libreria immer che gestisce limmutabilita per noi

//       // questo muta(aggiorna) lo stato, perche copio
//       // const newList = [...state.listPlayer] // ciro, pippo
//       // newList.push(action.payload) // ciro, pippo, pluto
//       // state.listPlayer = newList // ciro, pippo = // ciro, pippo, pluto
//     },

//     getPlayerToList: (state, action) => {

//     }
//   },
// });
