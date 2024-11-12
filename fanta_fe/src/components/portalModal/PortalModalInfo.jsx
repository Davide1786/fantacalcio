import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import style from "./portalModalInfo.module.scss";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

const PortalModalInfo = ({ isShowModal, onClose, paramsId }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setOpen(isShowModal);
  }, [isShowModal]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog className={style.wrapperModal} fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{`Informazioni di:  ${paramsId && paramsId.name} ${paramsId && paramsId.surname}`}</DialogTitle>
      <Grid className={style.modal}>
        <Grid className={style.grid}>
          <Grid className={style.gridItem}>
            <Typography variant="caption" component="div" fontWeight="bold">
              Nome
            </Typography>
            <Typography variant="body1">{paramsId && paramsId.name}</Typography>
          </Grid>

          <Grid className={style.gridItem}>
            <Typography variant="caption" component="div" fontWeight="bold">
              Cognome
            </Typography>
            <Typography variant="body1">{paramsId && paramsId.surname}</Typography>
          </Grid>

          <Grid className={style.gridItem}>
            <Typography variant="caption" component="div" fontWeight="bold">
              Nazionalità
            </Typography>
            <Typography variant="body1">{paramsId && paramsId.nationality}</Typography>
          </Grid>

          <Grid className={style.gridItem}>
            <Typography variant="caption" component="div" fontWeight="bold">
              Prezzo
            </Typography>
            <Typography variant="body1">{paramsId && paramsId.price_player}mln</Typography>
          </Grid>

          <Grid className={style.gridItem}>
            <Typography variant="caption" component="div" fontWeight="bold">
              Età
            </Typography>
            <Typography variant="body1">{paramsId && paramsId.age}</Typography>
          </Grid>

          <Grid className={style.gridItemFull}>
            <Typography variant="caption" component="div" fontWeight="bold">
              Info
            </Typography>
            <Typography variant="body1">{paramsId && paramsId.info}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <DialogActions>
        <Button onClick={handleClose}>Chiudi</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PortalModalInfo;
