import { createTheme } from "@mui/material/styles";

// color: #77C3F2; celeste
// color: #2ABF89; verde
// color: #55D983; verde
//  color: #F28F6B; salmone
// color: #F24130; rosso
// verde chiaro #4F8C6F
// verde scuro #48735F
// grigio chiaro #BFBFBF
// grigio scuro #404040
// grigio nero #0D0D0D

// VARIABILI

// const brandColor = "#48735F";
// const brandSecondaryColor = " #4F8C6F";

const brandColor = "#2ABF89";
const brandSecondaryColor = " #55D983";

const brandColorDark = "#969494";
const white = "#fff";
const black = "#000";
const error = "#f9423a";
// const success = "#89ce23";
const success = "#F28F6B";
const warning = "#ff9d00";
const info = "#0089ff";
const noBrandColor = "#5c5c5c";

const theme = createTheme({
  palette: {
    /*
    questo è il colore che viene applicato nei TexField, Button Typography
    e in altri componenti che supportano lo styling del testo
  */
    text: {
      primary: black, // colore nero per il testo principale
      secondary: "rgba(0, 0, 0, 0.54)", // colore grigio scuro per testi secondari
      disabled: "rgba(0, 0, 0, 0.38)", // colore grigio chiaro per testi disabilitati
      hint: "rgba(0, 0, 0, 0.38)", // colore per suggerimenti/placeholder
    },
    /*
    La proprietà background definisce i colori di sfondo dell'interfaccia. In particolare, i due valori più comuni sono:
    paper: Si riferisce al colore di sfondo per elementi "cartacei", come i modali, i dialog o le card. Solitamente è bianco o vicino al bianco.
    default: Definisce il colore di sfondo generale dell'applicazione, ovvero quello usato per l'intero layout.
  */
    background: {
      paper: white, // Sfondo per elementi "cartacei" come card e modali
      default: "#f6f7f8", // Sfondo per il layout generale dell'applicazione
    },
    /*
    La sezione common contiene i colori base, come il nero (black) e il bianco (white), che
    possono essere utilizzati in diverse parti dell'applicazione. Questi colori sono utili per avere dei
    riferimenti standardizzati e sono accessibili in qualsiasi punto della palette.
*/
    common: {
      black: black, // Colore nero standard
      white: white, // Colore bianco standard
    },
    /*
    La proprietà primary definisce i colori principali del tema. Viene utilizzata per elementi importanti o che richiedono attenzione, come i pulsanti principali, il colore dell'app bar o altri componenti di rilievo.

    light: La versione più chiara del colore primario, utilizzata in alcuni casi, come stati hover o variazioni di tonalità.
    main: Il colore primario principale, utilizzato per la maggior parte degli elementi (come pulsanti, icone, link, ecc.).
    dark: La versione più scura del colore primario, spesso utilizzata negli stati hover.
    contrastText: Il colore del testo che sarà sovrapposto a elementi con il colore primario, per garantire un buon contrasto (in questo caso è bianco).
    */
    primary: {
      light: brandColor, // Colore chiaro per il tema primario
      main: brandColor, // Colore principale per pulsanti e altri elementi importanti
      dark: brandSecondaryColor, // Colore più scuro per hover
      contrastText: white, // Colore del testo sovrapposto (bianco)
    },
    /*
    La proprietà secondary è simile a primary, ma si riferisce a colori secondari, utilizzati per elementi meno prominenti.
    Spesso è utilizzata per pulsanti secondari o altri elementi che richiedono meno enfasi.

    light, main, dark: Definiscono le varie tonalità del colore secondario.
    contrastText: Colore del testo sovrapposto al colore secondario (in questo caso è il colore primario).*/
    secondary: {
      light: white, // Colore chiaro per il tema secondario
      main: white, // Colore secondario principale
      dark: white, // Variante scura per hover
      contrastText: brandColor, // Testo contrastante sul colore secondario
    },
    /*
Questa sezione sembra essere personalizzata per gestire un colore che non è associato al brand principale.
Potrebbe essere utilizzata per pulsanti o elementi che devono distinguersi da quelli con i colori principali.

light, main, dark: Definiscono le tonalità di questo colore.
contrastText: Il colore del testo che sarà sovrapposto a questo colore.
*/
    noBrandColor: {
      light: noBrandColor,
      main: noBrandColor,
      dark: black, // Hover con colore scuro
      contrastText: white, // Testo bianco in contrasto
    },
    /*
La proprietà error è utilizzata per gli stati di errore. Può essere applicata a messaggi di errore, icone o pulsanti in situazioni di errore (ad esempio, un pulsante "elimina").

light, main, dark: Definiscono le varie tonalità del colore associato agli errori.
contrastText: Colore del testo sovrapposto al colore di errore.
*/
    error: {
      light: error, // Colore chiaro per errori
      main: error, // Colore principale per errori
      dark: error, // Colore scuro per hover su errori
      contrastText: white, // Testo bianco in contrasto con il colore di errore
    },
    /*
Simile a error, la proprietà confirm viene utilizzata per stati di successo o conferma, come ad esempio un pulsante "salva" o un messaggio di conferma.

light, main, dark: Definiscono le varie tonalità per gli stati di conferma o successo.
contrastText: Colore del testo sovrapposto al colore di conferma.
*/
    confirm: {
      light: success, // Colore chiaro per successo
      main: success, // Colore principale per successo
      dark: success, // Colore scuro per hover
      contrastText: white, // Testo bianco in contrasto con il colore di successo
    },
  },

  // Breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },

  // COMPONENTI
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1", // Usa <h1> per la variante h1
          h2: "h2", // Usa <h2> per la variante h2
          h3: "h3", // Usa <h3> per la variante h3
          h4: "h4", // Usa <h4> per la variante h4
          h5: "h5", // Usa <h5> per la variante h5
          h6: "h6", // Usa <h6> per la variante h6
          subtitle1: "h4", // Sottotitolo più grande, potrebbe usare <h4>
          subtitle2: "h5", // Sottotitolo più piccolo, potrebbe usare <h5>
          body1: "p", // Testo normale, usa <p>
          body2: "p", // Testo normale, usa <p> (magari per paragrafi più piccoli)
          caption: "span", // Usa <span> per didascalie o testo inline
        },
      },
      styleOverrides: {
        root: {
          color: black, // Imposta il colore predefinito dei testi su nero
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: ".8rem",

          // SELECT LABEL
          "&.MuiInputLabel-sizeMedium": {
            top: "-5px",
          },
          "&.MuiInputLabel-sizeMedium.Mui-focused": {
            top: "0px", // Ritorna a top: 0 quando è in focus
          },
          "&.MuiInputLabel-shrink": {
            top: "0",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: "40px", // Altezza minima
          padding: "0 10px", // Padding interno
          position: "relative",
          transform: "translateY(20%)",
        },
        icon: {
          color: "#2ABF89", // Colore dell'icona di selezione (freccia)
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "10px 20px", // Padding dei singoli elementi del menu
        },
      },
    },

    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: ".8rem",

    //       // "& .MuiInputLabel-root": {
    //       //   top: "-5px", // Modifica solo per le etichette di Select
    //       // },

    //       // top: "-5px", // Imposta il valore 'top' desiderato
    //       // Puoi aggiungere altre proprietà di stile qui
    //     },
    //     outlined: {
    //       top: "-10px", // Modifica specifica per il tipo "outlined"
    //       // "& .MuiInputLabel-root": {
    //       //   top: "-15px", // Modifica solo per le etichette di Select
    //       // },
    //     },
    //   },
    // },

    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: ".8rem",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          input: {
            // alignItems: "center",
            // boxSizing: "border-box",
            // color: "unset",
            // display: "flex",
            // fontSize: "1.8rem",

            "&:hover": {
              cursor: "pointer", // Cambia il cursore in 'pointer' durante l'hover
            },
          },
          formControl: {
            padding: "0",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Per gestire il bordo al passaggio del mouse
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: brandSecondaryColor, // Cambia il colore del bordo in rosso quando c'è hover
          },
        },
        notchedOutline: {
          borderColor: brandColor, // Colore del bordo normale
        },
      },
    },
  },
});

export default theme;
