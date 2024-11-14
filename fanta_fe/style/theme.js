import { createTheme } from "@mui/material/styles";

const brandColor = "#2ABF89";
const brandSecondaryColor = " #55D983";

const white = "#fff";
const black = "#000";
const error = "#f9423a";
const success = "#F28F6B";
const noBrandColor = "#5c5c5c";

const theme = createTheme({
  palette: {
    text: {
      primary: black,
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      paper: white,
      default: "#f6f7f8",
    },
    common: {
      black: black,
      white: white,
    },
    primary: {
      light: brandColor,
      main: brandColor,
      dark: brandSecondaryColor,
      contrastText: white,
    },
    secondary: {
      light: white,
      main: white,
      dark: white,
      contrastText: brandColor,
    },
    noBrandColor: {
      light: noBrandColor,
      main: noBrandColor,
      dark: black,
      contrastText: white,
    },
    error: {
      light: error,
      main: error,
      dark: error,
      contrastText: white,
    },
    confirm: {
      light: success,
      main: success,
      dark: success,
      contrastText: white,
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
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h4",
          subtitle2: "h5",
          body1: "p",
          body2: "p",
          caption: "span",
        },
      },
      styleOverrides: {
        root: {
          color: black,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: ".8rem",

          "&.MuiInputLabel-sizeMedium": {
            top: "-5px",
          },
          "&.MuiInputLabel-sizeMedium.Mui-focused": {
            top: "0px",
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
          minHeight: "40px",
          padding: "0 10px",
          position: "relative",
          transform: "translateY(20%)",
        },
        icon: {
          color: "#2ABF89",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "10px 20px",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: ".8rem",

          "&.Mui-error .MuiInputLabel-root": {
            color: "#f9423a",
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          fontWeight: "400",
          fontSize: "0.75rem",
          lineHeight: "1.66",
          letterSpacing: "0.03333em",
          textAlign: "left",
          color: "#f9423a",

          "&.Mui-error": {
            color: "#f9423a",
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.MuiInputLabel-root Mui-error": {
            color: "#f9423a",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          input: {
            "&:hover": {
              cursor: "pointer",
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
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2ABF89",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F9423a",
          },
        },
        notchedOutline: {
          borderColor: "#2ABF89",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          maxWidth: "200px",
          maxHeight: "300px",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          maxWidth: "200px",
          maxHeight: "300px",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          maxWidth: "200px",
          maxHeight: "300px",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",

          span: {
            width: "200px",
            maxWidth: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        },
      },
    },
  },
});

export default theme;
