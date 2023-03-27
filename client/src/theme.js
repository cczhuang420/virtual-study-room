import {createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#a79cbc",
      main: "#1e0653",
      dark: "#1b0137"
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
    fontFamily: "Rubik"
  }
})

export default theme
