import { createSlice } from "@reduxjs/toolkit";

const clubSlice = createSlice({
  name: "club",
  initialState: {
    clubList: [], // Per la lista dei club
    selectedClub: null, // Per il singolo club
    status: "idle",
    error: null,
  },
  reducers: {
    // Fetch della lista dei club
    fetchClubListStart: (state) => {
      state.status = "loading";
    },
    fetchClubListSuccess: (state, action) => {
      state.status = "succeeded";
      // state.clubList = [...state.clubList, action.payload]; // Popola solo la lista dei club
      state.clubList = action.payload; // Popola solo la lista dei club
    },
    fetchClubListFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    // Fetch del singolo club
    fetchSingleClubStart: (state) => {
      state.status = "loading";
    },
    fetchSingleClubSuccess: (state, action) => {
      state.status = "succeeded";
      state.selectedClub = action.payload; // Popola solo il singolo club
    },
    fetchSingleClubFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    addNewClubStart: (state) => {
      state.status = "loading";
    },
    addNewClubSuccess: (state, action) => {
      let newClub = action.payload;
      state.status = "succeeded";
      state.clubList = [...state.clubList, newClub];
    },
    addNewClubFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    // Update del singolo club
    updateClubStart: (state) => {
      state.status = "loading";
    },
    updateClubSuccess: (state, action) => {
      // Aggiorna il club nella lista dei club
      state.status = "succeeded";
      state.clubList = state.clubList.map((club) => (club.id === action.payload.id ? action.payload : club));
      state.selectedClub = action.payload; // Aggiorna anche il singolo club selezionato
    },

    updateClubFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    // ============================== DELETE SINGOLO CLUB =========================
    deleteClubStart: (state) => {
      state.status = "loading";
    },
    deleteClubSuccess: (state, action) => {
      state.status = "succeeded";
      state.clubList = state.clubList.filter((el) => el.id !== action.payload);
    },
    deleteClubFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchClubListStart,
  fetchClubListSuccess,
  fetchClubListFailure,
  fetchSingleClubStart,
  fetchSingleClubSuccess,
  fetchSingleClubFailure,
  updateClubStart,
  updateClubSuccess,
  updateClubFailure,
  addNewClubStart,
  addNewClubSuccess,
  addNewClubFailure,
  deleteClubStart,
  deleteClubSuccess,
  deleteClubFailure,
} = clubSlice.actions;
export default clubSlice.reducer;
