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

const messages = {
  club: {
    title: "Errore durante la creazione del club",
    content: "Non puoi creare un club che già esiste.",
  },
  clubEdit: {
    title: "Errore durante la modifica del club",
    content: "Non puoi avere due club uguali.",
  },
  player: {
    title: "Errore durante la creazione del giocatore",
    content: "Non puoi creare un giocatore che già esiste.",
  },
  playerEdit: {
    title: "Errore durante la modifica del giocatore",
    content: "Non puoi avere due giocatori uguali.",
  },
};
const PortalModalError = ({ isShowModal, onClose, msg }) => {
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
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{messages[msg]?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{messages[msg]?.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Chiudi</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PortalModalError;
