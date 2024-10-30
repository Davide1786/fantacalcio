import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  // serve per definire facilmente una porzione di stato in Redux con reducers e actions.
  name: "player", // Definisce il nome della slice, usato per identificare actions e reducers.
  /*
  Definisce lo stato iniziale della slice con 3 proprietà:
    data: []: Array vuoto per contenere i dati dei players.
    status: "idle": Indica lo stato iniziale (inattivo).
    error: null: Nessun errore iniziale.
  */
  initialState: { playerList: [], status: "idle", error: null },
  reducers: {
    // Funzioni che modificano lo stato della slice in base alle azioni.
    fetchListPlayerStart: (state) => {
      // Cambia lo stato in "loading" quando si inizia a recuperare i dati.
      state.status = "loading";
    },
    fetchListPlayerSuccess: (state, action) => {
      // Aggiorna lo stato con i dati ricevuti dall'API e cambia lo stato in "succeeded".
      state.status = "succeeded";
      state.playerList = action.payload;
    },
    fetchListPlayerFailure: (state, action) => {
      // Aggiorna lo stato con l'errore e cambia lo stato in "failed".
      state.status = "failed";
      state.error = action.payload;
    },
    addNewPlayerStart: (state) => {
      state.status = "loading";
    },
    addNewPlayerSuccess: (state, action) => {
      let newPlayer = action.payload;
      state.status = "succeeded";
      state.playerList = [...state.playerList, newPlayer];
    },
    addNewPlayerFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    updatePlayerStart: (state) => {
      state.status = "loading";
    },
    updatePlayerSuccess: (state, action) => {
      // Aggiorna il player nella lista dei player
      state.status = "succeeded";
      state.playerList = state.playerList.map((player) => (player.id === action.payload.id ? action.payload : player));
      // state.selectedClub = action.payload; // Aggiorna anche il singolo player selezionato
    },
    updatePlayerFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

// Queste azioni sono usate per comunicare con il reducer e indicare quale operazione deve compiere.
export const {
  fetchListPlayerStart,
  fetchListPlayerSuccess,
  fetchListPlayerFailure,
  updatePlayerStart,
  updatePlayerSuccess,
  updatePlayerFailure,
  addNewPlayerStart,
  addNewPlayerSuccess,
  addNewPlayerFailure,
} = playerSlice.actions;

// Il reducer è la funzione principale che riceve lo stato attuale e un'azione, aggiornando lo stato in base all'azione ricevuta.
export default playerSlice.reducer;
