// import { createAction } from "@reduxjs/toolkit";

/*
REDUX OLD
Le azioni sono dispacciate dalla ui (il componente)
cos'è un azione? una semplice funzione che restituisce un obj con
un type, che è 1 stringa che identifica il type in modo univoco, ed eventualemente
un payload, che sono i parametri passati insieme all' azione!
ES:
export function incrementOld(value) {
  return { type: "increment", payload: value };
}
*/

/*
REDUX TOOLKIT
si esporta semplicemente una const che ha come valore il metodo
createAction() il quale prende come parametro il tipo di azione sotto
forma di stringa, portando con se l'eventuale payload (amount)

export const increment = createAction('increment', (amount) => ({
  payload: amount,
}));

PER EMETTERE UN AZIONE USIAMO HOOK useDispatch nella UI, ma l'azione non basta per modificare lo stato.
bisogna usare un reducer (file.statsPlayer.reducer.js)
*/

// export const recoverStats = createAction("stats/recoverStats", (stats) => ({
//   payload: stats,
// }));

// export const recoverStats = createAction("stats/recoverStats", (stats) => ({ payload: stats }));

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchPlayerStats = createAsyncThunk("stats/fetchPlayerStats", async () => {
//   const URL = `http://localhost:3001/api`;
//   const response = await axios.get(`${URL}/playerStats`);
//   return response.data || [];
// });

export const fetchPlayerStats = createAsyncThunk("stats/fetchPlayerStats", async () => {
  const URL = `http://localhost:3001/api`;
  try {
    const response = await axios.get(`${URL}/playerStats`);
    return response.data || [];
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    return [];
  }
});
