import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { statsPlayer } from "./reducer/statsPlayer.reducer";

/*
qui si combinano pe varie fette dello store..
posso iniziallizare lo stato sia cosi: statsPlayers: () => [],
sia cosi: che stats: statsPlayer, (modo corretto)
file(statsPlayer.reducer)
*/
const rootReducer = combineReducers({
  // statsPlayers: () => [],
  stats: statsPlayer,
});

/*
lo store altro non è che un contenirore di funzioni;
al suo interno possiamo definire una key e una =>, che restituisce il valore associato a
quella key. Ogni chiave rappresenta una porzione del nostro store
*/
export const store = configureStore({
  // reducer: {
  //   // chiave: () => 'valore'
  // },

  reducer: rootReducer,
});
