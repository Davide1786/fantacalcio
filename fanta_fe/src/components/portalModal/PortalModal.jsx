import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";

// Componente PortalModal

const messages = {
  club: {
    title: "Eliminazione del club",
    content:
      "Confermi di voler cancellare definitivamente il club selezionato? Procedendo, tutti i giocatori associati al club diventeranno svincolati. L’azione è irreversibile.",
  },
  player: {
    title: "Eliminazione del giocatore",
    content: "Confermi di voler cancellare definitivamente il giocatore selezionato? L’azione è irreversibile.",
  },
  stats: {
    title: "Eliminazione della statistica",
    content: "Confermi di voler cancellare definitivamente la statistica selezionata? L’azione è irreversibile.",
  },
};
const PortalModal = ({ isShowModal, onClose, handleDelete, paramsId, msg }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setOpen(isShowModal);
  }, [isShowModal]);

  const handleClose = () => {
    setOpen(false);
    onClose(); // Chiama onClose per aggiornare anche isShowModal nel componente principale
  };

  const handleConfirmDelete = () => {
    handleDelete(paramsId); // Passa paramsId a handleDelete
    handleClose(); // Chiudi il dialogo
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{messages[msg]?.title || "Eliminazione"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{messages[msg]?.content || "Conferma l'eliminazione."}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Chiudi</Button>
        <Button onClick={handleConfirmDelete} autoFocus>
          Elimina
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PortalModal;
