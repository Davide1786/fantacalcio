import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListPlayer, fetchPlayerStats, addSinglePlayer, updateSinglePlayer, fetchPlayerSingleStats, addStatsPlayer, editStatsPlayer } from "../../api/api";
import {
  fetchListPlayerStart,
  fetchListPlayerSuccess,
  fetchListPlayerFailure,
  updatePlayerFailure,
  updatePlayerSuccess,
  updatePlayerStart,
  addNewPlayerStart,
  addNewPlayerSuccess,
  addNewPlayerFailure,
} from "../../../store/reducer/player.reducer";
import {
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
} from "../../../store/reducer/statsPlayer.reducer";
import style from "./player.module.scss";
import Grid from "@mui/material/Grid2";
import { Button, Typography, TextField, Checkbox, FormControl, InputLabel, Select, MenuItem, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faPerson, faChartColumn } from "@fortawesome/free-solid-svg-icons";

const Player = () => {
  const { isShowCardStats, singlePlayerStats, isEditStats, selectedPlayerStatsId } = useSelector((state) => state.statsPlayers);
  const { playerList, statsPlayers } = useSelector((state) => state.player);
  const { clubList, selectedClub, status } = useSelector((state) => state.club);

  const dispatch = useDispatch();
  const [currentPlayer, setCurrentPlayer] = useState({
    name: "",
    surname: "",
    age: "",
    nationality: "",
    role: "",
    price_player: "",
    info: "",
    clubName: "",
    clubId: "", // aggiungi l'ID del club qui
  });

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
  const [editPlayer, setEditPlayer] = useState(false);
  const [editPlayerStats, setEditPlayerStats] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState(""); // ID del club selezionato
  // const [selectedPlayerStatsId, setSelectedPlayerStatsId] = useState(""); // ID del club selezionato
  const [oldIdStats, setOldIdStats] = useState(null);
  // api
  const fetchPlayers = () => async () => {
    dispatch(fetchListPlayerStart());
    try {
      const responseData = await fetchListPlayer(); // Chiama l'API
      dispatch(fetchListPlayerSuccess(responseData)); // Aggiorna lo stato con i dati
    } catch (error) {
      dispatch(fetchListPlayerFailure(error.message)); // Gestisce l'errore
    }
  };

  const addPlayer = (payload) => async (dispatch) => {
    dispatch(addNewPlayerStart());
    try {
      const responseData = await addSinglePlayer(payload);
      dispatch(addNewPlayerSuccess(responseData));
    } catch (error) {
      dispatch(addNewPlayerFailure(error.message));
    }
  };

  const updatePlayer = (payload) => async (dispatch) => {
    dispatch(updatePlayerStart());
    try {
      const responseData = await updateSinglePlayer(payload);
      dispatch(updatePlayerSuccess(responseData));
    } catch (error) {
      dispatch(updatePlayerFailure(error.message));
    }
  };

  const addStats = (payload) => async (dispatch) => {
    dispatch(addPlayerStatsStart());
    try {
      const responseData = await addStatsPlayer(payload);
      dispatch(addPlayerStatsSuccess(responseData));
    } catch (error) {
      dispatch(addPlayerStatsFailure(error.message));
    }
  };

  const editStats = (payload) => async (dispatch) => {
    dispatch(editPlayerStatsStart());
    try {
      const responseData = await editStatsPlayer(payload);
      dispatch(editPlayerStatsSuccess(responseData));
    } catch (error) {
      dispatch(editPlayerStatsFailure(error.message));
    }
  };

  const recoverSingolStats = (payload) => async (dispatch) => {
    dispatch(singlePlayerStatsStart());
    try {
      const response = await fetchPlayerSingleStats(payload);
      dispatch(singlePlayerStatsSuccess(response));
    } catch (error) {
      dispatch(singlePlayerStatsFailure(error.message));
    }
  };

  useEffect(() => {
    dispatch(fetchPlayers());
  }, []);

  // after edit player
  useEffect(() => {
    if (isUpdating) {
      setIsUpdating(false);
      dispatch(fetchPlayers());
    }
  }, [isUpdating]);

  // refresh icon edit player
  useEffect(() => {
    if (editPlayer) {
      setSelectedClubId(currentPlayer.clubId); // Verifica che editPlayer.clubId sia definito
    }
  }, [editPlayer]);

  useEffect(() => {
    if (isEditStats.boolean && isEditStats.id) {
      setCurrentPlayerStats(isEditStats.id);
      // dispatch(setSelectedPlayerStatsId(isEditStats.id?.playerId));
      setEditPlayerStats(true);
    }
  }, [isEditStats]);

  //  click icon edit player
  const recoverInfoPlayer = (player) => {
    setCurrentPlayer({
      ...player,
      clubName: player.clubName,
      clubId: player.clubId,
    });

    setSelectedClubId(player.clubId);
    setEditPlayer(true);
  };

  // click select edit club player
  const handleChange = (event) => {
    const selectedClubId = event.target.value;
    const selectedClub = clubList.find((club) => club.id === selectedClubId);

    if (selectedClub) {
      setCurrentPlayer((prevState) => ({
        ...prevState,
        clubName: selectedClub.name,
        clubId: selectedClubId,
      }));
      setSelectedClubId(selectedClubId);
    }
  };

  const sendData = async () => {
    try {
      if (editPlayer) {
        dispatch(updatePlayer(currentPlayer));
        setIsUpdating(true);
      } else {
        dispatch(addPlayer(currentPlayer));
        setIsUpdating(true);
      }
      setSelectedClubId("");
      setCurrentPlayer({ name: "", surname: "", age: "", nationality: "", role: "", price_player: "", info: "", clubName: "" });
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
    }
  };

  // click select edit statsPlayer
  const handleChangeStatsPlayer = (event) => {
    const selectedPlayerStatsId = event.target.value;
    const selectedStats = playerList.find((player) => player.id === selectedPlayerStatsId);

    if (selectedStats) {
      setCurrentPlayerStats((prevState) => ({
        ...prevState,
        playerName: selectedStats.name,
        playerSurname: selectedStats.surname,
        playerId: selectedPlayerStatsId,
      }));
      dispatch(setSelectedPlayerStatsId(selectedPlayerStatsId));
    }
  };

  const sendDataStat = async () => {
    try {
      if (editPlayerStats) {
        dispatch(editStats(currentPlayerStats));
        setIsUpdating(true);
      } else if (editPlayerStats && isEditStats.boolean) {
        dispatch(setSelectedPlayerStatsId(isEditStats.id.id));
      } else {
        dispatch(addStats(currentPlayerStats));
        setIsUpdating(true);
      }
      dispatch(setSelectedPlayerStatsId(null));
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
      setEditPlayerStats(false);
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
    }
    console.log("Errore durante l'invio dei dati:", selectedPlayerStatsId);
  };

  const togglePlayersList = (player) => {
    if (oldIdStats === player.id) {
      // Se il giocatore selezionato è lo stesso, chiudi la vista delle statistiche
      dispatch(setIsShow(!isShowCardStats));
    } else {
      // Se il giocatore è diverso, aggiorna oldIdStats e recupera le nuove statistiche
      setOldIdStats(player.id);
      dispatch(recoverSingolStats(player));
      dispatch(setIsShow(true));
    }
  };

  const clean = () => {
    if (editPlayer) {
      setEditPlayer(false);
      setSelectedClubId("");
      setCurrentPlayer({ name: "", surname: "", age: "", nationality: "", role: "", price_player: "", info: "", clubName: "" });
    }
    setSelectedClubId("");
    setCurrentPlayer({ name: "", surname: "", age: "", nationality: "", role: "", price_player: "", info: "", clubName: "" });
    setEditPlayer(false);
  };

  const cleanStats = () => {
    if (editPlayerStats) {
      setEditPlayerStats(false);

      dispatch(setSelectedPlayerStatsId(null));

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
    }

    dispatch(setSelectedPlayerStatsId(null));

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
    setEditPlayerStats(false);
  };

  // Funzione generica per aggiornare lo stato
  const handleChangeStats = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setCurrentPlayerStats((prevStats) => ({ ...prevStats, [field]: value }));
  };

  return (
    <Grid className={style.containerPagePlayer}>
      <Grid className={style.wrapperPlayer}>
        <Grid className={style.boxInput}>
          <Grid className={style.playerInput}>
            <Typography variant="h6" component="h2">
              Crea giocatore
            </Typography>

            <Grid className={style.wrapperTextInput}>
              <Grid className={style.boxText}>
                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="name"
                    label="Nome"
                    variant="outlined"
                    value={currentPlayer.name}
                    onChange={(e) => setCurrentPlayer({ ...currentPlayer, name: e.target.value })}
                  />
                </Grid>
                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="surname"
                    label="Cognome"
                    variant="outlined"
                    value={currentPlayer.surname}
                    onChange={(e) => setCurrentPlayer({ ...currentPlayer, surname: e.target.value })}
                  />
                </Grid>
                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="age"
                    label="Età"
                    variant="outlined"
                    value={currentPlayer.age}
                    onChange={(e) => setCurrentPlayer({ ...currentPlayer, age: e.target.value })}
                  />
                </Grid>
                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="nationality"
                    label="Nazionalità"
                    variant="outlined"
                    value={currentPlayer.nationality}
                    onChange={(e) => setCurrentPlayer({ ...currentPlayer, nationality: e.target.value })}
                  />
                </Grid>
                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="role"
                    label="Ruolo"
                    variant="outlined"
                    value={currentPlayer.role}
                    onChange={(e) => setCurrentPlayer({ ...currentPlayer, role: e.target.value })}
                  />
                </Grid>
                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="price_player"
                    label="Prezzo"
                    variant="outlined"
                    value={currentPlayer.price_player}
                    onChange={(e) => setCurrentPlayer({ ...currentPlayer, price_player: e.target.value })}
                  />
                </Grid>
                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="info"
                    label="Info"
                    variant="outlined"
                    value={currentPlayer.info}
                    onChange={(e) => setCurrentPlayer({ ...currentPlayer, info: e.target.value })}
                  />
                </Grid>
                <Grid className={style.field_container}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Club</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedClubId} label="Club" onChange={handleChange}>
                      {clubList.map((club) => (
                        <MenuItem key={club.id} value={club.id}>
                          {club.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid className={style.wrapperBtn}>
              <Button onClick={clean} variant="contained" className={style.btn}>
                Pulisci campi
              </Button>
              <Button onClick={sendData} variant="contained" className={style.btn}>
                {editPlayer ? "Salva modifica" : "Crea giocatore"}
              </Button>
            </Grid>
          </Grid>

          {/* =========================== Crea statistiche giocatore */}
          <Grid className={style.statsInput}>
            <Typography variant="h6" component="h2">
              Crea statistiche giocatore
            </Typography>

            <Grid className={style.wrapperTextInput}>
              <Grid className={style.boxText}>
                <Grid className={style.field_container}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Giocatore</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedPlayerStatsId || ""}
                      label="Giocatore"
                      onChange={handleChangeStatsPlayer}>
                      {playerList.map((player) => (
                        <MenuItem key={player.id} value={player.id}>
                          {player.name + " " + player.surname}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="votoPartita"
                    label="Voto Partita"
                    variant="outlined"
                    value={currentPlayerStats.match_vote !== undefined ? currentPlayerStats.match_vote : ""}
                    onChange={handleChangeStats("match_vote")}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="mediaVoto"
                    label="Media Voto"
                    variant="outlined"
                    value={currentPlayerStats.average_rating !== undefined ? currentPlayerStats.average_rating : ""}
                    onChange={handleChangeStats("average_rating")}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="golFatti"
                    label="Gol Fatti"
                    variant="outlined"
                    value={currentPlayerStats.number_goal !== undefined ? currentPlayerStats.number_goal : ""}
                    onChange={handleChangeStats("number_goal")}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="assist"
                    label="Assist"
                    variant="outlined"
                    value={currentPlayerStats.number_assist !== undefined ? currentPlayerStats.number_assist : ""}
                    onChange={handleChangeStats("number_assist")}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="golSubiti"
                    label="Gol Subiti"
                    variant="outlined"
                    value={currentPlayerStats.number_goal_conceded !== undefined ? currentPlayerStats.number_goal_conceded : ""}
                    onChange={handleChangeStats("number_goal_conceded")}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="redCard"
                    label="Cartellini rossi"
                    variant="outlined"
                    value={currentPlayerStats.red_card !== undefined ? currentPlayerStats.red_card : ""}
                    onChange={handleChangeStats("red_card")}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="yellowCard"
                    label="Cartellini gialli"
                    variant="outlined"
                    value={currentPlayerStats.yellow_card !== undefined ? currentPlayerStats.yellow_card : ""}
                    onChange={handleChangeStats("yellow_card")}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="partiteGiocate"
                    label="Partite Giocate"
                    variant="outlined"
                    value={currentPlayerStats.number_of_match !== undefined ? currentPlayerStats.number_of_match : ""}
                    onChange={handleChangeStats("number_of_match")}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <FormControlLabel
                    control={<Checkbox checked={currentPlayerStats.available_for_selection ?? false} onChange={handleChangeStats("available_for_selection")} />}
                    label="Disponibilita Partita"
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <FormControlLabel
                    control={<Checkbox checked={currentPlayerStats.injuries ?? false} onChange={handleChangeStats("injuries")} />}
                    label="Infortunato"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid className={style.wrapperBtn}>
              <Button onClick={cleanStats} variant="contained" className={style.btn}>
                Pulisci campi
              </Button>
              <Button onClick={sendDataStat} variant="contained" className={style.btn}>
                {editPlayerStats ? "Salva modifica" : "Crea statistica"}
              </Button>
            </Grid>
          </Grid>

          {/* =========================== Crea statistiche giocatore */}
        </Grid>

        <Grid className={style.boxList}>
          <Grid className={style.wrapperListPlayer}>
            <Typography variant="h6" component="h2" style={{ color: "black" }}>
              Lista dei giocatori
            </Typography>
            {playerList?.map((player) => (
              <Grid className={style.boxListPlayer} key={player.id}>
                <ul className={style.listPlayer}>
                  <li className={style.singlePlayer}>
                    <Grid className={style.namePlayer}>
                      <span className={style.icon}>
                        <FontAwesomeIcon icon={faPerson} />
                      </span>
                      <span className={style.nameSurname}>
                        {player.name} {player.surname}
                      </span>
                      <span className={style.role}>{player.role}</span>
                      <span className={style.club}>{`${player.club?.name || player.club} `}</span>
                    </Grid>
                    <Grid className={style.wrapperBtn}>
                      <Button className={style.btnEdit} onClick={() => recoverInfoPlayer(player)} variant="text">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>
                      <Button className={style.btnEdit} onClick={() => togglePlayersList(player)} variant="text">
                        <FontAwesomeIcon icon={faChartColumn} />
                      </Button>
                      <Button
                        className={style.btnDelete}
                        // onClick={() => toggleInfoClub(club.id)}
                        variant="text">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </Grid>
                  </li>
                </ul>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Player;