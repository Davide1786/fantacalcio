import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./playerStats.module.scss";
import Grid from "@mui/material/Grid2";
import { Button, Typography } from "@mui/material";

import {
  fetchListStatsPlayerStart,
  fetchListStatsPlayerSuccess,
  fetchListStatsPlayerFailure,
  setIsEditStats,
  setSelectedPlayerStatsId,
  setIsShow,
  setIsEmpty,
  deletePlayerStatsStart,
  deletePlayerStatsSuccess,
  deletePlayerStatsFailure,
} from "../../../store/reducer/statsPlayer.reducer";

import { deleteStatsPlayer, fetchPlayerStats } from "../../api/api";
import PortalModal from "../portalModal/PortalModal";

const PlayerStats = () => {
  const { isShowCardStats, data, selectedPlayerStatsId } = useSelector((state) => state.statsPlayers);
  const { playerList } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [paramsId, setParamsId] = useState(null);
  const [updatedData, setUpdatedData] = useState([]);

  const recoveStats = async () => {
    dispatch(fetchListStatsPlayerStart());
    try {
      const response = await fetchPlayerStats();
      dispatch(fetchListStatsPlayerSuccess(response));
    } catch (error) {
      dispatch(fetchListStatsPlayerFailure(error.message));
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
    recoveStats();
  }, []);

  useEffect(() => {
    if (data.length > 0 && playerList.length > 0) {
      const newData = data.map((stat) => {
        const player = playerList.find((el) => el.id === stat.playerId);
        return player
          ? {
              ...stat,
              playerName: player.name,
              playerSurname: player.surname,
              club: player.club,
            }
          : stat;
      });
      setUpdatedData(newData);
    } else if (playerList.length > 0 && isShowCardStats.id) {
      const newData = playerList
        .filter((name) => name.id === isShowCardStats.id)
        .map((player) => ({
          ...player,
          playerName: player.name,
          playerSurname: player.surname,
          club: player.club,
        }));
      setUpdatedData(newData);
    }
  }, [data, playerList, isShowCardStats]);

  const handleEditStats = (id) => {
    const selectedStats = data.find((stat) => stat.id === id);

    if (selectedStats) {
      dispatch(setSelectedPlayerStatsId(selectedStats.playerId));
      dispatch(setIsEditStats({ id: selectedStats, boolean: true }));
    }
  };

  const showModal = (par) => {
    setParamsId(par);
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
    setParamsId(null);
  };

  const handleDeleteStats = (id) => {
    if (data.length === 1) {
      dispatch(setIsShow({ id: "", boolean: false }));
      deleteStats(id);
    } else {
      dispatch(setIsEmpty(true));
      deleteStats(id);
    }
  };

  return (
    <Grid className={style.containerPagePlayerStats}>
      <PortalModal isShowModal={isShowModal} onClose={closeModal} handleDelete={handleDeleteStats} paramsId={paramsId} msg={"stats"} />

      <Grid className={style.wrapperPlayerStats}>
        <Grid className={style.boxTitle}>
          <Typography variant="h6" component="h2">
            Statistiche Giocatore{" "}
            {updatedData.length > 0 && isShowCardStats.boolean
              ? `${updatedData[0]?.playerName || updatedData[0]?.name || ""} ${updatedData[0]?.playerSurname || updatedData[0]?.surname || ""} -
              ${updatedData[0].club === null ? "Svincolato" : updatedData[0]?.club?.name ?? updatedData[0]?.club}`
              : ""}
          </Typography>
        </Grid>
        <Grid className={style.boxInfo}>
          {data.length === 0 && isShowCardStats.boolean ? (
            <Typography variant="h6" component="h2">
              Nessuna statisticha creata per questo giocatore
            </Typography>
          ) : (
            isShowCardStats.boolean &&
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
                    <Button variant="contained" className={style.btn} onClick={() => showModal(player.id)}>
                      Elimina
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlayerStats;
