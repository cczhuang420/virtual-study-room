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
        focused: true,
        size: "small",
        fullWidth: true
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
    }
  },
  typography: {
    fontFamily: "Rubik"
  }
})

export default theme
