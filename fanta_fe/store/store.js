import { combineReducers, configureStore } from "@reduxjs/toolkit";

import playerSlice from "./reducer/player.reducer";
import playerStatsSlice from "./reducer/statsPlayer.reducer";
import clubSlice from "./reducer/club.reducer";

const rootReducer = combineReducers({
  player: playerSlice,
  statsPlayers: playerStatsSlice,
  club: clubSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
