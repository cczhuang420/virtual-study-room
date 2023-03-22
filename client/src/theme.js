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
    }
  }
})

export default theme
