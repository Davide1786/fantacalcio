import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: { playerList: [], status: "idle", error: null },
  reducers: {
    fetchListPlayerStart: (state) => {
      state.status = "loading";
    },
    fetchListPlayerSuccess: (state, action) => {
      state.status = "succeeded";
      state.playerList = action.payload;
    },
    fetchListPlayerFailure: (state, action) => {
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
      state.status = "succeeded";
      state.playerList = state.playerList.map((player) => (player.id === action.payload.id ? action.payload : player));
    },
    updatePlayerFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    deletePlayerStart: (state) => {
      state.status = "loading";
    },
    deletePlayerSuccess: (state, action) => {
      state.status = "succeeded";
      state.playerList = state.playerList.filter((player) => player.id !== action.payload.id);
    },
    deletePlayerFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

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
  deletePlayerStart,
  deletePlayerSuccess,
  deletePlayerFailure,
} = playerSlice.actions;

export default playerSlice.reducer;
