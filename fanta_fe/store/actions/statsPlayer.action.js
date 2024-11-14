import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
