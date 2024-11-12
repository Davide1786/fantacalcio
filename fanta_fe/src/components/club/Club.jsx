import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, Typography, TextField, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faCircleQuestion, faPerson, faPenToSquare, faShield, faTrashCan, faShieldHalved, faKaaba } from "@fortawesome/free-solid-svg-icons";
import style from "./club.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchClubList, fetchSingleClub, updateSingleClub, addedSingleClub, deleteClubApi, updateSinglePlayer, fetchListPlayer } from "../../api/api";
import {
  fetchClubListStart,
  fetchClubListSuccess,
  fetchClubListFailure,
  fetchSingleClubStart,
  fetchSingleClubSuccess,
  fetchSingleClubFailure,
  updateClubStart,
  updateClubSuccess,
  updateClubFailure,
  addNewClubStart,
  addNewClubSuccess,
  addNewClubFailure,
  deleteClubStart,
  deleteClubSuccess,
  deleteClubFailure,
} from "../../../store/reducer/club.reducer";
import {
  updatePlayerFailure,
  updatePlayerSuccess,
  updatePlayerStart,
  fetchListPlayerStart,
  fetchListPlayerSuccess,
  fetchListPlayerFailure,
} from "../../../store/reducer/player.reducer";

import { useFormik } from "formik";
import * as Yup from "yup";
import capitalizeWords from "../../utility/capitalizeFunction";
import PortalModal from "../portalModal/PortalModal";

const Club = () => {
  const { clubList, selectedClub, status } = useSelector((state) => state.club);
  const { playerList } = useSelector((state) => state.player);
  const { data } = useSelector((state) => state.statsPlayers);

  const [selectedClubId, setSelectedClubId] = useState(null);

  const [showInfoClub, setShowInfoClub] = useState({});
  const [editClub, setEditClub] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  const fetchClub = (payload) => async (dispatch) => {
    dispatch(fetchSingleClubStart());
    try {
      const responseData = await fetchSingleClub(payload);
      dispatch(fetchSingleClubSuccess(responseData));
    } catch (error) {
      dispatch(fetchSingleClubFailure(error.message));
    }
  };

  const fetchClubs = () => async (dispatch) => {
    dispatch(fetchClubListStart());
    try {
      const responseData = await fetchClubList();
      dispatch(fetchClubListSuccess(responseData));
    } catch (error) {
      dispatch(fetchClubListFailure(error.message));
    }
  };

  const addedClub = (payload) => async (dispatch) => {
    dispatch(addNewClubStart());
    try {
      const responseData = await addedSingleClub(payload);
      dispatch(addNewClubSuccess(responseData));
    } catch (error) {
      dispatch(addNewClubFailure(error.message));
    }
  };

  const updateClub = (payload) => async (dispatch) => {
    dispatch(updateClubStart());
    try {
      const responseData = await updateSingleClub(payload);
      dispatch(updateClubSuccess(responseData));
    } catch (error) {
      dispatch(updateClubFailure(error.message));
    }
  };

  const fetchPlayers = () => async () => {
    dispatch(fetchListPlayerStart());
    try {
      const responseData = await fetchListPlayer(); // Chiama l'API
      dispatch(fetchListPlayerSuccess(responseData)); // Aggiorna lo stato con i dati
    } catch (error) {
      dispatch(fetchListPlayerFailure(error.message)); // Gestisce l'errore
    }
  };

  const deleteClub = (payload) => async () => {
    dispatch(deleteClubStart());
    try {
      const response = await deleteClubApi(payload);
      dispatch(deleteClubSuccess(payload));
    } catch (error) {
      dispatch(deleteClubFailure(error.message));
    }
  };

  // Uso nel componente
  useEffect(() => {
    dispatch(fetchClubs());
  }, []);

  useEffect(() => {
    if (selectedClubId) {
      dispatch(fetchClub(selectedClubId.id));
    }
  }, [playerList]);

  useEffect(() => {
    if (isUpdating) {
      setIsUpdating(false);
      dispatch(fetchClubs());
    }
  }, [isUpdating]);

  const formik = useFormik({
    initialValues: {
      name: "",
      stadium: "",
      derby: "",
      colors_home: "",
      colors_away: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Campo obbligatorio"),
      stadium: Yup.string().required("Campo obbligatorio"),
      derby: Yup.string().required("Campo obbligatorio"),
      colors_home: Yup.string().required("Campo obbligatorio"),
      colors_away: Yup.string().required("Campo obbligatorio"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, resetForm);
    },
  });

  // Recupera i dati di un club e li imposta nel form per la modifica
  const recoverInfoClub = (club) => {
    formik.setValues(club);
    setEditClub(true);
  };

  // Alterna la visibilità delle informazioni del club selezionato
  const toggleInfoClub = (club) => {
    setShowInfoClub((prev) => (prev.id !== club.id ? club : {}));
  };

  const togglePlayersList = (club) => {
    if (selectedClubId?.id === club.id) {
      setSelectedClubId(null);
    } else {
      setSelectedClubId(club);
      dispatch(fetchClub(club.id));
    }
  };

  formik.clean = () => {
    if (editClub) {
      setEditClub(false);
      formik.resetForm({ name: "", stadium: "", derby: "", colors_home: "", colors_away: "" });
    }

    formik.resetForm({ name: "", stadium: "", derby: "", colors_home: "", colors_away: "" });
  };

  const [isRecoverList, setIsRecoverList] = useState(false);
  useEffect(() => {
    if (isRecoverList) {
      dispatch(fetchPlayers());
      setIsRecoverList(false);
    }
  }, [isRecoverList]);

  const updatePlayer = (payload) => async (dispatch) => {
    dispatch(updatePlayerStart());
    try {
      const responseData = await updateSinglePlayer(payload);
      dispatch(updatePlayerSuccess(responseData));
    } catch (error) {
      dispatch(updatePlayerFailure(error.message));
    }
  };

  const [isShowModal, setIsShowModal] = useState(false);
  const [paramsId, setParamsId] = useState(null);

  const showModal = (par) => {
    setParamsId(par);
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setParamsId(null);
  };

  const handleDeleteClub = (clubId) => {
    if (clubId) {
      const playerDelete = playerList?.filter((player) => player.clubId === clubId);

      if (playerDelete.length > 0) {
        playerDelete.forEach((player) => {
          dispatch(updatePlayer({ id: player.id, clubId: null, clubName: null }, true));
        });
      }

      dispatch(deleteClub(clubId));
      setIsRecoverList(true);
      setShowInfoClub({});
      formik.clean();
      closeModal();
    }
  };

  const handleSubmit = (values) => {
    try {
      if (editClub) {
        dispatch(updateClub(values));
        setIsUpdating(true);
      } else {
        dispatch(addedClub(values));
        setIsUpdating(true);
      }
      formik.resetForm({ name: "", stadium: "", derby: "", colors_home: "", colors_away: "" });
      setEditClub(false);
    } catch (error) {
      console.error("Errore durante l'invio dei dati:", error);
    }
  };

  return (
    <Grid className={style.containerPageClub}>
      <PortalModal isShowModal={isShowModal} onClose={closeModal} handleDelete={handleDeleteClub} paramsId={paramsId} msg={"club"} />
      <Grid className={style.wrapperClub}>
        <Grid className={style.boxInput}>
          <Typography variant="h6" component="h2">
            {editClub ? "Modifica Club" : "Crea Club"}
          </Typography>

          <Grid className={style.wrapperTextInput}>
            <Grid className={style.boxText}>
              <Grid className={style.wrapperTextField}>
                <Grid className={style.fieldContainer}>
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
                    id="stadium"
                    name="stadium"
                    label="Stadio"
                    variant="outlined"
                    value={formik.values.stadium}
                    onChange={formik.handleChange}
                    error={formik.touched.stadium && Boolean(formik.errors.stadium)}
                    helperText={formik.touched.stadium && formik.errors.stadium}
                  />

                  <TextField
                    size="small"
                    className={style.input}
                    id="derby"
                    name="derby"
                    label="Derby"
                    variant="outlined"
                    value={formik.values.derby}
                    onChange={formik.handleChange}
                    error={formik.touched.derby && Boolean(formik.errors.derby)}
                    helperText={formik.touched.derby && formik.errors.derby}
                  />

                  <TextField
                    size="small"
                    className={style.input}
                    id="colors_home"
                    name="colors_home"
                    label="Colore Maglietta Casa"
                    variant="outlined"
                    value={formik.values.colors_home}
                    onChange={formik.handleChange}
                    error={formik.touched.colors_home && Boolean(formik.errors.colors_home)}
                    helperText={formik.touched.colors_home && formik.errors.colors_home}
                  />

                  <TextField
                    size="small"
                    className={style.input}
                    id="colors_away"
                    name="colors_away"
                    label="Colore Maglietta Trasferta"
                    variant="outlined"
                    value={formik.values.colors_away}
                    onChange={formik.handleChange}
                    error={formik.touched.colors_away && Boolean(formik.errors.colors_away)}
                    helperText={formik.touched.colors_away && formik.errors.colors_away}
                  />
                </Grid>

                <Grid className={style.wrapperBtn}>
                  <Button onClick={formik.clean} variant="contained" className={style.btn}>
                    Pulisci campi
                  </Button>
                  <Button onClick={formik.handleSubmit} type="submit" variant="contained" className={style.btn}>
                    {editClub ? "Salva modifica" : "Crea Club"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className={style.boxList}>
          <Grid className={style.wrapperListFormClub}>
            <Typography variant="h6" component="h2" style={{ color: "black" }}>
              Lista dei club
            </Typography>
            {clubList?.map((club) => (
              <Grid className={style.boxListClub} key={club.id}>
                <ul className={style.listClub}>
                  <li className={style.singleClub}>
                    <Grid className={style.nameClub} onClick={() => togglePlayersList(club)}>
                      <span className={style.iconClubName}>
                        <FontAwesomeIcon icon={faShield} className={style.icon} />
                      </span>
                      {club.name ? capitalizeWords(club.name) : ""}
                    </Grid>
                    <Grid className={style.wrapperBtn}>
                      <Button className={style.btnEdit} onClick={() => recoverInfoClub(club)} variant="text">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>
                      <Button className={style.btnInfo} onClick={() => toggleInfoClub(club)} variant="text">
                        <FontAwesomeIcon icon={faCircleQuestion} />
                      </Button>
                      {/* <Button className={style.btnDelete} onClick={() => handleDeleteClub(club.id)} variant="text"> */}
                      <Button className={style.btnDelete} onClick={() => showModal(club.id)} variant="text">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </Grid>
                  </li>
                </ul>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid className={style.boxInfo}>
          <Typography variant="h6" component="h2">
            Info sul club {showInfoClub?.name}
          </Typography>
          <Grid className={style.wrapperInfoClub}>
            <Grid className={style.infoClub}>
              <Typography className={style.nameInfo} variant="subtitle2" component="p">
                <FontAwesomeIcon icon={faKaaba} />
                <span>
                  Stadio:
                  <span className={style.valueInfo}> {showInfoClub.stadium ? capitalizeWords(showInfoClub.stadium) : ""}</span>
                </span>
              </Typography>
              <Typography className={style.nameInfo} variant="subtitle2" component="p">
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>
                  Derby:
                  <span className={style.valueInfo}>{showInfoClub.derby ? capitalizeWords(showInfoClub.derby) : ""} </span>
                </span>
              </Typography>
              <Typography className={style.nameInfo} variant="subtitle2" component="p">
                <FontAwesomeIcon icon={faShirt} />
                <span>
                  Colore maglia casa:
                  <span className={style.valueInfo}>{showInfoClub.colors_home ? capitalizeWords(showInfoClub.colors_home) : ""}</span>
                </span>
              </Typography>
              <Typography className={style.nameInfo} variant="subtitle2" component="p">
                <FontAwesomeIcon icon={faShirt} />
                <span>
                  Colore maglia trasferta:
                  <span className={style.valueInfo}>{showInfoClub.colors_away ? capitalizeWords(showInfoClub.colors_away) : ""}</span>
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid className={style.boxInfoPlayer}>
          <Typography variant="h6" component="h2">
            Giocatori del club {selectedClubId?.name ? capitalizeWords(selectedClubId?.name) : ""}
          </Typography>

          <Grid className={style.wrapperInfoClub}>
            {selectedClubId?.id &&
              selectedClub?.players?.map((pl, index) => (
                <Grid className={style.infoClub} key={index}>
                  <Typography className={style.nameInfo} variant="subtitle2" component="p">
                    <FontAwesomeIcon icon={faPerson} />
                    <span>
                      <span className={style.valueInfo}> {pl.name ? capitalizeWords(pl.name) : ""}</span>{" "}
                      <span className={style.valueInfo}>{pl.surname ? capitalizeWords(pl.surname) : ""}</span>
                    </span>
                  </Typography>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Club;
