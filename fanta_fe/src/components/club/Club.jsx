import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, Typography, TextField, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faCircleQuestion, faPerson, faPenToSquare, faShield, faTrashCan, faShieldHalved, faKaaba } from "@fortawesome/free-solid-svg-icons";
import style from "./club.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchClubList, fetchSingleClub, updateSingleClub, addedSingleClub } from "../../api/api";
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
} from "../../../store/reducer/club.reducer";

const Club = () => {
  const { clubList, selectedClub, status } = useSelector((state) => state.club);
  const { playerList, statsPlayers } = useSelector((state) => state.player);

  const [selectedClubId, setSelectedClubId] = useState(null);
  const [currentClub, setCurrentClub] = useState({
    name: "",
    stadium: "",
    derby: "",
    colors_home: "",
    colors_away: "",
  });
  const [showInfoClub, setShowInfoClub] = useState({}); // Stato per controllare le info dei club
  const [editClub, setEditClub] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useDispatch();

  const fetchClub = (payload) => async (dispatch) => {
    console.log("sei partito???");

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

  // Invia i dati (aggiunta o modifica di un club)
  const sendData = async () => {
    try {
      if (editClub) {
        dispatch(updateClub(currentClub));
        setIsUpdating(true);
        setShowInfoClub(currentClub);
      } else {
        dispatch(addedClub(currentClub));
        setIsUpdating(true);
      }
      setCurrentClub({ name: "", stadium: "", derby: "", colors_home: "", colors_away: "" });
      setEditClub(false);
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
  const toggleInfoClub = (club) => {
    setShowInfoClub((prev) => (prev.id !== club.id ? club : {}));
  };

  const togglePlayersList = (club) => {
    console.log(club, "cli");

    if (selectedClubId?.id === club.id) {
      setSelectedClubId(null);
    } else {
      setSelectedClubId(club);
      dispatch(fetchClub(club.id));
    }
  };

  const clean = () => {
    if (editClub) {
      setEditClub(false);
      setCurrentClub({ name: "", stadium: "", derby: "", colors_home: "", colors_away: "" });
    }
    setCurrentClub({ name: "", stadium: "", derby: "", colors_home: "", colors_away: "" });
  };

  return (
    <Grid className={style.containerPageClub}>
      <Grid className={style.wrapperClub}>
        <Grid className={style.boxInput}>
          <Typography variant="h6" component="h2">
            Crea club
          </Typography>

          <Grid className={style.wrapperTextInput}>
            <Grid className={style.boxTest}>
              <Grid className={style.field_container}>
                <TextField
                  // placeholder="Inserisci il tuo nome"
                  size="small"
                  className={style.input}
                  id="nome"
                  label="Nome"
                  variant="outlined"
                  value={currentClub.name}
                  onChange={(e) => setCurrentClub({ ...currentClub, name: e.target.value })}
                  // sx={{
                  //   "& .MuiOutlinedInput-root": {
                  //     "& fieldset": {
                  //       borderColor: "rgb(244, 4, 220)", // Colore normale del bordo
                  //     },
                  //     "&:hover fieldset": {
                  //       borderColor: "blue", // Colore del bordo al passaggio del mouse
                  //     },
                  //     "&.Mui-focused fieldset": {
                  //       borderColor: "green", // Colore del bordo quando è in focus
                  //     },
                  //   },
                  // }}
                />
              </Grid>
              <Grid className={style.field_container}>
                <TextField
                  size="small"
                  className={style.input}
                  id="stadio"
                  label="Stadio"
                  variant="outlined"
                  value={currentClub.stadium}
                  onChange={(e) => setCurrentClub({ ...currentClub, stadium: e.target.value })}
                />
              </Grid>
              <Grid className={style.field_container}>
                <TextField
                  size="small"
                  className={style.input}
                  id="derby"
                  label="Derby"
                  variant="outlined"
                  value={currentClub.derby}
                  onChange={(e) => setCurrentClub({ ...currentClub, derby: e.target.value })}
                />
              </Grid>
              <Grid className={style.field_container}>
                <TextField
                  size="small"
                  className={style.input}
                  id="coloreMagliettaCasa"
                  label="Colore Maglietta Casa"
                  variant="outlined"
                  value={currentClub.colors_home}
                  onChange={(e) => setCurrentClub({ ...currentClub, colors_home: e.target.value })}
                />
              </Grid>
              <Grid className={style.field_container}>
                <TextField
                  size="small"
                  className={style.input}
                  id="coloreMagliettaTrasferta"
                  label="Colore Maglietta Trasferta"
                  variant="outlined"
                  value={currentClub.colors_away}
                  onChange={(e) => setCurrentClub({ ...currentClub, colors_away: e.target.value })}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className={style.wrapperBtn}>
            <Button onClick={clean} variant="contained" className={style.btn}>
              Pulisci campi
            </Button>
            <Button onClick={sendData} variant="contained" className={style.btn}>
              {editClub ? "Salva modifica" : "Crea Club"}
            </Button>
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
                      {club.name}
                    </Grid>
                    <Grid className={style.wrapperBtn}>
                      <Button className={style.btnEdit} onClick={() => recoverInfoClub(club)} variant="text">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>
                      <Button className={style.btnInfo} onClick={() => toggleInfoClub(club)} variant="text">
                        <FontAwesomeIcon icon={faCircleQuestion} />
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
                  <span className={style.valueInfo}> {showInfoClub.stadium}</span>
                </span>
              </Typography>
              <Typography className={style.nameInfo} variant="subtitle2" component="p">
                <FontAwesomeIcon icon={faShieldHalved} />
                <span>
                  Derby:
                  <span className={style.valueInfo}>{showInfoClub.derby}</span>
                </span>
              </Typography>
              <Typography className={style.nameInfo} variant="subtitle2" component="p">
                <FontAwesomeIcon icon={faShirt} />
                <span>
                  Colore maglia casa:
                  <span className={style.valueInfo}>{showInfoClub.colors_home}</span>
                </span>
              </Typography>
              <Typography className={style.nameInfo} variant="subtitle2" component="p">
                <FontAwesomeIcon icon={faShirt} />
                <span>
                  Colore maglia trasferta:
                  <span className={style.valueInfo}>{showInfoClub.colors_away}</span>
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid className={style.boxInfoPlayer}>
          <Typography variant="h6" component="h2">
            Giocatori del club {selectedClubId?.name}
          </Typography>

          <Grid className={style.wrapperInfoClub}>
            {selectedClubId?.id &&
              selectedClub?.players?.map((pl, index) => (
                <Grid className={style.infoClub} key={index}>
                  <Typography className={style.nameInfo} variant="subtitle2" component="p">
                    <FontAwesomeIcon icon={faPerson} />
                    <span>
                      <span className={style.valueInfo}> {pl.name}</span> <span className={style.valueInfo}>{pl.surname}</span>
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
