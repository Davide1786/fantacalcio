import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListPlayer,
  addSinglePlayer,
  updateSinglePlayer,
  fetchPlayerSingleStats,
  addStatsPlayer,
  editStatsPlayer,
  deletePlayerApi,
  deleteStatsPlayer,
} from "../../api/api";
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
  deletePlayerFailure,
  deletePlayerSuccess,
  deletePlayerStart,
} from "../../../store/reducer/player.reducer";
import {
  setIsShow,
  singlePlayerStatsStart,
  singlePlayerStatsSuccess,
  singlePlayerStatsFailure,
  addPlayerStatsStart,
  addPlayerStatsSuccess,
  addPlayerStatsFailure,
  editPlayerStatsStart,
  editPlayerStatsSuccess,
  editPlayerStatsFailure,
  setSelectedPlayerStatsId,
  deletePlayerStatsStart,
  deletePlayerStatsSuccess,
  deletePlayerStatsFailure,
} from "../../../store/reducer/statsPlayer.reducer";
import style from "./player.module.scss";
import Grid from "@mui/material/Grid2";
import { Button, Typography, TextField, Checkbox, FormControl, InputLabel, Select, MenuItem, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faPerson, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { countryListAlpha2 } from "../../utility/nationality";
import { useFormik } from "formik";
import * as Yup from "yup";
import PortalSelect from "../portalSelect/PortalSelect";
import capitalizeWords from "../../utility/capitalizeFunction";
import PortalModal from "../portalModal/PortalModal";
import PortalModalInfo from "../portalModal/PortalModalInfo";

const Player = () => {
  const { isShowCardStats, isEditStats, selectedPlayerStatsId } = useSelector((state) => state.statsPlayers);
  const { playerList } = useSelector((state) => state.player);
  const { data } = useSelector((state) => state.statsPlayers);
  const { clubList, selectedClub, status } = useSelector((state) => state.club);

  const dispatch = useDispatch();

  const rolesForSelect = [
    { id: "portiere", name: "Portiere" },
    { id: "difensore", name: "Difensore" },
    { id: "mediano", name: "Mediano" },
    { id: "attaccante", name: "Attaccante" },
  ];

  const countryOptions = Object.entries(countryListAlpha2).map(([code, name]) => ({
    code,
    name,
  }));

  const [editPlayer, setEditPlayer] = useState(false);
  const [editPlayerStats, setEditPlayerStats] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [oldIdStats, setOldIdStats] = useState(null);
  const extendedClubList = [{ id: "svincolato", name: "Svincolato" }, ...clubList];
  const [pasClubId, setPasClubId] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [filteredPlayers, setFilteredPlayers] = useState(playerList);
  const [activeRole, setActiveRole] = useState(null);
  const [isShowModalInfo, setIsShowModalInfo] = useState(false);

  const [isShowModal, setIsShowModal] = useState(false);
  const [paramsId, setParamsId] = useState(null); // Salva l'id del club selezionato

  // api
  const fetchPlayers = () => async () => {
    dispatch(fetchListPlayerStart());
    try {
      const responseData = await fetchListPlayer();
      dispatch(fetchListPlayerSuccess(responseData));
    } catch (error) {
      dispatch(fetchListPlayerFailure(error.message));
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

  const deletePlayer = (payload) => async () => {
    dispatch(deletePlayerStart());
    try {
      const response = await deletePlayerApi(payload);
      dispatch(deletePlayerSuccess(payload));
    } catch (error) {
      dispatch(deletePlayerFailure(error.message));
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

  const deleteStats = (payload) => async () => {
    dispatch(deletePlayerStatsStart());
    try {
      const response = await deleteStatsPlayer(payload);
      dispatch(deletePlayerStatsSuccess(payload));
    } catch (error) {
      dispatch(deletePlayerStatsFailure(error.message));
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

  useEffect(() => {
    if (editPlayer) {
      formik.setFieldValue("selectedClubId", formik.values.clubId ?? "svincolato");
    }
  }, [editPlayer]);

  useEffect(() => {
    if (isEditStats.boolean && isEditStats.id) {
      formikStats.setValues(isEditStats.id);
      setEditPlayerStats(true);
    }
  }, [isEditStats]);

  useEffect(() => {
    if (!isShowCardStats.boolean) {
      formikStats.cleanStats();
    }
  }, [isShowCardStats.boolean]);

  const recoverInfoPlayer = (player) => {
    formik.setValues({
      ...player,
      clubName: player.clubName,
      clubId: player.clubId ?? "svincolato",
    });
    formik.setFieldValue("selectedClubId", player.clubId ?? "svincolato");

    setEditPlayer(true);
    setSelectedPlayer(player);
  };

  useEffect(() => {
    if (selectedPlayer) {
      formik.setValues((values) => ({
        ...values,
        clubId: selectedPlayer.clubId === null ? "svincolato" : selectedPlayer.clubId,
      }));
      formik.setFieldValue("selectedClubId", selectedPlayer.clubId === null ? "svincolato" : selectedPlayer.clubId);
    }
  }, [selectedPlayer]);

  const handleChangeClub = (event) => {
    const selectedClubId = event.target.value || "svincolato";
    formik.setTouched({ ...formik.touched, clubName: false });

    if (selectedClubId === "svincolato") {
      formik.setValues((prevState) => ({
        ...prevState,
        clubName: "Svincolato",
        clubId: null, // null per "svincolato"
      }));
    } else {
      const selectedClub = clubList.find((club) => club.id === selectedClubId);
      formik.setValues((prevState) => ({
        ...prevState,
        clubName: selectedClub.name,
        clubId: selectedClubId,
      }));
    }
    formik.setFieldValue("selectedClubId", selectedClubId);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      age: "",
      nationality: "",
      role: "",
      price_player: "",
      info: "",
      clubName: null,
      clubId: "",
      editPlayer: false,
      club: "",
      selectedClubId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo obbligatorio"),
      surname: Yup.string().required("Campo obbligatorio"),
      age: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .positive("Deve essere positiva")
        .integer("Deve essere un numero intero"),
      nationality: Yup.string().required("Campo obbligatorio"),
      role: Yup.string().required("Campo obbligatorio"),
      clubName: Yup.lazy((value) => {
        // Condizione per il campo clubName, che dipende da editPlayer
        if (editPlayer) {
          return Yup.string().nullable(); // Se siamo in modalità modifica, il campo può essere null
        } else {
          if (value === "" || value === null) {
            return Yup.string().required("Campo obbligatorio");
          } else {
            return Yup.string().nullable(); // Se non è vuoto o null, è valido
          }
        }
      }),

      info: Yup.string().required("Campo obbligatorio"),
      price_player: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .min(0, "Deve essere 0 o maggiore")
        .integer("Deve essere un numero intero"),
    }),
    onSubmit: (values, { resetForm }) => {
      sendData(values, resetForm);
    },
  });

  const formikStats = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
      match_vote: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .min(0, "Deve essere 0 o maggiore")
        .integer("Deve essere un numero intero"),
      average_rating: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .min(0, "Deve essere 0 o maggiore")
        .integer("Deve essere un numero intero"),
      red_card: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .min(0, "Deve essere 0 o maggiore")
        .integer("Deve essere un numero intero"),
      yellow_card: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .min(0, "Deve essere 0 o maggiore")
        .integer("Deve essere un numero intero"),
      number_of_match: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .min(0, "Deve essere 0 o maggiore")
        .integer("Deve essere un numero intero"),
      number_goal_conceded: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .min(0, "Deve essere 0 o maggiore")
        .integer("Deve essere un numero intero"),
      number_goal: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .min(0, "Deve essere 0 o maggiore")
        .integer("Deve essere un numero intero"),
      number_assist: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .min(0, "Deve essere 0 o maggiore")
        .integer("Deve essere un numero intero"),
      playerName: Yup.string().required("Campo obbligatorio"),
    }),
    onSubmit: (values, { resetForm }) => {
      sendDataStat(values, resetForm);
    },
  });

  const sendData = async (values, resetForm) => {
    try {
      if (editPlayer) {
        dispatch(updatePlayer(values));
        setIsUpdating(true);
      } else {
        dispatch(addPlayer(values));
        setIsUpdating(true);
        setEditPlayer(true);
      }

      setPasClubId(formik.values.selectedClubId);
      formik.setFieldValue("selectedClubId", "");

      resetForm({
        name: "",
        surname: "",
        age: "",
        nationality: "",
        role: "",
        price_player: "",
        info: "",
        clubName: "",
      });
      setEditPlayer(false);
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
    }
  };

  formik.handleClean = () => {
    if (editPlayer) {
      setEditPlayer(false);
      formik.setFieldValue("selectedClubId", "");
      formik.resetForm({ name: "", surname: "", age: "", nationality: "", role: "", price_player: "", info: "", clubName: "" });
    }
    formik.setFieldValue("selectedClubId", "");
    formik.resetForm({ name: "", surname: "", age: "", nationality: "", role: "", price_player: "", info: "", clubName: "" });
    setEditPlayer(false);
  };

  const showModal = (par) => {
    setParamsId(par); // Imposta l'id del club da eliminare
    setIsShowModal(true); // Mostra il modale
  };

  const closeModal = () => {
    setIsShowModal(false);
    setParamsId(null); // Resetta l'id selezionato
  };

  const handleDeletePlayer = (player) => {
    const playerStatsDelete = data?.filter((sta) => sta.playerId === player.id);

    if (playerStatsDelete && playerStatsDelete.length > 0) {
      playerStatsDelete.forEach((stat) => {
        dispatch(deleteStats(stat.id));
      });
    }
    dispatch(deletePlayer(player));
    formik.handleClean();
    formikStats.cleanStats();
    dispatch(setIsShow({ id: "", boolean: false }));
  };

  // click select edit statsPlayer
  const handleChangeStatsPlayer = (event) => {
    const selectedPlayerStatsId = event.target.value;
    const selectedStats = playerList.find((player) => player.id === selectedPlayerStatsId);
    formik.setTouched({ ...formik.touched, playerName: false });

    if (selectedStats) {
      formikStats.setValues((prevState) => ({
        ...prevState,
        playerName: selectedStats.name,
        playerSurname: selectedStats.surname,
        playerId: selectedPlayerStatsId,
      }));
      dispatch(setSelectedPlayerStatsId(selectedPlayerStatsId));
    }
  };

  const sendDataStat = async (values, resetForm) => {
    try {
      if (editPlayerStats) {
        dispatch(editStats(values));
        setIsUpdating(true);
      } else if (editPlayerStats && isEditStats.boolean) {
        dispatch(setSelectedPlayerStatsId(isEditStats.id.id));
      } else {
        dispatch(addStats({ ...values, clubId: pasClubId }));
        setIsUpdating(true);
        dispatch(setSelectedPlayerStatsId(isEditStats.id.id));
      }
      setPasClubId(null);
      dispatch(setSelectedPlayerStatsId(null));
      resetForm({
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
  };

  const togglePlayersList = (player) => {
    if (oldIdStats === player.id) {
      // Se il giocatore selezionato è lo stesso, chiudi la vista delle statistiche
      dispatch(setIsShow({ id: player.id, boolean: !isShowCardStats.boolean }));
      dispatch(recoverSingolStats(player));
    } else {
      // Se il giocatore è diverso, aggiorna oldIdStats e recupera le nuove statistiche
      setOldIdStats(player.id);
      dispatch(recoverSingolStats(player));
      dispatch(setIsShow({ id: player.id, boolean: true }));
    }
  };

  formikStats.cleanStats = () => {
    if (editPlayerStats) {
      setEditPlayerStats(false);

      dispatch(setSelectedPlayerStatsId(null));

      formikStats.resetForm({
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

    formikStats.resetForm({
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

  useEffect(() => {
    setFilteredPlayers(playerList);
  }, [playerList]);

  const handleFilterRole = (role) => {
    if (activeRole === role) {
      setActiveRole(null);
      setFilteredPlayers(playerList);
    } else {
      setActiveRole(role);
      setFilteredPlayers(playerList.filter((player) => player.role === role));
    }
  };

  const isFiltered = activeRole;

  const showModalPlayer = (par) => {
    setParamsId(par);
    setIsShowModalInfo(true);
  };

  const closeModalInfo = () => {
    setIsShowModalInfo(false);

    setParamsId(null);
  };

  return (
    <Grid className={style.containerPagePlayer}>
      <PortalModalInfo isShowModal={isShowModalInfo} onClose={closeModalInfo} paramsId={paramsId} />
      <PortalModal isShowModal={isShowModal} onClose={closeModal} handleDelete={handleDeletePlayer} paramsId={paramsId} msg={"player"} />
      <Grid className={style.wrapperPlayer}>
        <Grid className={style.boxInput}>
          <Grid className={style.playerInput}>
            <Typography variant="h6" component="h2">
              {editPlayer ? "Modifica Giocatore" : "Crea Giocatore"}
            </Typography>

            <Grid className={style.wrapperTextInput}>
              <Grid className={style.boxText}>
                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="name"
                    name="name"
                    label="Nome"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

                  <TextField
                    size="small"
                    className={style.input}
                    id="surname"
                    name="surname"
                    label="Cognome"
                    variant="outlined"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    helperText={formik.touched.surname && formik.errors.surname}
                  />

                  <TextField
                    size="small"
                    className={style.input}
                    id="age"
                    name="age"
                    label="Età"
                    variant="outlined"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    error={formik.touched.age && Boolean(formik.errors.age)}
                    helperText={formik.touched.age && formik.errors.age}
                  />

                  <PortalSelect
                    label="Nazionalità"
                    name="nationality"
                    value={formik.values.nationality}
                    options={countryOptions.map((country) => ({ value: country.name, label: country.name }))}
                    formik={formik}
                  />

                  <PortalSelect
                    label="Ruolo"
                    name="role"
                    value={formik.values.role}
                    options={rolesForSelect.map((role) => ({ value: role.id, label: role.name }))}
                    formik={formik}
                  />

                  <TextField
                    size="small"
                    className={style.input}
                    id="price_player"
                    name="price_player"
                    label="Prezzo"
                    variant="outlined"
                    value={formik.values.price_player}
                    onChange={formik.handleChange}
                    error={formik.touched.price_player && Boolean(formik.errors.price_player)}
                    helperText={formik.touched.price_player && formik.errors.price_player}
                  />

                  <TextField
                    size="small"
                    className={style.input}
                    id="info"
                    name="info"
                    label="Info"
                    variant="outlined"
                    value={formik.values.info}
                    onChange={formik.handleChange}
                    error={formik.touched.info && Boolean(formik.errors.info)}
                    helperText={formik.touched.info && formik.errors.info}
                  />

                  <PortalSelect
                    label="Club"
                    name="clubId"
                    value={formik.values.selectedClubId}
                    options={extendedClubList.map((club) => ({
                      value: club.id || "",
                      label: club.name
                        .split(" ")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" "),
                    }))}
                    formik={formik}
                    onChangeCustom={handleChangeClub}
                  />
                </Grid>
                <Grid className={style.wrapperBtn}>
                  <Button onClick={formik.handleClean} variant="contained" className={style.btn}>
                    Pulisci campi
                  </Button>
                  <Button className={style.submitBtn} onClick={formik.handleSubmit} variant="contained" color="primary">
                    {editPlayer ? "Modifica Giocatore" : "Crea Giocatore"}
                  </Button>
                </Grid>
              </Grid>
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
                  <PortalSelect
                    label="Giocatore"
                    name="player" // Cambia a 'player' se il campo si chiama 'player' in formikStats
                    value={selectedPlayerStatsId || ""}
                    options={playerList.map((player) => ({
                      value: player.id,
                      label:
                        player.name
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ") +
                        " " +
                        player.surname
                          .split(" ")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" "),
                    }))}
                    formik={formikStats}
                    onChangeCustom1={handleChangeStatsPlayer}
                    disabled={isShowCardStats.boolean}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="votoPartita"
                    name="match_vote"
                    label="Voto Partita"
                    variant="outlined"
                    value={formikStats.values.match_vote}
                    onChange={formikStats.handleChange}
                    error={formikStats.touched.match_vote && Boolean(formikStats.errors.match_vote)}
                    helperText={formikStats.touched.match_vote && formikStats.errors.match_vote}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="mediaVoto"
                    name="average_rating"
                    label="Media Voto"
                    variant="outlined"
                    value={formikStats.values.average_rating}
                    onChange={formikStats.handleChange}
                    error={formikStats.touched.average_rating && Boolean(formikStats.errors.average_rating)}
                    helperText={formikStats.touched.average_rating && formikStats.errors.average_rating}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="golFatti"
                    name="number_goal"
                    label="Gol Fatti"
                    variant="outlined"
                    value={formikStats.values.number_goal}
                    onChange={formikStats.handleChange}
                    error={formikStats.touched.number_goal && Boolean(formikStats.errors.number_goal)}
                    helperText={formikStats.touched.number_goal && formikStats.errors.number_goal}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="assist"
                    name="number_assist"
                    label="Assist"
                    variant="outlined"
                    value={formikStats.values.number_assist}
                    onChange={formikStats.handleChange}
                    error={formikStats.touched.number_assist && Boolean(formikStats.errors.number_assist)}
                    helperText={formikStats.touched.number_assist && formikStats.errors.number_assist}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="golSubiti"
                    name="number_goal_conceded"
                    label="Gol Subiti"
                    variant="outlined"
                    value={formikStats.values.number_goal_conceded}
                    onChange={formikStats.handleChange}
                    error={formikStats.touched.number_goal_conceded && Boolean(formikStats.errors.number_goal_conceded)}
                    helperText={formikStats.touched.number_goal_conceded && formikStats.errors.number_goal_conceded}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="redCard"
                    name="red_card"
                    label="Cartellini rossi"
                    variant="outlined"
                    value={formikStats.values.red_card}
                    onChange={formikStats.handleChange}
                    error={formikStats.touched.red_card && Boolean(formikStats.errors.red_card)}
                    helperText={formikStats.touched.red_card && formikStats.errors.red_card}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="yellowCard"
                    name="yellow_card"
                    label="Cartellini gialli"
                    variant="outlined"
                    value={formikStats.values.yellow_card}
                    onChange={formikStats.handleChange}
                    error={formikStats.touched.yellow_card && Boolean(formikStats.errors.yellow_card)}
                    helperText={formikStats.touched.yellow_card && formikStats.errors.yellow_card}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <TextField
                    size="small"
                    className={style.input}
                    id="partiteGiocate"
                    name="number_of_match"
                    label="Partite Giocate"
                    variant="outlined"
                    value={formikStats.values.number_of_match}
                    onChange={formikStats.handleChange}
                    error={formikStats.touched.number_of_match && Boolean(formikStats.errors.number_of_match)}
                    helperText={formikStats.touched.number_of_match && formikStats.errors.number_of_match}
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={formikStats.values.available_for_selection} onChange={formikStats.handleChange} name="available_for_selection" />
                    }
                    label="Disponibilità Partita"
                  />
                </Grid>

                <Grid className={style.field_container}>
                  <FormControlLabel
                    control={<Checkbox checked={formikStats.values.injuries} onChange={formikStats.handleChange} name="injuries" />}
                    label="Infortunato"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid className={style.wrapperBtn}>
              <Button onClick={formikStats.cleanStats} variant="contained" className={style.btn}>
                Pulisci campi
              </Button>
              <Button onClick={formikStats.handleSubmit} variant="contained" className={style.btn}>
                {editPlayerStats ? "Salva modifica" : "Crea statistica"}
              </Button>
            </Grid>
          </Grid>

          {/* =========================== Crea statistiche giocatore */}
        </Grid>

        <Grid className={style.boxList}>
          <Grid className={style.wrapperListPlayer}>
            <Typography variant="h6" component="h2" style={{ color: "black" }}>
              <div className={style.boxfilters}>
                <span>Lista dei giocatori</span>{" "}
                <div className={style.wrapperfilters}>
                  <div className={style.filters}>
                    <div className={style.box} onClick={() => handleFilterRole("portiere")}>
                      P
                    </div>
                    <div className={style.box} onClick={() => handleFilterRole("difensore")}>
                      D
                    </div>
                    <div className={style.box} onClick={() => handleFilterRole("mediano")}>
                      M
                    </div>
                    <div className={style.box} onClick={() => handleFilterRole("attaccante")}>
                      A
                    </div>
                  </div>
                </div>
              </div>
            </Typography>
            {isFiltered && filteredPlayers.length === 0 ? (
              <Typography variant="h6">Nessun risultato trovato</Typography>
            ) : (
              filteredPlayers?.map((player) => (
                <Grid className={style.boxListPlayer} key={player.id}>
                  <ul className={style.listPlayer}>
                    <li className={style.singlePlayer}>
                      <Grid className={style.namePlayer}>
                        <span className={style.icon}>
                          <FontAwesomeIcon icon={faPerson} />
                        </span>
                        <span className={style.nameSurname} onClick={() => showModalPlayer(player)}>
                          {player.name ? capitalizeWords(player.name) : ""} {player.surname ? capitalizeWords(player.surname) : ""}
                        </span>
                        <span className={style.role}>{player.role ? capitalizeWords(player.role) : ""}</span>

                        <span className={style.club}>
                          {`${
                            player.club === null
                              ? "Svincolato"
                              : player.club?.name
                              ? capitalizeWords(player.club?.name)
                              : player.club
                              ? capitalizeWords(player.club)
                              : ""
                          } `}
                        </span>
                      </Grid>
                      <Grid className={style.wrapperBtn}>
                        <Button className={style.btnEdit} onClick={() => recoverInfoPlayer(player)} variant="text">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                        <Button className={style.btnEdit} onClick={() => togglePlayersList(player)} variant="text">
                          <FontAwesomeIcon icon={faChartColumn} />
                        </Button>
                        <Button className={style.btnDelete} onClick={() => showModal(player)} variant="text">
                          <FontAwesomeIcon icon={faTrashCan} />
                        </Button>
                      </Grid>
                    </li>
                  </ul>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Player;
