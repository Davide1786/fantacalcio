import axios from "axios";
import { useState, useEffect } from "react";

const PlayerStats = ({ recoverInfoForStatsPlayer, test, setTest }) => {
  const [data, setData] = useState([]);

  const [currentPlayerStats, setCurrentPlayerStats] = useState({
    match_vote: "",
    average_rating: "",
    injuries: false,
    red_card: "",
    yellow_card: "",
    available_for_selection: false,
    number_of_match: "",
    number_goal_conceded: "",
    number_goal: "",
    number_assist: "",
    playerName: "",
    playerSurname: "",
  });
  const URL = `http://localhost:3001/api`;

  // console.log(test, "🏆");
  console.log(recoverInfoForStatsPlayer, "🏆");

  useEffect(() => {
    fetchPlayerStats();
  }, []);

  useEffect(() => {
    if (test) {
      fetchPlayerSingleStats(recoverInfoForStatsPlayer);
    }
    // console.log("CAZOOOOOOOO");
  }, [test]);

  // Recupero la singola lista delle statistiche
  const fetchPlayerSingleStats = async (sta) => {
    try {
      const response = await axios.get(`${URL}/playerStats/${sta.id}`);
      // console.log("CAZOOOOOOOO", response);
      // console.log("CAZOOOOOOOO1111", recoverInfoForStatsPlayer);
      // console.log("sta", sta);

      setCurrentPlayerStats({
        ...currentPlayerStats,
        ...response.data,
        playerName: sta.name,
        playerSurname: sta.surname,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Recupero tutta la lista delle statistiche
  const fetchPlayerStats = async () => {
    try {
      const response = await axios.get(`${URL}/playerStats`);
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [message, setMessage] = useState("");

  const sendData = async () => {
    try {
      if (test) {
        const response = await axios.put(`${URL}/playerStats/${currentPlayerStats.id}`, currentPlayerStats);
        // console.log("SDASDAD", response);

        // Aggiorna la lista dei club con il club modificato
        const updatedData = data.map((p) => (p.id === currentPlayerStats.id ? { id: currentPlayerStats.id, ...response.data.data } : p));

        console.log(updatedData, "dsadasda");

        setData(updatedData);
        // const updateStats =
      } else {
        await axios.post(`${URL}/playerStats`, currentPlayerStats);
        setMessage("Statistics successfully added!");
        fetchPlayerStats();
        // setCurrentPlayerStats({
        //   match_vote: "",
        //   average_rating: "",
        //   injuries: false,
        //   red_card: "",
        //   yellow_card: "",
        //   available_for_selection: false,
        //   number_of_match: "",
        //   number_goal_conceded: "",
        //   number_goal: "",
        //   number_assist: "",
        //   playerName: "",
        //   playerSurname: "",
        // });
      }
      setTest(false);
      setCurrentPlayerStats({
        match_vote: "",
        average_rating: "",
        injuries: false,
        red_card: "",
        yellow_card: "",
        available_for_selection: false,
        number_of_match: "",
        number_goal_conceded: "",
        number_goal: "",
        number_assist: "",
        playerName: "",
        playerSurname: "",
      });
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setCurrentPlayerStats({
  //     ...currentPlayerStats,
  //     [name]: type === "checkbox" ? checked : value, // Handle checkbox separately
  //   });
  // };

  // console.log(data, "⛑️");

  return (
    <div>
      <h1>STATISTICHE</h1>
      <p>{message}</p>
      {/* <div>
        {data.length === 0 ? (
          <p>sto caricando</p>
        ) : (
          data.map((stats) => (
            <div key={stats.id}>
              <h3>Voto Partita: {stats.match_vote}</h3>
              <h3>Media voto: {stats.average_rating}</h3>
              <h3>Infortunato: {stats.injuries}</h3>
              <h3>Cartellini Rossi: {stats.red_card}</h3>
              <h3>Cartellini Gialli: {stats.yellow_card}</h3>
              <h3>Disponibile per la partita: {stats.available_for_selection}</h3>
              <h3>Partite Giocate: {stats.number_of_match}</h3>
              <h3>Gol Subiti: {stats.number_goal_conceded}</h3>
              <h3>Gol Fatti: {stats.number_goal}</h3>
              <h3>Assist: {stats.number_assist}</h3>
              <h3>Nome: {stats.player.name}</h3>
              <h3>Cognome: {stats.player.surname}</h3>
            </div>
          ))
        )}
      </div> */}

      <h1>Inserisci le statististiche</h1>
      <div style={{ marginTop: "60px" }}>
        {/* <input
          type="number"
          value={currentPlayerStats.match_vote || ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, match_vote: e.target.value })}
          // onChange={handleChange}
          placeholder="Voto Partita"
        /> */}

        <input
          type="number"
          value={currentPlayerStats.match_vote !== null ? currentPlayerStats.match_vote : ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, match_vote: e.target.value })}
          placeholder="Voto Partita"
        />

        <input
          type="number"
          // value={currentPlayerStats.average_rating || ""}
          value={currentPlayerStats.average_rating !== null ? currentPlayerStats.average_rating : ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, average_rating: e.target.value })}
          // onChange={handleChange}
          placeholder="Media voto"
        />
        <label htmlFor="Infortunato"> Infortunato</label>
        <br />
        {/* <input
          type="checkbox"
          id="Infortunato"
          name="Infortunato"
          value={currentPlayerStats.injuries}
          // onChange={handleChange}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, injuries: e.target.value })}
        /> */}

        <input
          type="checkbox"
          id="Infortunato"
          name="Infortunato"
          checked={currentPlayerStats.injuries}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, injuries: e.target.checked })}
        />

        <input
          type="number"
          // value={currentPlayerStats.red_card || ""}
          value={currentPlayerStats.red_card !== null ? currentPlayerStats.red_card : ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, red_card: e.target.value })}
          // onChange={handleChange}
          placeholder="Cartellini Rossi"
        />
        <input
          type="number"
          // value={currentPlayerStats.yellow_card || ""}
          value={currentPlayerStats.yellow_card !== null ? currentPlayerStats.yellow_card : ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, yellow_card: e.target.value })}
          // onChange={handleChange}
          placeholder="Cartellini Gialli"
        />
        <label htmlFor="DisponibilitaPartita"> Disponibile per la partita</label>
        <br />
        <input
          type="checkbox"
          id="DisponibilitaPartita"
          name="DisponibilitaPartita"
          value={currentPlayerStats.available_for_selection}
          // onChange={handleChange}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, available_for_selection: e.target.value })}
        />
        <input
          type="number"
          // value={currentPlayerStats.number_of_match || ""}
          value={currentPlayerStats.number_of_match !== null ? currentPlayerStats.number_of_match : ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, number_of_match: e.target.value })}
          // onChange={handleChange}
          placeholder="Partite Giocate"
        />
        <input
          type="number"
          // value={currentPlayerStats.number_goal_conceded || ""}
          value={currentPlayerStats.number_goal_conceded !== null ? currentPlayerStats.number_goal_conceded : ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, number_goal_conceded: e.target.value })}
          // onChange={handleChange}
          placeholder="Gol subiti"
        />
        <input
          type="number"
          // value={currentPlayerStats.number_goal || ""}
          value={currentPlayerStats.number_goal !== null ? currentPlayerStats.number_goal : ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, number_goal: e.target.value })}
          // onChange={handleChange}
          placeholder="Gol fatti"
        />
        <input
          type="number"
          // value={currentPlayerStats.number_assist || ""}
          value={currentPlayerStats.number_assist !== null ? currentPlayerStats.number_assist : ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, number_assist: e.target.value })}
          // onChange={handleChange}
          placeholder="Assist"
        />
        <input
          type="text"
          value={currentPlayerStats.playerName || ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, playerName: e.target.value })}
          // onChange={handleChange}
          placeholder="Nome"
        />
        <input
          type="text"
          value={currentPlayerStats.playerSurname || ""}
          onChange={(e) => setCurrentPlayerStats({ ...currentPlayerStats, playerSurname: e.target.value })}
          // onChange={handleChange}
          placeholder="Cognome"
        />
      </div>

      <div>
        <button onClick={sendData}>{test ? "Salva Modifica" : "Aggiungi"}</button>
      </div>
    </div>
  );
};

export default PlayerStats;
