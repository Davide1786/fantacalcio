/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Club from "./components/club/Club.jsx";

import { useDispatch, useSelector } from "react-redux";
// import { fetchPlayerStats } from "../store/actions/statsPlayer.action";
import { fetchListPlayer } from "./api/api.js";
// import { fetchListPlayerStart, fetchListPlayerSuccess, fetchListPlayerFailure } from "../store/reducer/statsPlayer.reducer";

// function App() {
//   // const data = useSelector((state) => state.data.data);

//   // const status = useSelector((state) => state.data.status);
//   // const error = useSelector((state) => state.data.error);
//   // const [data, setData] = useState([]);
//   const [currentPlayer, setCurrentPlayer] = useState({
//     name: "",
//     surname: "",
//     age: "",
//     nationality: "",
//     role: "",
//     price_player: "",
//     info: "",
//     clubName: "",
//   });
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [listPlayers, setListPlayers] = useState(false);
//   const [loader, setLoader] = useState(false);

//   const URL = `http://localhost:3001/api`;

//   useEffect(() => {
//     // getData();
//     // setRecoveStatsPlayer(dispatch(fetchPlayerStats()));
//     // dispatch(fetchPlayerStats());
//   }, []);

//   // per la delete
//   useEffect(() => {
//     if (listPlayers) {
//       getData();
//       setListPlayers(false);
//       setCurrentPlayer({
//         name: "",
//         surname: "",
//         age: "",
//         nationality: "",
//         role: "",
//         price_player: "",
//         info: "",
//         clubName: "",
//       });
//     }
//   }, [listPlayers]);

//   // const getData = async () => {
//   //   setLoader(true);
//   //   try {
//   //     const response = await axios.get(`${URL}/player`);
//   //     setData(response.data || []);
//   //     setLoader(false);
//   //   } catch (error) {
//   //     setLoader(false);
//   //     console.error("Error fetching data:", error);
//   //   }
//   // };

//   const sendData = async () => {
//     try {
//       if (isEditMode) {
//         const response = await axios.put(`${URL}/player/${currentPlayer.id}`, {
//           name: currentPlayer.name,
//           surname: currentPlayer.surname,
//           age: currentPlayer.age,
//           nationality: currentPlayer.nationality,
//           role: currentPlayer.role,
//           price_player: currentPlayer.price_player,
//           info: currentPlayer.info,
//           clubName: currentPlayer.club.name, // Usa il nome del club dall'oggetto `club`
//         });

//         // Aggiorna i dati dello stato con i dati aggiornati del giocatore
//         const updatedData = data.map(
//           (p) => (p.id === currentPlayer.id ? response.data.data : p) // Usa i dati dalla risposta
//         );
//         // setData(updatedData);
//       } else {
//         const response = await axios.post(`${URL}/player`, {
//           name: currentPlayer.name,
//           surname: currentPlayer.surname,
//           age: currentPlayer.age,
//           nationality: currentPlayer.nationality,
//           role: currentPlayer.role,
//           price_player: currentPlayer.price_player,
//           info: currentPlayer.info,
//           clubName: currentPlayer.clubName, // Usa il nome del club dall'oggetto `club`
//         });
//         // getData();
//         // setData([...data, { ...currentPlayer }]);
//       }

//       setCurrentPlayer({ name: "", surname: "", age: "", nationality: "", role: "", price_player: "", info: "", clubName: "" });
//       setIsEditMode(false);
//     } catch (error) {
//       console.error("Errore durante l'invio dei dati:", error);
//     }
//   };

//   const deleteData = async (id) => {
//     try {
//       await axios.delete(`${URL}/player/${id}`);
//       setListPlayers(true);
//     } catch (error) {
//       console.error("Errore nella cancellazione del calciatore:", error.response ? error.response.data : error.message);
//     }
//   };

//   const handlerEdit = (player) => {
//     setCurrentPlayer(player);
//     setIsEditMode(true);
//   };

//   const [recoveStatsPlayer, setRecoveStatsPlayer] = useState([]);
//   const [activeInfoPlayer, setActiveInfoPlayer] = useState(false);
//   const [showInfoPlayer, setshowInfoPlayer] = useState(false);
//   const [dataInfoStats, setDataInfoStats] = useState([]);

//   console.log(recoveStatsPlayer, "recover");

//   const handlerInfo = (par) => {
//     // Verifica se il giocatore è già selezionato e le info sono visualizzate
//     if (showInfoPlayer && dataInfoStats.length && dataInfoStats[0].id === par.id) {
//       // Se il giocatore è lo stesso, chiudi le informazioni
//       setshowInfoPlayer(false);
//       setDataInfoStats([]); // Pulisci i dati
//     } else {
//       // Altrimenti, mostra le informazioni del nuovo giocatore
//       const tmp = recoveStatsPlayer.filter((el) => el.playerId === par.id);

//       const newObj = {
//         ...par,
//         stats: tmp,
//       };

//       setDataInfoStats([newObj]);
//       setshowInfoPlayer(true); // Mostra le informazioni
//     }
//   };

//   useEffect(() => {
//     fetchPlayerStats();
//     setActiveInfoPlayer(false);
//     setshowInfoPlayer(false);
//   }, [activeInfoPlayer]);

//   const fetchPlayerStats = async () => {
//     try {
//       const response = await axios.get(`${URL}/playerStats`);
//       setRecoveStatsPlayer(response.data || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const [recoverInfoForStatsPlayer, setRecoveInfoStatsPlayer] = useState([]);
//   const [test, setTest] = useState(false);

//   const handlerRecoverInfoEdit = (info) => {
//     setRecoveInfoStatsPlayer(info);
//     // setTest((prev) => !prev);
//     setTest(true);
//   };

//   const handlerDeleteInfoEdit = (par) => {
//     console.log(par, "popro");
//   };

//   return (
//     <div className="App">
//       <h1>OkFanta</h1>
//       <h1>FantaCalcio</h1>

//       <Player />
//       <Club />
//       <PlayerStats recoverInfoForStatsPlayer={recoverInfoForStatsPlayer} test={test} setTest={setTest} />
//     </div>
//   );
// }

import Grid from "@mui/material/Grid2";
import Player from "./components/player/Player.jsx";
import PlayerStats from "./components/playerStats/PlayerStats.jsx";

function App() {
  const NAVIGATION = [
    {
      segment: "Creazone Database",
      title: "Dashboard",
    },
    {
      segment: "Teams",
      title: "Orders",
    },
    {
      segment: "Leghe",
      title: "Integrations",
    },
  ];

  return (
    <>
      <Grid className={"container"}>
        <Grid className={"wrapperApp"}>
          <Grid className={"sidebar"}>
            SIDEBAR
            {NAVIGATION.map((el, index) => (
              <ul key={index}>
                <li>{el.segment}</li>
              </ul>
            ))}
          </Grid>
          <Grid className={"main"}>
            {/* <main>MAIN</main> */}

            <Club />
            <Player />
            <PlayerStats />
            {/* <Grid>
              <Club />
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;

// ==================================
