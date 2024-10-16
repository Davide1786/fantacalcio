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

import { createReducer } from "@reduxjs/toolkit";
import { fetchPlayerStats } from "../actions/statsPlayer.action";

// export const statsPlayer = createReducer(
//   [],
//   (builder) => builder.addCase(fetchPlayerStats.fulfilled, (state, action) => state + action.payload) // Aggiorna lo state con i dati recuperati
// );

export const statsPlayer = createReducer([], (builder) =>
  builder.addCase(fetchPlayerStats.fulfilled, (state, action) => {
    return action.payload; // Sostituisci lo stato precedente con i nuovi dati
  })
);
