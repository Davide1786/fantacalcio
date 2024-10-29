import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { statsPlayer } from "./reducer/statsPlayer.reducer";

import playerSlice from "./reducer/player.reducer";
import playerStatsSlice from "./reducer/statsPlayer.reducer";
import clubSlice from "./reducer/club.reducer";

/*
qui si combinano pe varie fette dello store..
posso iniziallizare lo stato sia cosi: statsPlayers: () => [],
sia cosi: che stats: statsPlayer, (modo corretto)
file(statsPlayer.reducer)
*/
const rootReducer = combineReducers({
  // statsPlayers: () => [],
  // stats: statsPlayer,
  player: playerSlice,
  statsPlayers: playerStatsSlice,
  club: clubSlice,
});

/*
lo store altro non è che un contenirore di funzioni;
al suo interno possiamo definire una key e una =>, che restituisce il valore associato a
quella key. Ogni chiave rappresenta una porzione del nostro store

Quindi semplifica la creazione dello store e include automaticamente middleware utili
come redux-thunk per gestire azioni asincrone.
*/
export const store = configureStore({
  // reducer: {
  //   // chiave: () => 'valore'
  // },

  reducer: rootReducer,
});
