import axios from "axios";

const URL = `http://localhost:3001/api`;

// ==================== PLAYER STATS ===================================================
// recupero statsPlayer
export const fetchPlayerStats = async () => {
  try {
    const response = await axios.get(`${URL}/playerStats`);
    return response.data || [];
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    return [];
  }
};
// recupera singola
export const fetchPlayerSingleStats = async (payload) => {
  try {
    const response = await axios.get(`${URL}/playerStats/${payload.id}`);
    const statsWithDetails = response.data.map((stat) => ({
      ...stat,
      playerName: payload.name,
      playerSurname: payload.surname,
      club: payload.club.name,
    }));
    return statsWithDetails || [];
  } catch (error) {
    console.error("Errore nel recupero dei dati:", error);
    return [];
  }
};
// edit statistica
export const editStatsPlayer = async (payload) => {
  try {
    const response = await axios.put(`${URL}/playerStats/${payload.id}`, {
      ...payload,
      id: payload.id,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Lancia l'errore per gestirlo nel thunk
  }
};
// add statistica
export const addStatsPlayer = async (payload) => {
  try {
    const response = await axios.post(`${URL}/playerStats`, {
      ...payload,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Lancia l'errore per gestirlo nel thunk
  }
};

// ==================== PLAYER ===================================================
// recupero player
export const fetchListPlayer = async () => {
  try {
    const response = await axios.get(`${URL}/player`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const addSinglePlayer = async (payload) => {
  try {
    const response = await axios.post(`${URL}/player`, {
      name: payload.name,
      surname: payload.surname,
      age: payload.age,
      nationality: payload.nationality,
      role: payload.role,
      price_player: payload.price_player,
      info: payload.info,
      clubName: payload.clubName, // Usa il nome del club dall'oggetto `club`
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Lancia l'errore per gestirlo nel thunk
  }
};

export const updateSinglePlayer = async (payload) => {
  try {
    const response = await axios.put(`${URL}/player/${payload.id}`, {
      name: payload.name,
      surname: payload.surname,
      age: payload.age,
      nationality: payload.nationality,
      role: payload.role,
      price_player: payload.price_player,
      info: payload.info,
      clubName: payload.clubId, // Usa il nome del club dall'oggetto `club`
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Lancia l'errore per gestirlo nel thunk
  }
};

// ==================== CLUB ===================================================
// recupero club
export const fetchClubList = async () => {
  try {
    const response = await axios.get(`${URL}/club`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// recupero singolo club
export const fetchSingleClub = async (payload) => {
  try {
    const response = await axios.get(`${URL}/club/${payload}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// aggiungi club
export const addedSingleClub = async (payload) => {
  try {
    const response = await axios.post(`${URL}/club`, {
      name: payload.name,
      stadium: payload.stadium,
      derby: payload.derby,
      colors_home: payload.colors_home,
      colors_away: payload.colors_away,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Lancia l'errore per gestirlo nel thunk
  }
};

// Modifica club
export const updateSingleClub = async (payload) => {
  try {
    const response = await axios.put(`${URL}/club/${payload.id}`, {
      name: payload.name,
      stadium: payload.stadium,
      derby: payload.derby,
      colors_home: payload.colors_home,
      colors_away: payload.colors_away,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error; // Lancia l'errore per gestirlo nel thunk
  }
};
