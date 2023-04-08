import {createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#a79cbc",
      main: "#1e0653",
      dark: "#1b0137"
    },
    secondary:{
      main: "#290451"
    },
    tertiary:{
      main:"#400A71"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained"
      }
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        fullWidth: true,
        size: "small"
      }
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "14px",
          color: "#1b0137",
          fontWeight: "bold",
          verticalAlign: "bottom"
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#ff1a1a",
          height: "20px"
        }
      }
    },
  },
  typography: {
    fontFamily: ["Rubik",'Nexa', "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Rubik", 'Nexa',"sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Rubik",'Nexa', "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Rubik",'Nexa', "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Rubik", 'Nexa',"sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Rubik",'Nexa', "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Rubik", 'Nexa',"sans-serif"].join(","),
      fontSize: 14,
    },

  }
})

export default theme
