import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./playerStats.module.scss";
import Grid from "@mui/material/Grid2";
import { Button, Typography, TextField, Checkbox, FormControl, InputLabel, Select, MenuItem, FormControlLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserInjured, faPerson, faStairs } from "@fortawesome/free-solid-svg-icons";
import {
  fetchListStatsPlayerStart,
  fetchListStatsPlayerSuccess,
  fetchListStatsPlayerFailure,
  setIsEditStats,
  setSelectedPlayerStatsId,
} from "../../../store/reducer/statsPlayer.reducer";

import { fetchPlayerStats } from "../../api/api";

const PlayerStats = () => {
  const { isShowCardStats, data } = useSelector((state) => state.statsPlayers);
  const dispatch = useDispatch();

  const recoveStats = () => async () => {
    dispatch(fetchListStatsPlayerStart());
    try {
      const response = await fetchPlayerStats();
      dispatch(fetchListStatsPlayerSuccess(response));
    } catch (error) {
      dispatch(fetchListStatsPlayerFailure(error.message));
    }
  };

  useEffect(() => {
    dispatch(recoveStats());
  }, []);

  const handleEditStats = (id) => {
    const selectedStats = data.find((stat) => stat.id === id);

    if (selectedStats) {
      dispatch(setSelectedPlayerStatsId(selectedStats.playerId));
      dispatch(setIsEditStats({ id: selectedStats, boolean: true }));
    }
  };

  return (
    <Grid className={style.containerPagePlayerStats}>
      <Grid className={style.wrapperPlayerStats}>
        <Grid className={style.boxTitle}>
          {data.length > 0 && (
            <Typography variant="h6" component="h2">
              Statistiche Giocatore {isShowCardStats && `${data[0].playerName} ${data[0].playerSurname} - ${data[0].club}`}
            </Typography>
          )}
        </Grid>
        <Grid className={style.boxInfo}>
          {isShowCardStats &&
            data.map((player) => (
              <Grid className={style.boxInput} key={player.id}>
                <Grid className={style.boxCard}>
                  <Grid className={style.boxCardInternal}>
                    <Grid className={style.match_vote}>
                      <span>
                        Voto Partita: <span className={style.nameStats}>{player.match_vote}</span>
                      </span>
                    </Grid>

                    <Grid className={style.average_rating}>
                      <span>
                        Media Voto: <span className={style.nameStats}>{player.average_rating}</span>
                      </span>
                    </Grid>

                    <Grid className={style.number_goal}>
                      <span>
                        Goal: <span className={style.nameStats}>{player.number_goal}</span>
                      </span>
                    </Grid>

                    <Grid className={style.number_assist}>
                      <span>
                        Assist:
                        <span className={style.nameStats}>{player.number_assist}</span>
                      </span>
                    </Grid>

                    <Grid className={style.number_goal_conceded}>
                      <span>
                        Gol Subiti:
                        <span className={style.nameStats}>{player.number_goal_conceded}</span>
                      </span>
                    </Grid>

                    <Grid className={style.red_card}>
                      <span>
                        Cartellini Rossi:
                        <span className={style.nameStats}>{player.red_card}</span>
                      </span>
                    </Grid>

                    <Grid className={style.yellow_card}>
                      <span>
                        Cartellini Gialli:
                        <span className={style.nameStats}>{player.yellow_card}</span>
                      </span>
                    </Grid>

                    <Grid className={style.number_of_match}>
                      <span>
                        Partite disputate:
                        <span className={style.nameStats}>{player.number_of_match}</span>
                      </span>
                    </Grid>

                    <Grid className={style.available_for_selection}>
                      <span>
                        Disponibilità partita:
                        <span className={style.nameStats}>{player.available_for_selection ? "si" : "no"}</span>
                      </span>
                    </Grid>

                    <Grid className={style.injuries}>
                      <span>
                        Infortunato:
                        <span className={style.nameStats}>{player.injuries ? "si" : "no"}</span>
                      </span>
                    </Grid>
                  </Grid>

                  <Grid className={style.wrapperBtn}>
                    <Button onClick={() => handleEditStats(player.id)} variant="contained" className={style.btn}>
                      Modifica
                    </Button>
                    <Button variant="contained" className={style.btn}>
                      Elimina
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlayerStats;
