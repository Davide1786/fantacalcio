import { createSlice } from "@reduxjs/toolkit";

const playerStatsSlice = createSlice({
  name: "statsSlice",
  initialState: {
    data: [],
    isShowCardStats: { id: "", boolean: false },
    isEditStats: { id: "", boolean: true },
    isEmpty: false,
    selectedPlayerStatsId: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setIsEmpty: (state, action) => {
      state.isEmpty = action.payload;
    },
    setIsShow: (state, action) => {
      state.isShowCardStats = { id: action.payload.id, boolean: action.payload.boolean };
    },
    setIsEditStats: (state, action) => {
      state.isEditStats = { id: action.payload.id, boolean: action.payload.boolean };
    },
    setSelectedPlayerStatsId: (state, action) => {
      state.selectedPlayerStatsId = action.payload;
    },
    // ============================== RECUPERA LISTA STATISTICHE =========================

    fetchListStatsPlayerStart: (state) => {
      state.status = "loading";
    },
    fetchListStatsPlayerSuccess: (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    },

    fetchListStatsPlayerFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    // ============================== RECUPERA SINGOLA STATISTICA =========================
    singlePlayerStatsStart: (state) => {
      state.status = "loading";
    },
    singlePlayerStatsSuccess: (state, action) => {
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
  setIsEmpty,
} = playerStatsSlice.actions;

export default playerStatsSlice.reducer;
