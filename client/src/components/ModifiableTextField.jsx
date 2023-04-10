import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';


const ModifiableTextField = ({label, value, onSubmitChange}) => {
  const [isModifying, setIsModifying] = useState(false)
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.primary.light}BB`,
        borderRadius: "10px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      <Typography sx={{color: "white", fontSize: "20px"}}>
        {value}
      </Typography>
      <Box sx={{position: "absolute", top: 4, left: 6, color: "white"}}>
        <Typography>
          {label}
        </Typography>
      </Box>
      <Box sx={{position: "absolute", right: 2, top: "50%", transform: "translateY(-50%)"}}>
        <IconButton>
          <EditIcon sx={{color: "white"}} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ModifiableTextField
