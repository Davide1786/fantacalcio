import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

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
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [listPlayers, setListPlayers] = useState(false);
  const [loader, setLoader] = useState(false);

  const URL = `http://localhost:3001/api`;

  useEffect(() => {
    getData();
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
        });

        const updatedData = data.map((p) => (p.id === currentPlayer.id ? response.data.data : p));
        setData(updatedData);
      } else {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(`${URL}/player`, {
          name: currentPlayer.name,
          surname: currentPlayer.surname,
          age: currentPlayer.age,
          nationality: currentPlayer.nationality,
          role: currentPlayer.role,
          price_player: currentPlayer.price_player,
          info: currentPlayer.info,
        });
        getData();
        setData([...data, { ...currentPlayer }]);
      }
      setCurrentPlayer({ name: "", surname: "", age: "", nationality: "", role: "", price_player: "", info: "" });
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

  return (
    <div className="App">
      <h1>FantaCalcio</h1>

      {loader ? (
        <p>sto caricando...</p>
      ) : data.length === 0 ? (
        <p>nessun giocatore presente nel db</p>
      ) : (
        data.map((player, index) => (
          <div key={player.id || index}>
            <div style={{ display: "flex", borderBottom: "1px solid lightgrey", color: "orange" }}>
              <h5>{`${player.name} ${player.surname} ${player.role}`}</h5> {/* Assicurati di non usare 'club' se non esiste */}
              <span onClick={() => deleteData(player.id)} style={{ cursor: "pointer", color: "red" }}>
                x
              </span>
              <span onClick={() => handlerEdit(player)} style={{ cursor: "pointer", color: "red" }}>
                EDIT
              </span>
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
      </div>

      <div>
        <button onClick={sendData}>{isEditMode ? "Salva Modifica" : "Aggiungi"}</button>
      </div>
    </div>
  );
}

export default App;
