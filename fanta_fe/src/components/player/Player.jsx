import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListPlayer, addSinglePlayer, updateSinglePlayer, fetchPlayerSingleStats, deletePlayerApi, deleteStatsPlayer } from "../../api/api";
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
  deletePlayerStatsStart,
  deletePlayerStatsSuccess,
  deletePlayerStatsFailure,
} from "../../../store/reducer/statsPlayer.reducer";
import style from "./player.module.scss";
import Grid from "@mui/material/Grid2";
import { Button, Typography, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faPerson, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import { countryListAlpha2 } from "../../utility/nationality";
import { useFormik } from "formik";
import * as Yup from "yup";
import PortalSelect from "../portalSelect/PortalSelect";
import capitalizeWords from "../../utility/capitalizeFunction";
import PortalModal from "../portalModal/PortalModal";
import PortalModalInfo from "../portalModal/PortalModalInfo";
import PortalModalError from "../portalModal/PortalModalError";
import FormStats from "./FormStats";

const Player = () => {
  const { isShowCardStats } = useSelector((state) => state.statsPlayers);
  const { playerList } = useSelector((state) => state.player);
  const { data } = useSelector((state) => state.statsPlayers);
  const { clubList } = useSelector((state) => state.club);

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
  const [isUpdating, setIsUpdating] = useState(false);

  const [oldIdStats, setOldIdStats] = useState(null);
  const extendedClubList = [{ id: "svincolato", name: "Svincolato" }, ...clubList];
  const [pasClubId, setPasClubId] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const [filteredPlayers, setFilteredPlayers] = useState(playerList);
  const [activeRole, setActiveRole] = useState(null);
  const [isShowModalInfo, setIsShowModalInfo] = useState(false);

  const [isShowModal, setIsShowModal] = useState(false);
  const [paramsId, setParamsId] = useState(null);
  const [isShowModalError, setIsShowModalError] = useState(false);
  const [msg, setMsg] = useState("");
  const [formikStats, setFormikStats] = useState(null);

  const isFiltered = activeRole;

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

  const addPlayer = async (payload) => {
    dispatch(addNewPlayerStart());
    try {
      const responseData = await addSinglePlayer(payload);
      dispatch(addNewPlayerSuccess(responseData));
      formik.resetForm();
      formik.setFieldValue("selectedClubId", "");
      setEditPlayer(false);
    } catch (error) {
      dispatch(addNewPlayerFailure(error.message));
      setIsShowModalError(true);
      setMsg("player");
    }
  };

  const updatePlayer = async (payload) => {
    dispatch(updatePlayerStart());
    try {
      const responseData = await updateSinglePlayer(payload);
      dispatch(updatePlayerSuccess(responseData));
      formik.resetForm();
      formik.setFieldValue("selectedClubId", "");
      setEditPlayer(false);
    } catch (error) {
      dispatch(updatePlayerFailure(error.message));
      setIsShowModalError(true);
      setMsg("playerEdit");
    }
  };

  const deletePlayer = async (payload) => {
    dispatch(deletePlayerStart());
    try {
      const response = await deletePlayerApi(payload);
      dispatch(deletePlayerSuccess(payload));
    } catch (error) {
      dispatch(deletePlayerFailure(error.message));
    }
  };

  const recoverSingolStats = async (payload) => {
    dispatch(singlePlayerStatsStart());
    try {
      const response = await fetchPlayerSingleStats(payload);
      dispatch(singlePlayerStatsSuccess(response));
    } catch (error) {
      dispatch(singlePlayerStatsFailure(error.message));
    }
  };

  const deleteStats = async (payload) => {
    dispatch(deletePlayerStatsStart());
    try {
      const response = await deleteStatsPlayer(payload);
      dispatch(deletePlayerStatsSuccess(payload));
    } catch (error) {
      dispatch(deletePlayerStatsFailure(error.message));
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (isUpdating) {
      setIsUpdating(false);
      fetchPlayers();
    }
  }, [isUpdating]);

  useEffect(() => {
    if (editPlayer) {
      formik.setFieldValue("selectedClubId", formik.values.clubId ?? "svincolato");
    }
  }, [editPlayer]);

  useEffect(() => {
    setFilteredPlayers(playerList);
  }, [playerList]);

  useEffect(() => {
    if (selectedPlayer) {
      formik.setValues((values) => ({
        ...values,
        clubId: selectedPlayer.clubId === null ? "svincolato" : selectedPlayer.clubId,
      }));
      formik.setFieldValue("selectedClubId", selectedPlayer.clubId === null ? "svincolato" : selectedPlayer.clubId);
    }
  }, [selectedPlayer]);

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

  const handleChangeClub = (event) => {
    const selectedClubId = event.target.value || "svincolato";
    formik.setTouched({ ...formik.touched, clubName: false });

    if (selectedClubId === "svincolato") {
      formik.setValues((prevState) => ({
        ...prevState,
        clubName: "Svincolato",
        clubId: null,
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
      name: Yup.string()
        .matches(/^(?!\s)(?!.*\s$)[A-Za-zàèéìòùÀÈÉÌÒÙ\s-]+$/, "Il nome non può iniziare o finire con uno spazio")
        .required("Campo obbligatorio"),
      surname: Yup.string()
        .matches(/^(?!\s)(?!.*\s$)[A-Za-zàèéìòùÀÈÉÌÒÙ\s-]+$/, "Il nome non può iniziare o finire con uno spazio")
        .required("Campo obbligatorio"),
      age: Yup.number()
        .typeError("Deve essere un numero")
        .required("Campo obbligatorio")
        .positive("Deve essere positiva")
        .integer("Deve essere un numero intero"),
      nationality: Yup.string().required("Campo obbligatorio"),
      role: Yup.string().required("Campo obbligatorio"),
      clubName: Yup.lazy((value) => {
        if (editPlayer) {
          return Yup.string().nullable();
        } else {
          if (value === "" || value === null) {
            return Yup.string().required("Campo obbligatorio");
          } else {
            return Yup.string().nullable();
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

  const sendData = async (values) => {
    try {
      if (editPlayer) {
        updatePlayer(values);
        setIsUpdating(true);
      } else {
        addPlayer(values);
        setIsUpdating(true);
        setEditPlayer(true);
      }
      setPasClubId(formik.values.selectedClubId);
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
    setParamsId(par);
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setParamsId(null);
  };

  const handleDeletePlayer = (player) => {
    const playerStatsDelete = data?.filter((sta) => sta.playerId === player.id);

    if (playerStatsDelete && playerStatsDelete.length > 0) {
      playerStatsDelete.forEach((stat) => {
        deleteStats(stat.id);
      });
    }
    deletePlayer(player);
    formik.handleClean();
    if (formikStats) {
      formikStats.cleanStats();
    }
    dispatch(setIsShow({ id: "", boolean: false }));
  };

  const handleFormikStatsChange = (newFormikStats) => {
    setFormikStats(newFormikStats);
  };

  const togglePlayersList = (player) => {
    if (oldIdStats === player.id) {
      dispatch(setIsShow({ id: player.id, boolean: !isShowCardStats.boolean }));
      recoverSingolStats(player);
    } else {
      setOldIdStats(player.id);
      recoverSingolStats(player);
      dispatch(setIsShow({ id: player.id, boolean: true }));
    }
  };

  const handleFilterRole = (role) => {
    if (activeRole === role) {
      setActiveRole(null);
      setFilteredPlayers(playerList);
    } else {
      setActiveRole(role);
      setFilteredPlayers(playerList.filter((player) => player.role === role));
    }
  };

  const showModalPlayer = (par) => {
    setParamsId(par);
    setIsShowModalInfo(true);
  };

  const closeModalInfo = () => {
    setIsShowModalInfo(false);
    setParamsId(null);
  };

  const closeModalError = () => {
    setIsShowModalError(false);
  };

  return (
    <Grid className={style.containerPagePlayer}>
      <PortalModalError isShowModal={isShowModalError} onClose={closeModalError} msg={msg} />
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

          <FormStats formik={formik} onFormikStatsChange={handleFormikStatsChange} />
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
