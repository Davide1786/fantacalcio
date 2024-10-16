/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Club from "./components/Club";
import PlayerStats from "./components/PlayerStats";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPlayerStats } from "../store/actions/statsPlayer.action";

function App() {
  const [data, setData] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState({
    name: "",
    surname: "",
    age: "",
    nationality: "",
    role: "",
    price_player: "",
    info: "",
    clubName: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [listPlayers, setListPlayers] = useState(false);
  const [loader, setLoader] = useState(false);
  // const { stats } = useSelector((state) => state);

  // const dispatch = useDispatch();

  const URL = `http://localhost:3001/api`;

  useEffect(() => {
    getData();
    // setRecoveStatsPlayer(dispatch(fetchPlayerStats()));
    // dispatch(fetchPlayerStats());
  }, []);

  // per la delete
  useEffect(() => {
    if (listPlayers) {
      getData();
      setListPlayers(false);
      setCurrentPlayer({
        name: "",
        surname: "",
        age: "",
        nationality: "",
        role: "",
        price_player: "",
        info: "",
        clubName: "",
      });
    }
  }, [listPlayers]);

  const getData = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`${URL}/player`);
      setData(response.data || []);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.error("Error fetching data:", error);
    }
  };

  const sendData = async () => {
    try {
      if (isEditMode) {
        const response = await axios.put(`${URL}/player/${currentPlayer.id}`, {
          name: currentPlayer.name,
          surname: currentPlayer.surname,
          age: currentPlayer.age,
          nationality: currentPlayer.nationality,
          role: currentPlayer.role,
          price_player: currentPlayer.price_player,
          info: currentPlayer.info,
          clubName: currentPlayer.club.name, // Usa il nome del club dall'oggetto `club`
        });

        // Aggiorna i dati dello stato con i dati aggiornati del giocatore
        const updatedData = data.map(
          (p) => (p.id === currentPlayer.id ? response.data.data : p) // Usa i dati dalla risposta
        );
        setData(updatedData);
      } else {
        const response = await axios.post(`${URL}/player`, {
          name: currentPlayer.name,
          surname: currentPlayer.surname,
          age: currentPlayer.age,
          nationality: currentPlayer.nationality,
          role: currentPlayer.role,
          price_player: currentPlayer.price_player,
          info: currentPlayer.info,
          clubName: currentPlayer.clubName, // Usa il nome del club dall'oggetto `club`
        });
        getData();
        setData([...data, { ...currentPlayer }]);
      }

      setCurrentPlayer({ name: "", surname: "", age: "", nationality: "", role: "", price_player: "", info: "", clubName: "" });
      setIsEditMode(false);
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`${URL}/player/${id}`);
      setListPlayers(true);
    } catch (error) {
      console.error("Errore nella cancellazione del calciatore:", error.response ? error.response.data : error.message);
    }
  };

  const handlerEdit = (player) => {
    setCurrentPlayer(player);
    setIsEditMode(true);
  };

  const [recoveStatsPlayer, setRecoveStatsPlayer] = useState([]);
  const [activeInfoPlayer, setActiveInfoPlayer] = useState(false);
  const [showInfoPlayer, setshowInfoPlayer] = useState(false);
  const [dataInfoStats, setDataInfoStats] = useState([]);

  console.log(recoveStatsPlayer, "recover");

  const handlerInfo = (par) => {
    // Verifica se il giocatore è già selezionato e le info sono visualizzate
    if (showInfoPlayer && dataInfoStats.length && dataInfoStats[0].id === par.id) {
      // Se il giocatore è lo stesso, chiudi le informazioni
      setshowInfoPlayer(false);
      setDataInfoStats([]); // Pulisci i dati
    } else {
      // Altrimenti, mostra le informazioni del nuovo giocatore
      const tmp = recoveStatsPlayer.filter((el) => el.playerId === par.id);

      const newObj = {
        ...par,
        stats: tmp,
      };

      setDataInfoStats([newObj]);
      setshowInfoPlayer(true); // Mostra le informazioni
    }
  };

  useEffect(() => {
    fetchPlayerStats();
    setActiveInfoPlayer(false);
    setshowInfoPlayer(false);
  }, [activeInfoPlayer]);

  const fetchPlayerStats = async () => {
    try {
      const response = await axios.get(`${URL}/playerStats`);
      setRecoveStatsPlayer(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [recoverInfoForStatsPlayer, setRecoveInfoStatsPlayer] = useState([]);
  const [test, setTest] = useState(false);

  const handlerRecoverInfoEdit = (info) => {
    setRecoveInfoStatsPlayer(info);
    // setTest((prev) => !prev);
    setTest(true);
  };

  const handlerDeleteInfoEdit = (par) => {
    console.log(par, "popro");
  };

  return (
    <div className="App">
      <h1>OkFanta</h1>
      <h1>FantaCalcio</h1>
      {showInfoPlayer &&
        dataInfoStats.map((el) => (
          <div key={el.id} style={{ border: "1px solid red", zIndex: 1 }}>
            <h2>
              {el.name} {el.surname}
            </h2>
            {/* Mostra le statistiche */}
            {el.role === "portiere"
              ? el.stats.map((el) => (
                  <div key={el.id}>
                    <p>Voto ultima partita : {el.match_vote}</p>
                    <p>Media voto: {el.average_rating}</p>
                    <p>Infortunato: {el.injuries ? "Yes" : "No"}</p>
                    <p>Cartellini rossi: {el.red_card}</p>
                    <p>cartellini gialli: {el.yellow_card}</p>
                    <p>Goals subiti: {el.number_goal_conceded}</p>
                    <p>Assists: {el.number_assist}</p>
                    <div>
                      {/* <button onClick={() => handlerRecoverInfoEdit(el)}>{test ? "Salva Modifica" : "Modifica"}</button> */}
                      <button onClick={() => handlerRecoverInfoEdit(el)}> Modifica</button>
                    </div>
                  </div>
                ))
              : el.stats.map((ele) => (
                  <div key={ele.id}>
                    <p>Voto ultima partita : {ele.match_vote}</p>
                    <p>Media voto: {ele.average_rating}</p>
                    <p>Infortunato: {ele.injuries ? "Yes" : "No"}</p>
                    <p>Cartellini rossi: {ele.red_card}</p>
                    <p>cartellini gialli: {ele.yellow_card}</p>
                    <p>Goals: {ele.number_goal}</p>
                    <p>Assists: {ele.number_assist}</p>
                    <div>
                      {/* <button onClick={() => handlerRecoverInfoEdit(ele)}>{test ? "Salva Modifica" : "Modifica"}</button> */}
                      <button onClick={() => handlerRecoverInfoEdit(el)}> Modifica</button>
                      <button onClick={() => handlerDeleteInfoEdit(el)}> Elimina</button>
                    </div>
                  </div>
                ))}
          </div>
        ))}

      {loader ? (
        <p>sto caricando...</p>
      ) : data.length === 0 ? (
        <p>nessun giocatore presente nel db</p>
      ) : (
        data.map((player, index) => (
          <div key={player.id || index}>
            <div style={{ display: "flex", borderBottom: "1px solid lightgrey", color: "orange" }}>
              <div>
                <span onClick={() => handlerInfo(player)}>{`${player.name} ${player.surname}`}</span>
                <span>{` ${player.role} `}</span>
                <span>{`${player.club?.name || player.club} `}</span>
                <span>{` `}</span>
                <span onClick={() => deleteData(player.id)} style={{ cursor: "pointer", color: "red" }}>{` X `}</span>
                <span onClick={() => handlerEdit(player)} style={{ cursor: "pointer", color: "red" }}>{`EDIT `}</span>
              </div>
            </div>
          </div>
        ))
      )}

      <h1>Inserisci i giocatori</h1>
      <div style={{ marginTop: "60px" }}>
        <input type="text" value={currentPlayer.name || ""} onChange={(e) => setCurrentPlayer({ ...currentPlayer, name: e.target.value })} placeholder="Nome" />
        <input
          type="text"
          value={currentPlayer.surname || ""}
          onChange={(e) => setCurrentPlayer({ ...currentPlayer, surname: e.target.value })}
          placeholder="Cognome"
        />
        <input type="number" value={currentPlayer.age || ""} onChange={(e) => setCurrentPlayer({ ...currentPlayer, age: e.target.value })} placeholder="Età" />
        <input
          type="text"
          value={currentPlayer.nationality || ""}
          onChange={(e) => setCurrentPlayer({ ...currentPlayer, nationality: e.target.value })}
          placeholder="Nazionalità"
        />
        <input
          type="text"
          value={currentPlayer.role || ""}
          onChange={(e) => setCurrentPlayer({ ...currentPlayer, role: e.target.value })}
          placeholder="Ruolo"
        />
        <input
          type="number"
          value={currentPlayer.price_player || ""}
          onChange={(e) => setCurrentPlayer({ ...currentPlayer, price_player: e.target.value })}
          placeholder="Prezzo"
        />
        <input type="text" value={currentPlayer.info || ""} onChange={(e) => setCurrentPlayer({ ...currentPlayer, info: e.target.value })} placeholder="Info" />
        <input
          type="text"
          value={isEditMode ? currentPlayer.club.name : currentPlayer.clubName}
          onChange={(e) => setCurrentPlayer(isEditMode ? { ...currentPlayer, club: { name: e.target.value } } : { ...currentPlayer, clubName: e.target.value })}
          placeholder="Squadra"
        />

        {/* <select
            value={currentPlayer.clubId || ""}
            onChange={(e) => setCurrentPlayer({ ...currentPlayer, clubId: e.target.value })}
          >
            <option value="" disabled>Seleziona un club</option>
              {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
          </select> */}
      </div>

      <div>
        <button onClick={sendData}>{isEditMode ? "Salva Modifica" : "Aggiungi"}</button>
      </div>

      <Club />
      <PlayerStats recoverInfoForStatsPlayer={recoverInfoForStatsPlayer} test={test} setTest={setTest} />
    </div>
  );
}

export default App;
