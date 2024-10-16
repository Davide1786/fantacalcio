import axios from "axios";
import { useEffect, useState } from "react";

const Club = () => {
  const [clubList, setClubList] = useState([]);
  const [clubListPlayer, setClubListPlayer] = useState({});
  const [currentClub, setCurrentClub] = useState({
    name: "",
    stadium: "",
    derby: "",
    colors_home: "",
    colors_away: "",
  });

  const [showInfoClub, setShowInfoClub] = useState({}); // Stato per controllare le info dei club
  const [showPlayersList, setShowPlayersList] = useState({}); // Stato per controllare la lista dei giocatori
  const [editClub, setEditClub] = useState(false);

  const URL = `http://localhost:3001/api`;

  useEffect(() => {
    fetchClubList();
  }, []);

  // Recupera i dettagli di un singolo club
  const fetchSingleClub = async (clubId) => {
    try {
      const response = await axios.get(`${URL}/club/${clubId}`);
      console.log("RESP :", response.data);
      setClubListPlayer(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Recupera la lista completa dei club
  const fetchClubList = async () => {
    try {
      const response = await axios.get(`${URL}/club`);
      setClubList(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Invia i dati (aggiunta o modifica di un club)
  const sendData = async () => {
    try {
      if (editClub) {
        const response = await axios.put(`${URL}/club/${currentClub.id}`, {
          name: currentClub.name,
          stadium: currentClub.stadium,
          derby: currentClub.derby,
          colors_home: currentClub.colors_home,
          colors_away: currentClub.colors_away,
        });
        console.log("RESP :", response);

        // Aggiorna la lista dei club con il club modificato
        const updatedData = clubList.map((p) => (p.id === currentClub.id ? { id: currentClub.id, ...response.data.data } : p));

        setClubList(updatedData);
      } else {
        // Aggiungi un nuovo club
        await axios.post(`${URL}/club`, {
          name: currentClub.name,
          stadium: currentClub.stadium,
          derby: currentClub.derby,
          colors_home: currentClub.colors_home,
          colors_away: currentClub.colors_away,
        });
        fetchClubList();
      }
      setCurrentClub({ name: "", stadium: "", derby: "", colors_home: "", colors_away: "" });
      setEditClub(false); // Resetta la modalità di modifica
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
    }
  };

  // Recupera i dati di un club e li imposta nel form per la modifica
  const recoverInfoClub = (club) => {
    setCurrentClub(club);
    setEditClub(true);
  };

  // Alterna la visibilità delle informazioni del club selezionato
  const toggleInfoClub = (clubId) => {
    setShowInfoClub((prevState) => ({
      ...prevState,
      [clubId]: !prevState[clubId],
    }));
  };

  // Alterna la visibilità della lista dei giocatori del club selezionato
  const togglePlayersList = (clubId) => {
    setShowPlayersList((prevState) => ({
      ...prevState,
      [clubId]: !prevState[clubId],
    }));
    fetchSingleClub(clubId); // Recupera la lista dei giocatori solo quando serve
  };

  return (
    <div>
      <h3>Club</h3>

      <div>
        {clubList.map((club) => (
          <div key={club.id}>
            <h2>Nome Club: {club.name}</h2>
            <p onClick={() => recoverInfoClub(club)}>Modifica</p>

            {/* Sezione per visualizzare le info del club */}
            <div>
              <h3 style={{ display: "flex", borderBottom: "1px solid lightgrey", color: "orange" }} onClick={() => toggleInfoClub(club.id)}>
                Info Club
              </h3>
              {showInfoClub[club.id] && (
                <div>
                  <h3>Stadio: {club.stadium}</h3>
                  <h3>Derby: {club.derby}</h3>
                  <h3>Colore maglia casa: {club.colors_home}</h3>
                  <h3>Colore maglia trasferta: {club.colors_away}</h3>
                </div>
              )}
            </div>

            {/* Sezione per visualizzare la lista dei giocatori */}
            <div>
              <h3 style={{ display: "flex", borderBottom: "1px solid lightgrey", color: "orange" }} onClick={() => togglePlayersList(club.id)}>
                Lista giocatori
              </h3>
              {showPlayersList[club.id] && clubListPlayer.players && (
                <>
                  {clubListPlayer.players.map((pl) => (
                    <div key={pl.id}>
                      <h3>Nome: {pl.name}</h3>
                      <h3>Cognome: {pl.surname}</h3>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <h1>Inserisci i club</h1>
      <div style={{ marginTop: "60px" }}>
        <input type="text" value={currentClub.name} onChange={(e) => setCurrentClub({ ...currentClub, name: e.target.value })} placeholder="Nome" />
        <input type="text" value={currentClub.stadium} onChange={(e) => setCurrentClub({ ...currentClub, stadium: e.target.value })} placeholder="Stadio" />
        <input type="text" value={currentClub.derby} onChange={(e) => setCurrentClub({ ...currentClub, derby: e.target.value })} placeholder="Derby" />
        <input
          type="text"
          value={currentClub.colors_home}
          onChange={(e) => setCurrentClub({ ...currentClub, colors_home: e.target.value })}
          placeholder="Colore maglia Casa"
        />
        <input
          type="text"
          value={currentClub.colors_away}
          onChange={(e) => setCurrentClub({ ...currentClub, colors_away: e.target.value })}
          placeholder="Colore maglia Trasferta"
        />
      </div>

      <div>
        <button onClick={sendData}>{editClub ? "Salva modifica" : "Aggiungi"}</button>
      </div>
    </div>
  );
};

export default Club;
