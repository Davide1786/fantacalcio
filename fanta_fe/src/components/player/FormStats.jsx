import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListPlayer, addSinglePlayer, updateSinglePlayer, addStatsPlayer, editStatsPlayer, deletePlayerApi, deleteStatsPlayer } from "../../api/api";
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
  setIsEmpty,
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
import { useFormik } from "formik";
import * as Yup from "yup";
import PortalSelect from "../portalSelect/PortalSelect";

const FormStats = ({ formik, onFormikStatsChange }) => {
  const { isShowCardStats, isEditStats, selectedPlayerStatsId, isEmpty } = useSelector((state) => state.statsPlayers);
  const { playerList } = useSelector((state) => state.player);

  const dispatch = useDispatch();

  const [editPlayerStats, setEditPlayerStats] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [pasClubId, setPasClubId] = useState(null);

  // api
  const fetchPlayers = async () => {
    dispatch(fetchListPlayerStart());
    try {
      const responseData = await fetchListPlayer();
      dispatch(fetchListPlayerSuccess(responseData));
    } catch (error) {
      dispatch(fetchListPlayerFailure(error.message));
    }
  };

  const addStats = async (payload) => {
    dispatch(addPlayerStatsStart());
    try {
      const responseData = await addStatsPlayer(payload);
      dispatch(addPlayerStatsSuccess(responseData));
    } catch (error) {
      dispatch(addPlayerStatsFailure(error.message));
    }
  };

  const editStats = async (payload) => {
    dispatch(editPlayerStatsStart());
    try {
      const responseData = await editStatsPlayer(payload);
      dispatch(editPlayerStatsSuccess(responseData));
    } catch (error) {
      dispatch(editPlayerStatsFailure(error.message));
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // after edit player
  useEffect(() => {
    if (isUpdating) {
      setIsUpdating(false);
      fetchPlayers();
    }
  }, [isUpdating]);

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

  useEffect(() => {
    if (isEmpty) {
      formikStats.cleanStats();
      dispatch(setIsEmpty(false));
    }
  }, [isEmpty]);

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
        editStats(values);
        setIsUpdating(true);
      } else if (editPlayerStats && isEditStats.boolean) {
        dispatch(setSelectedPlayerStatsId(isEditStats.id.id));
      } else {
        addStats({ ...values, clubId: pasClubId });
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

  // Quando formikStats è pronto, chiamo la funzione del padre per inviarlo
  useEffect(() => {
    if (formikStats) {
      onFormikStatsChange(formikStats); // Passa formikStats al componente padre
    }
  }, [formikStats, onFormikStatsChange]);

  return (
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
              control={<Checkbox checked={formikStats.values.available_for_selection} onChange={formikStats.handleChange} name="available_for_selection" />}
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
  );
};

export default FormStats;
